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
  MarkdownEditor,
  application
} from '@ijstech/components';
import { avatarStyle, customStyles, editorStyle, labelStyle, spinnerStyle } from './index.css';
import { IPostData } from '../../interface';
import { EVENTS, fetchDataByCid, formatNumber, getWidgetData } from '../../global/index';
import ScomPageViewer from '@scom/scom-page-viewer';
import { ScomAnalytics, ScomPost } from '../../commons/index';
const Theme = Styles.Theme.ThemeVars;

interface ScomStatusElement extends ControlElement {
  cid?: string;
  theme?: Markdown["theme"];
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-status']: ScomStatusElement;
    }
  }
}

@customElements('i-scom-status')
export class ScomStatus extends Module {
  private imgAvatar: Image;
  private lblOwner: Label;
  private lblDate: Label;
  private lblUsername: Label;
  private lbViews: Label;
  private pnlPostFrom: Panel;
  private pnlLoader: VStack;
  private pageViewer: ScomPageViewer;
  private analyticEl: ScomAnalytics;
  private pnlStatusReplies: Panel;
  private replyEditor: MarkdownEditor;

  private _data: IPostData;
  private _cid: string;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  static async create(options?: ScomStatusElement, parent?: Container) {
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
    if (this.replyEditor) this.replyEditor.theme = value;
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
  }

  private async renderUI() {
    this.clear();
    const { analytics, owner, username, publishDate, dataUri } = this._data || {};
    this.analyticEl.setData([
      {
        value: analytics?.reply || 0,
        name: 'Reply',
        icon: 'comment',
        onClick: () => {
          application.EventBus.dispatch(EVENTS.SHOW_REPLY_MODAL, {cid: this.cid});
        }
      },
      {
        value: analytics?.repost || 0,
        name: 'Repost',
        icon: 'retweet',
        class: 'green-icon'
      },
      {
        value: analytics?.like || 0,
        name: 'Like',
        icon: 'heart',
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
    if (dataUri) {
      this.pnlLoader.visible = true;
      // TODO: update later
      // await this.pageViewer.setData({ cid: this._data.dataUri + "/scconfig.json" } as any);
      await this.pageViewer.setData(await getWidgetData(dataUri));
      this.pnlLoader.visible = false;
    }
    this.renderPostFrom();
    this.renderReplies();
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
          font={{size: '0.813rem', weight: 500}}
          caption={`${this.lblOwner.caption} reposted`}
          link={{href: '#'}}
        ></i-label>
      </i-hstack>
    )
  }

  private async renderReplies() {
    this.pnlStatusReplies.clearInnerHTML();
    if (this._data?.replies?.length) {
      for (let reply of this._data.replies) {
        const replyElm = <i-scom-post class="reply"></i-scom-post> as ScomPost;
        replyElm.setData({ cid: reply.cid });
        this.pnlStatusReplies.appendChild(replyElm);
      }
    }
  }

  init() {
    super.init();
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
              <i-image id="imgAvatar" class={avatarStyle} width={36} height={36} display="block"></i-image>
            </i-panel>
            <i-hstack verticalAlignment="center" horizontalAlignment="space-between" gap="0.5rem" width="100%">
              <i-hstack stack={{basis: '50%'}} gap={'0.5rem'} verticalAlignment="center">
                <i-label id="lblOwner" class={labelStyle} font={{ size: '17px', weight: 500 }}></i-label>
                <i-label id="lblUsername" class={labelStyle} font={{color: Theme.text.secondary}}></i-label>
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
                <i-icon name="ellipsis-h" width={30} height={30} fill={Theme.text.primary} class="more-icon"></i-icon>
              </i-hstack>
            </i-hstack>
          </i-hstack>
          <i-panel margin={{top: '12px'}}>
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
          <i-hstack
            verticalAlignment="center" gap="4px"
            padding={{top: '1rem', bottom: '1rem'}}
          >
            <i-label id="lblDate" font={{ size: '0.875rem', color: Theme.text.secondary }} />
            <i-label id="lbViews" caption='0' font={{weight: 600}}></i-label>
            <i-label caption="Views" font={{color: Theme.text.secondary}}></i-label>
          </i-hstack>
          <i-scom-analytics
            id="analyticEl"
            display='block'
            border={{top: {width: '1px', style: 'solid', color: Theme.divider}, bottom: {width: '1px', style: 'solid', color: Theme.divider}}}
          ></i-scom-analytics>
          <i-grid-layout
            templateColumns={['40px', 'auto', '80px']}
            gap={{column: 12}}
            grid={{verticalAlignment: 'center'}}
            margin={{top: 12, bottom: 12}}
          >
            <i-image class={avatarStyle} width={36} height={36} display="block"></i-image>
            <i-markdown-editor
              id="replyEditor"
              width="100%"
              value="Post your reply"
              viewer={false}
              hideModeSwitch={true}
              mode='wysiwyg'
              toolbarItems={[]}
              font={{size: '1.5rem'}}
              height="auto" theme='dark'
              stack={{grow: '1'}}
              class={editorStyle}
            ></i-markdown-editor>
            <i-hstack horizontalAlignment="end">
              <i-button
                minHeight={32}
                padding={{left: '1rem', right: '1rem'}}
                background={{color: Theme.colors.primary.main}}
                font={{color: Theme.colors.primary.contrastText}}
                border={{radius: '30px'}}
                enabled={false}
                caption='Reply'
              ></i-button>
            </i-hstack>
          </i-grid-layout>
        </i-panel>
        <i-vstack
          id="pnlStatusReplies"
          gap="0.5rem"
          border={{top: {width: '1px', style: 'solid', color: Theme.divider}}}
        ></i-vstack>
      </i-vstack>
    );
  }
}
