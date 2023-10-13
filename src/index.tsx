import {
  ControlElement,
  customElements,
  Module,
  Container,
  Modal,
  Markdown,
  Styles,
  IDataSchema,
  IUISchema,
  GridLayout,
  MarkdownEditor
} from '@ijstech/components';
import { customStyles } from './index.css';
import { IPostData, IThread, ReplyType } from './interface';
import dataConfig from './data.json';
import { setDataFromJson } from './store/index';
import { ScomThreadPost, ScomThreadReplyInput, ScomThreadStatus } from './commons/index';
import { getBuilderSchema, getEmbedderSchema } from './global/index';

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

const defaultColors = {
  light: {
    fontColor: 'rgba(15,20,25,1.00)',
    secondaryColor: 'rgb(83, 100, 113)',
    backgroundColor: '#fff',
    inputFontColor: 'rgba(15,20,25,1.00)',
    inputBackgroundColor: '#fff',
    primaryColor: 'rgb(29, 155, 240)',
    infoColor: 'rgb(29, 155, 240)',
    infoBackground: 'rgba(29, 155, 240, 0.1)',
    successColor: 'rgb(0, 186, 124)',
    successBackground: 'rgba(0, 186, 124, 0.1)',
    errorColor: 'rgb(249, 24, 128)',
    errorBackground: 'rgba(249, 24, 128, 0.1)',
    subcribeButtonBackground: 'rgb(15, 20, 25)',
    subcribeButtonColor: '#fff',
    placeholderColor: '#536471',
    hoverBackgroundColor: 'rgba(0, 0, 0, 0.03)',
    groupBorderColor: 'rgb(207, 217, 222)',
    borderColor: 'rgb(239, 243, 244)'
  },
  dark: {
    fontColor: 'rgb(247, 249, 249)',
    secondaryColor: 'rgb(139, 152, 165)',
    backgroundColor: '#15202B',
    inputFontColor: 'rgba(247,249,249,1.00)',
    inputBackgroundColor: '#15202B',
    primaryColor: 'rgb(29, 155, 240)',
    infoColor: 'rgb(29, 155, 240)',
    infoBackground: 'rgba(29, 155, 240, 0.1)',
    successColor: 'rgb(0, 186, 124)',
    successBackground: 'rgba(0, 186, 124, 0.1)',
    errorColor: 'rgb(249, 24, 128)',
    errorBackground: 'rgba(249, 24, 128, 0.1)',
    subcribeButtonBackground: 'rgb(239, 243, 244)',
    subcribeButtonColor: 'rgb(15, 20, 25)',
    placeholderColor: '#8B98A5',
    hoverBackgroundColor: 'rgba(255, 255, 255, 0.03)',
    groupBorderColor: 'rgb(66, 83, 100)',
    borderColor: 'rgb(56, 68, 77)'
  }
}

@customElements('i-scom-thread')
export default class ScomThread extends Module {;
  private mdReply: Modal;
  private threadPost: ScomThreadPost;
  private mainStatus: ScomThreadStatus;
  private inputPost: ScomThreadReplyInput

  private _data: IThread;
  tag = {
    light: {},
    dark: {}
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    if (dataConfig) setDataFromJson(dataConfig);
    this.onShowReplyMd = this.onShowReplyMd.bind(this);
    this.onPost = this.onPost.bind(this);
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
    this._data.theme = value ?? 'light';
  }
  get theme() {
    return this._data.theme ?? 'light';
  }

  private async setData(value: IThread) {
    this._data = value;
    await this.renderUI();
  }

  private getData() {
    return this._data;
  }

  private clear() {
    this.mainStatus.clear();
    this.threadPost.clear();
    this.inputPost.clear();
  }

  private async renderUI() {
    this.clear();
    this.threadPost.theme = this.theme;
    this.mainStatus.theme = this.theme;
    this.inputPost.theme = this.theme;
    this.threadPost.onReplyClicked = this.onShowReplyMd;
    this.mainStatus.onReplyClicked = this.onShowReplyMd;
    this.mainStatus.onReplyHandler = this.onPost;
    await this.mainStatus.setData(this.cid);
  }

  private onClosedReplyMd() {
    this.mdReply.visible = false;
  }

  private async onShowReplyMd(data: {cid: string, type: ReplyType, postData?: IPostData}) {
    const { cid, type, postData } = data;
    const isQuote = type === 'quote';
    if (isQuote) {
      this.threadPost.visible = false;
      this.inputPost.setData({replyTo: postData, isReplyToShown: false, placeholder: 'Add a comment', type });
    } else {
      await this.threadPost.setData({showAnalytics: false, cid, type});
      const replyTo = this.threadPost.getData();
      this.threadPost.visible = true;
      this.inputPost.setData({replyTo, isReplyToShown: true, placeholder: 'Post your reply', type});
    }
    this.mdReply.refresh();
    this.mdReply.visible = true;
  }

  private onReplySubmit(target: MarkdownEditor) {
    this.onPost({cid: this.threadPost.cid, content: target.getMarkdownValue()});
  }

  private onPost(data: {cid: string, content: 'string'}) {
    console.log('Reply: ', data.cid, ', ', data.content);
  }

  getConfigurators() {
    const self = this;
    return [
      {
        name: 'Builder Configurator',
        target: 'Builders',
        getActions: () => {
          const builderSchema = getBuilderSchema();
          const dataSchema = builderSchema.dataSchema as IDataSchema;
          const uiSchema = builderSchema.uiSchema as IUISchema;
          return this._getActions(dataSchema, uiSchema);
        },
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      },
      {
        name: 'Emdedder Configurator',
        target: 'Embedders',
        getActions: () => {
          const embedderSchema = getEmbedderSchema();
          const dataSchema = embedderSchema.dataSchema as any;
          const uiSchema = embedderSchema.uiSchema as IUISchema;
          return this._getActions(dataSchema, uiSchema);
        },
        getLinkParams: () => {
          const data = this._data || {};
          return {
            data: window.btoa(JSON.stringify(data))
          }
        },
        setLinkParams: async (params: any) => {
          if (params.data) {
            const utf8String = decodeURIComponent(params.data);
            const decodedString = window.atob(utf8String);
            const newData = JSON.parse(decodedString);
            let resultingData = {
              ...self._data,
              ...newData
            };
            await this.setData(resultingData);
          }
        },
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      }
    ]
  }

  private _getActions(dataSchema: IDataSchema, uiSchema: IUISchema) {
    const actions = [
      {
        name: 'Edit',
        icon: 'edit',
        command: (builder: any, userInputData: any) => {
          let oldData: IThread = { cid: '' };
          let oldTag = {};
          return {
            execute: async () => {
              oldData = JSON.parse(JSON.stringify(this._data));
              const { cid, theme, ...themeSettings } = userInputData;
              const newData = { cid, theme };
              if (builder?.setData) builder.setData(newData);
              this.setData(newData);

              oldTag = JSON.parse(JSON.stringify(this.tag));
              if (builder?.setTag) builder.setTag(themeSettings);
              else this.setTag(themeSettings);
            },
            undo: () => {
              if (builder?.setData) builder.setData(oldData);
              this.setData(oldData);

              this.tag = JSON.parse(JSON.stringify(oldTag));
              if (builder?.setTag) builder.setTag(this.tag);
              else this.setTag(this.tag);
            },
            redo: () => { }
          }
        },
        userInputDataSchema: dataSchema,
        userInputUISchema: uiSchema
      }
    ]
    return actions
  }

  private async getTag() {
    return this.tag;
  }

  private updateTag(type: 'light' | 'dark', value: any) {
    this.tag[type] = this.tag[type] ?? {};
    for (let prop in value) {
      if (value.hasOwnProperty(prop))
        this.tag[type][prop] = value[prop];
    }
  }

  private async setTag(value: any) {
    const newValue = value || {};
    for (let prop in newValue) {
      if (newValue.hasOwnProperty(prop)) {
        if (prop === 'light' || prop === 'dark')
          this.updateTag(prop, newValue[prop]);
        else
          this.tag[prop] = newValue[prop];
      }
    }
    this.updateTheme();
  }

  private updateStyle(name: string, value: any) {
    value ?
      this.style.setProperty(name, value) :
      this.style.removeProperty(name);
  }

  private updateTheme() {
    const themeVar = this.theme || document.body.style.getPropertyValue('--theme');
    this.updateStyle('--text-primary', this.tag[themeVar]?.fontColor);
    this.updateStyle('--text-secondary', this.tag[themeVar]?.secondaryColor);
    this.updateStyle('--background-main', this.tag[themeVar]?.backgroundColor);
    this.updateStyle('--background-modal', this.tag[themeVar]?.backgroundColor);
    this.updateStyle('--input-font_color', this.tag[themeVar]?.inputFontColor);
    this.updateStyle('--input-background', this.tag[themeVar]?.inputBackgroundColor);
    this.updateStyle('--colors-info-main', this.tag[themeVar]?.infoColor);
    this.updateStyle('--colors-info-light', this.tag[themeVar]?.infoBackground);
    this.updateStyle('--colors-primary-main', this.tag[themeVar]?.primaryColor);
    this.updateStyle('--colors-success-main', this.tag[themeVar]?.successColor);
    this.updateStyle('--colors-success-light', this.tag[themeVar]?.successBackground);
    this.updateStyle('--colors-error-main', this.tag[themeVar]?.errorColor);
    this.updateStyle('--colors-error-light', this.tag[themeVar]?.errorBackground);
    this.updateStyle('--colors-secondary-main', this.tag[themeVar]?.subcribeButtonBackground);
    this.updateStyle('--colors-secondary-contrast_text', this.tag[themeVar]?.subcribeButtonColor);
    this.updateStyle('--action-hover', this.tag[themeVar]?.hoverBackgroundColor);
    this.updateStyle('--divider', this.tag[themeVar]?.borderColor);
    this.updateStyle('--colors-secondary-light', this.tag[themeVar]?.groupBorderColor);
    this.updateStyle('--text-disabled', this.tag[themeVar]?.placeholderColor);
  }

  init() {
    super.init();
    const cid = this.getAttribute('cid', true);
    const theme = this.getAttribute('theme', true);
    this.setData({ cid, theme });
    this.style.setProperty('--card-bg-color', `color-mix(in srgb, ${Theme.background.main}, #fff 3%)`);
    this.setTag(JSON.parse(JSON.stringify(defaultColors)));
  }

  render() {
    return (
      <i-vstack
        width="100%" maxWidth={600}
        margin={{left: 'auto', right: 'auto'}}
        background={{color: Theme.background.main}}
        border={{width: '1px', style: 'solid', color: Theme.divider}}
        padding={{bottom: '1rem'}}
        class={customStyles}
      >
        <i-panel>
          <i-scom-thread-status id="mainStatus"></i-scom-thread-status>
        </i-panel>
        <i-modal
          id="mdReply"
          border={{radius: '1rem'}}
          maxWidth={'600px'}
          padding={{top: 0, right: '1rem', left: '1rem', bottom: '1rem'}}
          mediaQueries={[
            {
              maxWidth: '767px',
              properties: {
                showBackdrop: true,
                popupPlacement: 'top',
                position: 'fixed',
                maxWidth: '100%',
                height: '100%',
                width: '100%',
                border: {radius: '0px'}
              }
            }
          ]}
        >
          <i-vstack>
            <i-hstack verticalAlignment="center" minHeight={53}>
              <i-icon
                name="times"
                width={20} height={20}
                class="pointer"
                onClick={this.onClosedReplyMd}
              ></i-icon>
            </i-hstack>
            <i-grid-layout
              id="gridReply"
              width="100%"
              templateColumns={['auto']}
            >
              <i-scom-thread-post
                id="threadPost"
                display='block'
              />
              <i-scom-thread-reply-input
                id="inputPost"
                onSubmit={this.onReplySubmit}
              />
            </i-grid-layout>
          </i-vstack>
        </i-modal>
      </i-vstack>
    );
  }
}
