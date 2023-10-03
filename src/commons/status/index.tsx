import {
  ControlElement,
  customElements,
  Module,
  Styles,
  Image,
  Label,
  VStack,
  Container,
  FormatUtils,
  Markdown,
  Panel,
  HStack,
  MarkdownEditor
} from '@ijstech/components';
import { customStyles } from './index.css';
import { labelStyle, spinnerStyle } from '../../index.css';
import { IPostData, IReply, onReplyClickedCallback, onReplyHandlerCallback } from '../../interface';
import { fetchDataByCid, formatNumber, getWidgetData } from '../../global/index';
import ScomPageViewer from '@scom/scom-page-viewer';
import { ScomThreadAnalytics, ScomThreadPost, ScomThreadReplyInput } from '../../commons/index';
const Theme = Styles.Theme.ThemeVars;

interface ScomThreadStatusElement extends ControlElement {
  cid?: string;
  theme?: Markdown["theme"];
  onReplyClicked?: onReplyClickedCallback;
  onReplyHandler?: onReplyHandlerCallback;
}
const MAX_HEIGHT = 352;
const numsPerPage = 2;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-thread-status']: ScomThreadStatusElement;
    }
  }
}

@customElements('i-scom-thread-status')
export class ScomThreadStatus extends Module {
  private imgAvatar: Image;
  private lblOwner: Label;
  private lblDate: Label;
  private lblUsername: Label;
  private lbViews: Label;
  private pnlPostFrom: Panel;
  private pnlViewerLoader: VStack;
  private bottomElm: HStack;
  private pageViewer: ScomPageViewer;
  private analyticEl: ScomThreadAnalytics;
  private pnlReplies: Panel;
  private pnlMoreLoader: VStack;
  private inputReply: ScomThreadReplyInput;
  private btnViewMore: HStack;
  private pnlStatusDetail: Panel;
  private pnlOverlay: Panel;

  private _data: IPostData;
  private _cid: string;
  private currentPage: number = 1;

  public onReplyClicked: onReplyClickedCallback;
  public onReplyHandler: onReplyHandlerCallback;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  static async create(options?: ScomThreadStatusElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  get cid() {
    return this._cid;
  }
  set cid(value: string) {
    this._cid = value;
  }

  set theme(value: Markdown['theme']) {
    if (this.pageViewer) this.pageViewer.theme = value;
    if (this.inputReply) this.inputReply.theme = value;
  }

  private get replies() {
    return this._data?.replies || [];
  }

  async setData(cid: string) {
    this.cid = cid;
    await this.fetchData();
    await this.renderUI();
  }

  getData() {
    return this._data;
  }

  private async fetchData() {
    try {
      this._data = await fetchDataByCid(this.cid);
    } catch {
      this._data = null;
    }
  }

  clear() {
    this.imgAvatar.url = '';
    this.lblOwner.caption = '';
    this.lblDate.caption = '';
    this.lbViews.caption = '';
    this.lblUsername.caption = '';
    this.pageViewer.setData({} as any);
    this.btnViewMore.visible = false;
    this.pnlOverlay.visible = false;
    this.pnlReplies.clearInnerHTML();
  }

  private async renderUI() {
    this.clear();
    const { analytics, owner, username, publishDate, dataUri, avatar } = this._data || {};
    this.analyticEl.onReplyClicked = this.onReplyClicked;
    this.analyticEl.setData({...analytics, cid: this.cid});
    this.lblOwner.caption = FormatUtils.truncateWalletAddress(owner);
    this.lblUsername.caption = `@${username}`;
    this.lblUsername.link.href = '';
    this.lblDate.caption = publishDate ? FormatUtils.unixToFormattedDate(publishDate) : '';
    this.lbViews.caption = formatNumber(analytics?.view || 0, 0);
    this.imgAvatar.url = avatar ?? '';
    if (dataUri) {
      this.pnlViewerLoader.visible = true;
      await this.pageViewer.setData(await getWidgetData(dataUri));
      this.pnlViewerLoader.visible = false;
    }
    if (this.pnlStatusDetail.scrollHeight > MAX_HEIGHT) {
      this.pnlOverlay.visible = true;
      this.btnViewMore.visible = true;
    }
    this.renderPostFrom();
    this.initScroll();
    this.renderReplies();
    const self = this;
    this.inputReply.onSubmit = (target: MarkdownEditor) => {
      if (self.onReplyHandler) self.onReplyHandler({cid: self.cid, content: target.getMarkdownValue()});
    };
    this.inputReply.setData({ replyTo: `@${username}` });
  }

  private initScroll() {
    let renderedMap = {};
    const clearObservers = () => {
      this.bottomElm.visible = false;
      renderedMap = {};
      bottomObserver.unobserve(this.bottomElm);
    }
  
    const bottomObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const maxPage = Math.ceil(this.replies.length / numsPerPage);
        if (this.currentPage < maxPage) {
          ++this.currentPage;
          if (!renderedMap[this.currentPage]) this.renderReplies();
          renderedMap[this.currentPage] = true;
        } else {
          clearObservers();
        }
      });
    }, {
      root: null,
      rootMargin: "0px",
      threshold: 0.75
    });
    bottomObserver.observe(this.bottomElm);
  }

  private renderPostFrom() {
    this.pnlPostFrom.clearInnerHTML();
    // TODO: check type to show
    this.pnlPostFrom.visible = true;
    this.pnlPostFrom.appendChild(
      <i-hstack
        verticalAlignment="center"
        gap="12px"
        margin={{ bottom: '0.5rem', top: '1rem' }}
        width="100%"
      >
        <i-hstack stack={{ basis: '40px', shrink: '0' }} horizontalAlignment="end">
          <i-icon name="retweet" width={14} height={14} fill={Theme.text.primary}></i-icon>
        </i-hstack>
        <i-label
          font={{ size: '0.813rem', weight: 600, color: Theme.text.secondary }}
          caption={`${this.lblOwner.caption} reposted`}
          link={{ href: '#' }}
        ></i-label>
      </i-hstack>
    );
  }

  private paginatedList() {
    const replies = this._data?.replies || [];
    return [...replies].slice((this.currentPage - 1) * numsPerPage, this.currentPage * numsPerPage);
  }

  private async renderReplies(data?: IReply[]) {
    const list = data || this.paginatedList();
    const length = list.length;
    if (!length) return;
    this.pnlMoreLoader.visible = true;
    for (let i = 0; i < length; i++) {
      const reply = list[i];
      const replyElm = (
        <i-scom-thread-post
          border={{
            bottom: {
              width: '1px',
              style: 'solid',
              color: Theme.divider
            },
          }}
        ></i-scom-thread-post>
      ) as ScomThreadPost;
      replyElm.onReplyClicked = this.onReplyClicked;
      // replyElm.onReplyHandler = this.onReplyHandler;
      await replyElm.setData({ cid: reply.cid });
      this.pnlReplies.appendChild(replyElm);
    }
    this.pnlMoreLoader.visible = false;
  }

  private onViewMore() {
    this.pnlStatusDetail.style.maxHeight = '';
    this.pnlStatusDetail.style.overflow = '';
    this.pnlOverlay.visible = false;
    this.btnViewMore.visible = false;
  }

  init() {
    super.init();
    this.onReplyClicked = this.getAttribute('onReplyClicked', true) || this.onReplyClicked;
    this.onReplyHandler = this.getAttribute('onReplyHandler', true) || this.onReplyHandler;
    const cid = this.getAttribute('cid', true);
    if (cid) this.setData(cid);
    const theme = this.getAttribute('theme', true);
    if (theme) this.theme = theme;
  }

  render() {
    return (
      <i-vstack id="pnlWrap" width="100%" class={customStyles}>
        <i-panel padding={{ left: '1rem', right: '1rem' }}>
          <i-panel id="pnlPostFrom" visible={false}></i-panel>
          <i-hstack verticalAlignment="center" gap="12px" stack={{ grow: '1' }} width="100%">
            <i-panel stack={{ basis: '40px', shrink: '0' }}>
              <i-image
                id="imgAvatar"
                width={36}
                height={36}
                display="block"
                background={{ color: Theme.background.gradient }}
                border={{ radius: '50%' }}
                overflow={'hidden'}
                stack={{ shrink: '0' }}
                class={'avatar'}
              ></i-image>
            </i-panel>
            <i-hstack
              verticalAlignment="center"
              horizontalAlignment="space-between"
              gap="0.5rem"
              width="100%"
            >
              <i-hstack stack={{ basis: '50%' }} verticalAlignment="center" wrap="wrap">
                <i-label
                  id="lblOwner"
                  class={labelStyle}
                  font={{ size: '1rem', weight: 700 }}
                  margin={{ right: '0.5rem' }}
                ></i-label>
                <i-label
                  id="lblUsername"
                  class={labelStyle}
                  font={{ size: '1rem', color: Theme.text.secondary }}
                ></i-label>
              </i-hstack>
              <i-hstack
                stack={{ basis: '50%' }}
                verticalAlignment="center"
                horizontalAlignment="end"
                gap="0.5rem"
              >
                <i-button
                  id="btnSubcribe"
                  minHeight={32}
                  padding={{ left: '1rem', right: '1rem' }}
                  background={{ color: Theme.colors.secondary.main }}
                  font={{ color: Theme.colors.primary.contrastText, weight: 700, size: '0.875rem' }}
                  border={{ radius: '30px' }}
                  caption="Subscribe"
                ></i-button>
                <i-icon
                  name="ellipsis-h"
                  width={34}
                  height={34}
                  fill={Theme.text.secondary}
                  padding={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  border={{ radius: '50%' }}
                  class="hovered-icon"
                ></i-icon>
              </i-hstack>
            </i-hstack>
          </i-hstack>
          <i-panel id="pnlStatusDetail" maxHeight={MAX_HEIGHT} overflow={'hidden'}>
            <i-vstack
              id="pnlViewerLoader"
              width="100%"
              height="100%"
              minHeight={300}
              horizontalAlignment="center"
              verticalAlignment="center"
              padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}
              visible={false}
            >
              <i-panel class={spinnerStyle}></i-panel>
            </i-vstack>
            <i-scom-page-viewer id="pageViewer" />
            <i-panel
              id="pnlOverlay"
              visible={false}
              height="5rem"
              width="100%"
              position="absolute"
              bottom="0px"
              background={{
                color: `linear-gradient(0, var(--card-bg-color) 0%, transparent 100%)`,
              }}
            ></i-panel>
          </i-panel>
          <i-hstack
            id="btnViewMore"
            verticalAlignment="center"
            padding={{ top: '1rem' }}
            gap="0.5rem"
            visible={false}
            onClick={this.onViewMore}
          >
            <i-label
              caption={'Read more'}
              font={{ size: '1rem', color: Theme.colors.primary.main }}
            ></i-label>
            <i-icon
              name={'angle-down'}
              width={16}
              height={16}
              fill={Theme.colors.primary.main}
            ></i-icon>
          </i-hstack>
          <i-hstack verticalAlignment="center" gap="4px" padding={{ top: '1rem', bottom: '1rem' }}>
            <i-label id="lblDate" font={{ size: '1rem', color: Theme.text.secondary }} />
            <i-label id="lbViews" caption="0" font={{ size: '1rem', weight: 700 }}></i-label>
            <i-label caption="Views" font={{ size: '1rem', color: Theme.text.secondary }}></i-label>
          </i-hstack>
          <i-scom-thread-analytics
            id="analyticEl"
            display="block"
            border={{
              top: { width: '1px', style: 'solid', color: Theme.divider },
              bottom: { width: '1px', style: 'solid', color: Theme.divider },
            }}
          ></i-scom-thread-analytics>
          <i-scom-thread-reply-input id="inputReply"></i-scom-thread-reply-input>
        </i-panel>
        <i-panel>
          <i-vstack
            id="pnlReplies"
            maxHeight={'100%'} overflow={'hidden'}
            border={{ top: { width: '1px', style: 'solid', color: Theme.divider } }}
          ></i-vstack>
          <i-hstack
            id="bottomElm"
            minHeight={48}
            verticalAlignment="center" horizontalAlignment="center"
            border={{
              top: { width: '1px', style: 'solid', color: Theme.divider },
              bottom: { width: '1px', style: 'solid', color: Theme.divider },
            }}
          >
            <i-label caption='Show more replies' font={{color: Theme.colors.primary.main, size: '1rem'}}></i-label>
          </i-hstack>
          <i-vstack
            id="pnlMoreLoader"
            width="100%"
            minHeight={300}
            horizontalAlignment="center"
            verticalAlignment="center"
            padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}
            visible={false}
          >
            <i-panel class={spinnerStyle}></i-panel>
          </i-vstack>
        </i-panel>
      </i-vstack>
    );
  }
}
