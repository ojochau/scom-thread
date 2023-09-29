import {
  ControlElement,
  customElements,
  Module,
  Container,
  Modal,
  Markdown,
  Styles
} from '@ijstech/components';
import { customStyles, modalStyle } from './index.css';
import { IThread } from './interface';
import dataConfig from './data.json';
import { setDataFromJson } from './store/index';
import { ScomThreadPost, ScomThreadStatus } from './commons/index';

const Theme = Styles.Theme.ThemeVars;

interface ScomThreadElement extends ControlElement {
  cid?: string;
  theme?: Markdown["theme"];
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-thread']: ScomThreadElement;
    }
  }
}

@customElements('i-scom-thread')
export default class ScomThread extends Module {;
  private mdReply: Modal;
  private mdPost: ScomThreadPost;
  private mainStatus: ScomThreadStatus;

  private _data: IThread;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    if (dataConfig) setDataFromJson(dataConfig);
    this.onShowReplyMd = this.onShowReplyMd.bind(this);
  }

  static async create(options?: ScomThreadElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  get cid() {
    return this._data.cid;
  }
  set cid(value: string) {
    this._data.cid = value;
  }

  set theme(value: Markdown["theme"]) {
    if (this.mdPost) this.mdPost.theme = value;
    if (this.mainStatus) this.mainStatus.theme = value;
  }

  async setData(value: IThread) {
    this._data = value;
    await this.renderUI();
  }

  getData() {
    return this._data;
  }

  clear() {
    this.mainStatus.clear();
    this.mdPost.clear();
  }

  private async renderUI() {
    this.mdPost.onReplyClicked = this.onShowReplyMd;
    this.mainStatus.onReplyClicked = this.onShowReplyMd;
    await this.mainStatus.setData(this.cid);
  }

  private onClosedReplyMd() {
    this.mdReply.visible = false;
  }

  private async onShowReplyMd(data: {cid: string}) {
    await this.mdPost.setData({cid: data.cid, showAnalytics: false, type: 'reply'});
    this.mdReply.refresh();
    this.mdReply.visible = true;
  }

  private initEvents() {}

  init() {
    super.init();
    const cid = this.getAttribute('cid', true);
    if (cid) this.setData({ cid });
    this.initEvents();
    const theme = this.getAttribute('theme', true);
    const themeVar = theme || document.body.style.getPropertyValue('--theme');
    if (themeVar) this.theme = themeVar as Markdown['theme'];
    this.style.setProperty('--card-bg-color', `color-mix(in srgb, ${Theme.background.paper}, #fff 3%)`);
  }

  render() {
    return (
      <i-vstack width="100%" maxWidth={600} margin={{left: 'auto', right: 'auto'}} class={customStyles}>
        <i-panel padding={{left: '1rem', right: '1rem'}}>
          <i-scom-thread-status id="mainStatus"></i-scom-thread-status>
        </i-panel>
        <i-modal
          id="mdReply"
          maxWidth={600}
          class={modalStyle}
        >
          <i-vstack gap="1rem">
            <i-hstack verticalAlignment="center" minHeight={53}>
              <i-icon name="times" width={20} height={20} onClick={this.onClosedReplyMd}></i-icon>
              <i-button
                caption='Drafts'
                padding={{top: '0.5rem', bottom: '0.5rem', left: '1rem', right: '1rem'}}
                background={{color: 'transparent'}}
                visible={false}
              ></i-button>
            </i-hstack>
            <i-scom-thread-post id="mdPost"></i-scom-thread-post>
          </i-vstack>
        </i-modal>
      </i-vstack>
    );
  }
}
