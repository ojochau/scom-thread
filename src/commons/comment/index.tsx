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
import { labelStyle, multiLineTextStyle, spinnerStyle } from '../../index.css';
import { IPostData } from '../../interface';
import { getDescWidgetData, getDuration } from '../../global/index';
import ScomPageViewer from '@scom/scom-page-viewer';
const Theme = Styles.Theme.ThemeVars;

interface ScomThreadCommentElement extends ControlElement {
  data?: IPostData;
  theme?: Markdown["theme"];
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-thread-comment']: ScomThreadCommentElement;
    }
  }
}

@customElements('i-scom-thread-comment')
export class ScomThreadComment extends Module {
  private imgAvatar: Image;
  private lblOwner: Label;
  private lblDate: Label;
  private lblUsername: Label;
  private pnlLoader: VStack;
  private pageViewer: ScomPageViewer;
  private lbReplyTo: Label;
  private pnlReplyTo: Panel;

  private _data: IPostData;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  static async create(options?: ScomThreadCommentElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  set theme(value: Markdown['theme']) {
    if (this.pageViewer) this.pageViewer.theme = value;
  }

  async setData(data: IPostData) {
    this._data = data;
    await this.renderUI();
  }

  getData() {
    return this._data;
  }

  clear() {
    this.imgAvatar.url = '';
    this.lblOwner.caption = '';
    this.lblDate.caption = '';
    this.lblUsername.caption = '';
    this.pageViewer.setData({} as any);
    this.lbReplyTo.caption = '';
    this.pnlReplyTo.visible = false;
  }

  private async renderUI() {
    this.clear();
    const { owner = '', username, publishDate, dataUri, avatar, description } = this._data || {};
    this.lblOwner.caption = FormatUtils.truncateWalletAddress(owner);
    this.lblUsername.caption = `@${username}`;
    this.lblUsername.link.href = '';
    this.lbReplyTo.caption = `@${username}`;
    this.pnlReplyTo.visible = true;
    this.lblDate.caption = `. ${getDuration(publishDate)}`;
    this.imgAvatar.url = avatar ?? '';
    try {
      this.pnlLoader.visible = true;
      if (dataUri) {
        await this.pageViewer.setData({ cid: dataUri + "/scconfig.json" } as any);
      } else if (description) {
        await this.pageViewer.setData(getDescWidgetData(description));
      }
    } catch {}
    this.pnlLoader.visible = false;
    this.pageViewer.style.setProperty('--custom-background-color', 'transparent');
  }

  init() {
    super.init();
    const data = this.getAttribute('data', true);
    if (data) this.setData(data);
    const theme = this.getAttribute('theme', true);
    if (theme) this.theme = theme;
  }

  render() {
    return (
      <i-vstack width="100%">
        <i-hstack
          verticalAlignment="center"
          wrap="wrap"
          gap="4px"
          width="100%"
        >
          <i-image
            id="imgAvatar"
            width={20}
            height={20}
            display="block"
            background={{ color: Theme.background.gradient }}
            border={{ radius: '50%' }}
            overflow={'hidden'}
            stack={{ basis: '20px' }}
            class={'avatar'}
          ></i-image>
          <i-label
            id="lblOwner"
            class={labelStyle}
            font={{ size: '1rem', weight: 700 }}
          ></i-label>
          <i-label
            id="lblUsername"
            class={labelStyle}
            font={{ size: '1rem', color: Theme.text.secondary }}
          ></i-label>
          <i-label id="lblDate" font={{ size: '0.875rem', color: Theme.text.secondary }} />
        </i-hstack>
        <i-hstack id="pnlReplyTo" gap="0.5rem" verticalAlignment="center" padding={{top: 4}}>
          <i-label caption='Replying to' font={{size: '1rem', color: Theme.text.secondary}}></i-label>
          <i-label id="lbReplyTo" link={{href: ''}} font={{size: '1rem', color: Theme.colors.primary.main}}></i-label>
        </i-hstack>
        <i-panel class={multiLineTextStyle}>
          <i-vstack
            id="pnlLoader"
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
        </i-panel>
      </i-vstack>
    );
  }
}
