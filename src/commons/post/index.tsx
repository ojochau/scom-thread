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
  Panel
} from '@ijstech/components';
import { avatarStyle, customStyles, labelStyle, spinnerStyle } from './index.css';
import { IPostData } from '../../interface';
import { fetchDataByCid, formatNumber, getDuration, getWidgetData } from '../../global/index';
import ScomPageViewer from '@scom/scom-page-viewer';
import { ScomThreadAnalytics } from '../../commons/index';
const Theme = Styles.Theme.ThemeVars;

type IPostType = 'reply' | 'post';
interface ScomThreadPostElement extends ControlElement {
  cid?: string;
  type?: IPostType;
  showAnalytics?: boolean;
  theme?: Markdown["theme"];
}

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
  private pnlReplyTo: Panel;

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
    this.pnlReplyTo.visible = false;
  }

  private async renderUI() {
    this.clear();
    const { analytics } = this._data || {};
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
                name="arrow-up" width={28} height={28}
                fill={Theme.text.secondary}
                class="hovered-icon"
                onClick={() => {
                  lb.caption = formatNumber(++voteQty, 0)
                }}
              ></i-icon>
              {lb}
              <i-icon
                name="arrow-down" width={28} height={28}
                fill={Theme.text.secondary}
                class="hovered-icon"
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
    this.lblOwner.caption = FormatUtils.truncateWalletAddress(this._data.owner);
    this.lblUsername.caption = `@${this._data.username}`;
    this.lblUsername.link.href = '';
    this.analyticEl.visible = this.showAnalytics;
    this.lblDate.caption = `. ${getDuration(this._data.publishDate)}`;
    if (this._data.dataUri) {
      this.pnlLoader.visible = true;
      await this.pageViewer.setData(await getWidgetData(this._data.dataUri));
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
      this.pnlReplyTo.visible = true;
      this.renderReplyTo();
    }
  }

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

  private renderReplyTo() {
    this.pnlReplyTo.clearInnerHTML();
    this.pnlReplyTo.appendChild(
      <i-hstack gap={'0.5rem'}>
        <i-label
          caption={`Replying to`}
        ></i-label>
        <i-label
          caption={`Replying to @shaktibharatia and @TheEconomist`}
          link={{href: ''}}
        ></i-label>
      </i-hstack>
    )
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
          templateColumns={['40px', 'auto']}
          gap={{column: 12}}
          padding={{top: '1rem', left: '1rem', bottom: '0', right: '1rem'}}
          class="post-body"
        >
          <i-panel id="pnlAvatar">
            <i-image id="imgAvatar" class={avatarStyle} width={36} height={36} display="block"></i-image>
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
                <i-icon name="ellipsis-h" width={30} height={30} fill={Theme.text.primary} class="hovered-icon"></i-icon>
              </i-hstack>
            </i-hstack>
            <i-panel>
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
            </i-panel>
            <i-panel id="pnlReplyTo" visible={false}></i-panel>
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
            <i-label caption='Show replies' font={{color: Theme.colors.primary.main}}></i-label>
          </i-hstack>
        </i-panel>
      </i-vstack>
    );
  }
}
