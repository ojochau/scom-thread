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
  GridLayout,
  HStack
} from '@ijstech/components';
import { customStyles } from './index.css';
import { IPostData, onReplyClickedCallback, onReplyHandlerCallback } from '../../interface';
import { fetchDataByCid, getDuration, getWidgetData } from '../../global/index';
import ScomPageViewer from '@scom/scom-page-viewer';
import { ScomThreadAnalytics } from '../../commons/index';
import { spinnerStyle, labelStyle } from '../../index.css';
const Theme = Styles.Theme.ThemeVars;

type IPostType = 'reply' | 'post' | 'quote';
interface ScomThreadPostElement extends ControlElement {
  cid?: string;
  type?: IPostType;
  showAnalytics?: boolean;
  theme?: Markdown["theme"];
  onReplyClicked?: onReplyClickedCallback;
  onReplyHandler?: onReplyHandlerCallback;
}
const MAX_HEIGHT = 352;

interface IPostConfig {
  cid: string;
  type?: IPostType;
  showAnalytics?: boolean;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-thread-post']: ScomThreadPostElement;
    }
  }
}

@customElements('i-scom-thread-post')
export class ScomThreadPost extends Module {
  private imgAvatar: Image;
  private lblOwner: Label;
  private lblUsername: Label;
  private pnlLoader: VStack;
  private lblDate: Label;
  private pageViewer: ScomPageViewer;
  private analyticEl: ScomThreadAnalytics;
  private pnlAvatar: Panel;
  private pnlMore: Panel;
  private gridPost: GridLayout;
  private btnViewMore: HStack;
  private pnlStatusDetail: Panel;
  private pnlOverlay: Panel;
  private pnlSubscribe: Panel;

  private _data: IPostData;
  private _config: IPostConfig;

  public onReplyClicked: onReplyClickedCallback;
  // public onReplyHandler: onReplyHandlerCallback;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  static async create(options?: ScomThreadPostElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  get cid() {
    return this._config.cid;
  }
  set cid(value: string) {
    this._config.cid = value;
  }

  get type() {
    return this._config.type;
  }
  set type(value: IPostType) {
    this._config.type = value;
  }

  get showAnalytics() {
    return this._config.showAnalytics ?? true;
  }
  set showAnalytics(value: boolean) {
    this._config.showAnalytics = value ?? true;
  }

  set theme(value: Markdown["theme"]) {
    if (this.pageViewer) this.pageViewer.theme = value;
  }

  async setData(data: IPostConfig) {
    this._config = {...data};
    await this.fetchData();
    await this.renderUI();
  }

  getData() {
    return this._data;
  }

  private get isReply() {
    return this.type === 'reply';
  }

  private get isQuote() {
    return this.type === 'quote';
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
    this.lblUsername.caption = "";
    this.lblDate.caption = "";
    this.pageViewer.setData({} as any);
    this.pnlAvatar.classList.remove('has-border');
    this.pnlMore.visible = false;
    this.analyticEl.visible = false;
    this.pnlOverlay.visible = false;
    this.btnViewMore.visible = false;
    this.pnlSubscribe.visible = false;
  }

  private async renderUI() {
    this.clear();
    const { analytics, owner, publishDate, dataUri, username, avatar } = this._data || {};
    this.lblOwner.caption = FormatUtils.truncateWalletAddress(owner);
    this.lblUsername.caption = `@${username}`;
    this.lblUsername.link.href = '';
    this.analyticEl.visible = this.showAnalytics;
    this.lblDate.caption = `. ${getDuration(publishDate)}`;
    this.imgAvatar.url = avatar ?? '';
    if (dataUri) {
      this.pnlLoader.visible = true;
      await this.pageViewer.setData(await getWidgetData(dataUri));
      this.pageViewer.style.setProperty('--custom-background-color', 'transparent');
      this.pnlLoader.visible = false;
    }
    if (this._data?.replies?.length) {
      this.pnlMore.visible = true;
      this.pnlAvatar.classList.add('has-border');
    }
    if (this.isReply || this.isQuote) {
      if (this.isReply) this.pnlAvatar.classList.add('has-border');
      else if (this.isQuote) this.pnlAvatar.classList.remove('has-border');
      this.pnlMore.visible = false;
      this.gridPost.padding = {top: '0px', left: '0px', right: '0px'};
    } else {
      this.gridPost.padding = {top: '0.75rem', left: '1rem', right: '1rem'};
    }
    if (this.pnlStatusDetail.scrollHeight > MAX_HEIGHT) {
      this.pnlOverlay.visible = true;
      this.btnViewMore.visible = true;
    }
    this.analyticEl.onReplyClicked = this.onReplyClicked;
    this.analyticEl.setData({...analytics, cid: this.cid});
    this.pnlSubscribe.visible = !this.isQuote;
  }

  private onShowMore() {
    this.renderReplies();
  }

  private async renderReplies() {
    this.pnlMore.clearInnerHTML();
    if (this._data?.replies?.length) {
      for (let reply of this._data.replies) {
        const replyElm = <i-scom-thread-post></i-scom-thread-post> as ScomThreadPost;
        replyElm.onReplyClicked = this.onReplyClicked;
        // replyElm.onReplyHandler = this.onReplyHandler;
        await replyElm.setData({ cid: reply.cid });
        this.pnlMore.appendChild(replyElm);
      }
    }
  }

  private onViewMore() {
    this.pnlStatusDetail.style.maxHeight = '';
    this.pnlStatusDetail.style.overflow = '';
    this.pnlOverlay.visible = false;
    this.btnViewMore.visible = false;
  }

  async init() {
    super.init();
    this.onReplyClicked = this.getAttribute('onReplyClicked', true) || this.onReplyClicked;
    // this.onReplyHandler = this.getAttribute('onReplyHandler', true) || this.onReplyHandler;
    const cid = this.getAttribute('cid', true);
    const type = this.getAttribute('type', true);
    const showAnalytics = this.getAttribute('showAnalytics', true, true);
    await this.setData({cid, type, showAnalytics});
    const theme = this.getAttribute('theme', true);
    if (theme) this.theme = theme;
  }

  render() {
    return (
      <i-vstack width="100%" class={customStyles}>
        <i-grid-layout
          id="gridPost"
          templateColumns={['40px', 'auto']}
          class="post-body"
        >
          <i-panel id="pnlAvatar">
            <i-image
              id="imgAvatar"
              width={36} height={36}
              display="block"
              background={{color: Theme.background.gradient}}
              border={{radius: '50%'}}
              overflow={'hidden'}
              stack={{shrink: '0'}}
              class={'avatar'}
            ></i-image>
          </i-panel>
          <i-vstack width={'100%'}>
            <i-hstack verticalAlignment="center" horizontalAlignment="space-between" gap="0.5rem" width="100%">
              <i-hstack stack={{basis: '50%'}} gap={'0.5rem'} verticalAlignment="center" wrap="wrap">
                <i-label id="lblOwner" class={labelStyle} font={{ size: '17px', weight: 500 }}></i-label>
                <i-label id="lblUsername" class={labelStyle} font={{color: Theme.text.secondary}}></i-label>
                <i-label id="lblDate" font={{ size: '0.875rem', color: Theme.text.secondary }} />
              </i-hstack>
              <i-hstack id="pnlSubscribe" stack={{basis: '50%'}} verticalAlignment="center" horizontalAlignment="end" gap="0.5rem">
                <i-button
                  id="btnSubscribe"
                  minHeight={32}
                  padding={{left: '1rem', right: '1rem'}}
                  background={{color: Theme.colors.primary.main}}
                  font={{color: Theme.colors.primary.contrastText}}
                  border={{radius: '30px'}}
                  caption='Subscribe'
                  visible={false}
                ></i-button>
                <i-icon
                  name="ellipsis-h"
                  width={34} height={34} fill={Theme.text.secondary}
                  padding={{top: 8, bottom: 8, left: 8, right: 8}}
                  border={{radius: '50%'}}
                  class="hovered-icon"
                ></i-icon>
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
            <i-scom-thread-analytics
              id="analyticEl"
              visible={false}
            ></i-scom-thread-analytics>
          </i-vstack>
        </i-grid-layout>
        <i-panel id="pnlMore" visible={false}>
          <i-hstack
            verticalAlignment="center"
            gap="2rem"
            padding={{top: '1rem', bottom: '1rem', left: '2.025rem', right: '1rem'}}
            class="more-block"
            onClick={this.onShowMore}
          >
            <i-vstack height={'1rem'} justifyContent="space-between">
              <i-panel width={2} height={2} background={{color: Theme.colors.secondary.light}}></i-panel>
              <i-panel width={2} height={2} background={{color: Theme.colors.secondary.light}}></i-panel>
              <i-panel width={2} height={2} background={{color: Theme.colors.secondary.light}}></i-panel>
            </i-vstack>
            <i-label caption='Show replies' font={{color: Theme.colors.primary.main, size: '1rem'}}></i-label>
          </i-hstack>
        </i-panel>
      </i-vstack>
    );
  }
}
