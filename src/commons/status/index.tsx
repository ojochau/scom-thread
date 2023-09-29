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
  HStack
} from '@ijstech/components';
import { customStyles } from './index.css';
import { labelStyle, spinnerStyle } from '../../index.css';
import { IPostData } from '../../interface';
import { fetchDataByCid, formatNumber, getWidgetData } from '../../global/index';
import ScomPageViewer from '@scom/scom-page-viewer';
import { ScomThreadAnalytics, ScomThreadPost, ScomThreadReplyInput } from '../../commons/index';
const Theme = Styles.Theme.ThemeVars;

interface ScomThreadStatusElement extends ControlElement {
  cid?: string;
  theme?: Markdown["theme"];
}
const MAX_HEIGHT = 352;

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
  private pnlLoader: VStack;
  private pageViewer: ScomPageViewer;
  private analyticEl: ScomThreadAnalytics;
  private pnlStatusReplies: Panel;
  private inputReply: ScomThreadReplyInput;
  private btnViewMore: HStack;
  private pnlStatusDetail: Panel;
  private pnlOverlay: Panel;

  private _data: IPostData;
  private _cid: string;

  public onReplyClicked: (data: {cid: string}) => void;

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

  set theme(value: Markdown["theme"]) {
    if (this.pageViewer) this.pageViewer.theme = value;
    if (this.inputReply) this.inputReply.theme = value;
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
    this.imgAvatar.url = "";
    this.lblOwner.caption = "";
    this.lblDate.caption = "";
    this.lbViews.caption = "";
    this.lblUsername.caption = "";
    this.pageViewer.setData({} as any);
    this.btnViewMore.visible = false;
    this.pnlOverlay.visible = false;
  }

  private async renderUI() {
    this.clear();
    const { analytics, owner, username, publishDate, dataUri, avatar } = this._data || {};
    this.analyticEl.setData([
      {
        value: analytics?.reply || 0,
        name: 'Reply',
        icon: 'comment',
        onClick: () => {
          if (this.onReplyClicked) this.onReplyClicked({cid: this.cid});
        }
      },
      {
        value: analytics?.repost || 0,
        name: 'Repost',
        icon: 'retweet',
        class: 'green-icon'
      },
      {
        name: 'Vote',
        onRender: () => {
          let voteQty = Number(analytics?.like || 0);
          const lb = <i-label caption={formatNumber(voteQty, 0)} font={{color: Theme.text.secondary, size: '0.813rem'}}></i-label>
          return (
            <i-hstack
              verticalAlignment="center"
              gap='0.5rem'
              tooltip={{content: 'Upvote/downvote', placement: 'bottomLeft'}}
              class="analytic"
            >
              <i-icon
                name={'arrow-up'}
                width={28} height={28} fill={Theme.text.secondary}
                border={{radius: '50%'}}
                class="hovered-icon"
                padding={{top: 5, bottom: 5, left: 5, right: 5}}
                onClick={() => {
                  lb.caption = formatNumber(++voteQty, 0)
                }}
              ></i-icon>
              {lb}
              <i-icon
                name={'arrow-down'}
                width={28} height={28} fill={Theme.text.secondary}
                border={{radius: '50%'}}
                class="hovered-icon"
                padding={{top: 5, bottom: 5, left: 5, right: 5}}
                onClick={() => {
                  lb.caption = formatNumber(--voteQty, 0)
                }}
              ></i-icon>
            </i-hstack>
          )
        },
        class: 'red-icon'
      },
      {
        value: analytics?.bookmark || 0,
        name: 'Bookmark',
        icon: 'bookmark'
      }
    ])
    this.lblOwner.caption = FormatUtils.truncateWalletAddress(owner);
    this.lblUsername.caption = `@${username}`;
    this.lblUsername.link.href = '';
    this.lblDate.caption = publishDate ? FormatUtils.unixToFormattedDate(publishDate) : "";
    this.lbViews.caption = formatNumber(analytics?.view || 0, 0);
    this.imgAvatar.url = avatar ?? '';
    if (dataUri) {
      this.pnlLoader.visible = true;
      await this.pageViewer.setData(await getWidgetData(dataUri));
      this.pnlLoader.visible = false;
    }
    if (this.pnlStatusDetail.scrollHeight > MAX_HEIGHT) {
      this.pnlOverlay.visible = true;
      this.btnViewMore.visible = true;
    }
    this.renderPostFrom();
    this.renderReplies();
    this.inputReply.onSubmit = this.onReplySubmit;
    this.inputReply.setData({ replyTo: `@${username}`});
  }
  
  private renderPostFrom() {
    this.pnlPostFrom.clearInnerHTML();
    // TODO: check type to show
    this.pnlPostFrom.visible = true;
    this.pnlPostFrom.appendChild(
      <i-hstack
        verticalAlignment="center" gap="12px"
        margin={{bottom: '0.5rem'}} width="100%"
      >
        <i-hstack stack={{basis: '40px', shrink: '0'}} horizontalAlignment="end">
          <i-icon name="retweet" width={14} height={14} fill={Theme.text.primary}></i-icon>
        </i-hstack>
        <i-label
          font={{size: '0.813rem', weight: 600}}
          caption={`${this.lblOwner.caption} reposted`}
          link={{href: '#'}}
        ></i-label>
      </i-hstack>
    )
  }

  private async renderReplies() {
    this.pnlStatusReplies.clearInnerHTML();
    if (this._data?.replies?.length) {
      const length = this._data.replies.length;
      for (let i = 0; i < length; i++) {
        const reply = this._data.replies[i];
        const replyElm = (
          <i-scom-thread-post
            border={{bottom: {width: '1px', style: i !== length - 1 ? 'solid' : 'none', color: Theme.action.hover}}}
          ></i-scom-thread-post>
        ) as ScomThreadPost;
        replyElm.onReplyClicked = this.onReplyClicked;
        replyElm.setData({ cid: reply.cid });
        this.pnlStatusReplies.appendChild(replyElm);
      }
    }
  }

  private onViewMore() {
    this.pnlStatusDetail.style.maxHeight = '';
    this.pnlStatusDetail.style.overflow = '';
    this.pnlOverlay.visible = false;
    this.btnViewMore.visible = false;
  }

  private onReplySubmit() {}

  init() {
    super.init();
    this.onReplyClicked = this.getAttribute('onReplyClicked', true) || this.onReplyClicked;
    const cid = this.getAttribute('cid', true);
    if (cid) this.setData(cid);
    const theme = this.getAttribute('theme', true);
    if (theme) this.theme = theme;
  }

  render() {
    return (
      <i-vstack width="100%" class={customStyles}>
        <i-panel padding={{left: '1rem', right: '1rem'}}>
          <i-panel id="pnlPostFrom" visible={false}></i-panel>
          <i-hstack
            verticalAlignment="center" gap="12px"
            stack={{grow: '1'}} width="100%" 
          >
            <i-panel stack={{basis: '40px', shrink: '0'}}>
              <i-image
                id="imgAvatar"
                width={36} height={36} display="block"
                background={{color: Theme.background.gradient}}
                border={{radius: '50%'}}
                overflow={'hidden'}
                stack={{shrink: '0'}}
                class={'avatar'}
              ></i-image>
            </i-panel>
            <i-hstack verticalAlignment="center" horizontalAlignment="space-between" gap="0.5rem" width="100%">
              <i-hstack stack={{basis: '50%'}} gap={'0.5rem'} verticalAlignment="center">
                <i-label id="lblOwner" class={labelStyle} font={{ size: '1rem', weight: 700 }}></i-label>
                <i-label id="lblUsername" class={labelStyle} font={{size: '1rem', color: Theme.text.secondary}}></i-label>
              </i-hstack>
              <i-hstack stack={{basis: '50%'}} verticalAlignment="center" horizontalAlignment="end" gap="0.5rem">
                <i-button
                  id="btnSubcribe"
                  minHeight={32}
                  padding={{left: '1rem', right: '1rem'}}
                  background={{color: Theme.colors.primary.main}}
                  font={{color: Theme.colors.primary.contrastText}}
                  border={{radius: '30px'}}
                  caption='Subcribe'
                ></i-button>
                <i-icon
                  name="ellipsis-h"
                  width={30} height={30} fill={Theme.text.primary}
                  border={{radius: '50%'}}
                  padding={{top: 5, bottom: 5, left: 5, right: 5}}
                  class="hovered-icon"
                ></i-icon>
              </i-hstack>
            </i-hstack>
          </i-hstack>
          <i-panel
            id="pnlStatusDetail"
            maxHeight={MAX_HEIGHT}
            overflow={'hidden'}
          >
            <i-vstack
              id="pnlLoader"
              width="100%"
              height="100%"
              minHeight={300}
              horizontalAlignment="center"
              verticalAlignment="center"
              padding={{ top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }}
              visible={false}
            >
              <i-panel class={spinnerStyle}></i-panel>
            </i-vstack>
            <i-scom-page-viewer id="pageViewer" />
            <i-panel
              id="pnlOverlay"
              visible={false}
              height='5rem' width='100%'
              position='absolute' bottom="0px"
              background={{color: `linear-gradient(0, var(--card-bg-color) 0%, transparent 100%)`}}
            ></i-panel>
          </i-panel>
          <i-hstack
            id="btnViewMore"
            verticalAlignment="center"
            padding={{top: '1rem'}}
            gap='0.5rem'
            visible={false}
            onClick={this.onViewMore}
          >
            <i-label caption={'Read more'} font={{size: '1rem', color: Theme.colors.primary.main}}></i-label>
            <i-icon name={"angle-down"} width={16} height={16} fill={Theme.colors.primary.main}></i-icon>
          </i-hstack>
          <i-hstack
            verticalAlignment="center" gap="4px"
            padding={{top: '1rem', bottom: '1rem'}}
          >
            <i-label id="lblDate" font={{ size: '1rem', color: Theme.text.secondary }} />
            <i-label id="lbViews" caption='0' font={{size: '1rem', weight: 700}}></i-label>
            <i-label caption="Views" font={{size: '1rem', color: Theme.text.secondary}}></i-label>
          </i-hstack>
          <i-scom-thread-analytics
            id="analyticEl"
            display='block'
            border={{top: {width: '1px', style: 'solid', color: Theme.action.hover}, bottom: {width: '1px', style: 'solid', color: Theme.action.hover}}}
          ></i-scom-thread-analytics>
          <i-scom-thread-reply-input id="inputReply"></i-scom-thread-reply-input>
        </i-panel>
        <i-vstack
          id="pnlStatusReplies"
          border={{top: {width: '1px', style: 'solid', color: Theme.action.hover}}}
        ></i-vstack>
      </i-vstack>
    );
  }
}
