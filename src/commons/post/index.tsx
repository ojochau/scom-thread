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
import { IPostData } from '../../interface';
import { fetchDataByCid, formatNumber, getDuration, getWidgetData } from '../../global/index';
import ScomPageViewer from '@scom/scom-page-viewer';
import { ScomThreadAnalytics, ScomThreadReplyInput } from '../../commons/index';
import { spinnerStyle, labelStyle } from '../../index.css';
const Theme = Styles.Theme.ThemeVars;

type IPostType = 'reply' | 'post';
interface ScomThreadPostElement extends ControlElement {
  cid?: string;
  type?: IPostType;
  showAnalytics?: boolean;
  theme?: Markdown["theme"];
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
  private inputReply: ScomThreadReplyInput;
  private btnViewMore: HStack;
  private pnlStatusDetail: Panel;
  private pnlOverlay: Panel;

  private _data: IPostData;
  private _config: IPostConfig;

  public onReplyClicked: (data: {cid: string}) => void;

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
    if (this.inputReply) this.inputReply.theme = value;
  }

  async setData(data: IPostConfig) {
    this._config = {...data};
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
    this.lblUsername.caption = "";
    this.lblDate.caption = "";
    this.pageViewer.setData({} as any);
    this.pnlAvatar.classList.remove('has-border');
    this.pnlMore.visible = false;
    this.analyticEl.visible = false;
    this.inputReply.clear();
    this.inputReply.visible = false;
    this.pnlOverlay.visible = false;
    this.btnViewMore.visible = false;
  }

  private async renderUI() {
    this.clear();
    const { analytics, owner, publishDate, dataUri, username, avatar } = this._data || {};
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
        value: analytics?.view || 0,
        name: 'View',
        icon: 'chart-bar'
      }
    ])
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
    if (this.type === 'reply') {
      this.pnlAvatar.classList.add('has-border');
      this.pnlMore.visible = false;
      this.inputReply.onSubmit = this.onReplySubmit;
      this.inputReply.setData({replyTo: `@${username}`, isReplyToShown: true});
      this.inputReply.visible = true;
      this.gridPost.padding = {top: '0px', left: '0px', right: '0px'};
    } else {
      this.gridPost.padding = {top: '0.75rem', left: '1rem', right: '1rem'};
    }
    if (this.pnlStatusDetail.scrollHeight > MAX_HEIGHT) {
      this.pnlOverlay.visible = true;
      this.btnViewMore.visible = true;
    }
  }

  private onReplySubmit() {}

  private onShowMore() {
    this.renderReplies();
  }

  private async renderReplies() {
    this.pnlMore.clearInnerHTML();
    if (this._data?.replies?.length) {
      for (let reply of this._data.replies) {
        const replyElm = <i-scom-thread-post class="reply"></i-scom-thread-post> as ScomThreadPost;
        replyElm.setData({ cid: reply.cid });
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
          gap={{column: 12}}
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
          <i-vstack width={'100%'} gap="12px">
            <i-hstack verticalAlignment="center" horizontalAlignment="space-between" gap="0.5rem" width="100%">
              <i-hstack stack={{basis: '50%'}} gap={'0.5rem'} verticalAlignment="center" wrap="wrap">
                <i-label id="lblOwner" class={labelStyle} font={{ size: '17px', weight: 500 }}></i-label>
                <i-label id="lblUsername" class={labelStyle} font={{color: Theme.text.secondary}}></i-label>
                <i-label id="lblDate" font={{ size: '0.875rem', color: Theme.text.secondary }} />
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
                  visible={false}
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
              padding={{top: '1.5rem'}}
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
            padding={{top: '1rem', bottom: '1rem', left: '1.5rem', right: '1rem'}}
            class="more-block"
            onClick={this.onShowMore}
          >
            <i-icon name="ellipsis-v" width={20} height={20} fill={Theme.text.secondary}></i-icon>
            <i-label caption='Show replies' font={{color: Theme.colors.primary.main, size: '1rem'}}></i-label>
          </i-hstack>
        </i-panel>
        <i-scom-thread-reply-input id="inputReply" visible={false}></i-scom-thread-reply-input>
      </i-vstack>
    );
  }
}
