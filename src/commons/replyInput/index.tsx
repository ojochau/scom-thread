import {
  ControlElement,
  customElements,
  Module,
  Styles,
  Markdown,
  Label,
  MarkdownEditor,
  Button,
  Panel,
  GridLayout,
  Image
} from '@ijstech/components';
import { editorStyle } from './index.css';
const Theme = Styles.Theme.ThemeVars;

type IReplyType = 'reply' | 'quote';
interface ScomThreadReplyInputElement extends ControlElement {
  replyTo?: string;
  avatar?: string;
  isReplyToShown?: boolean;
  type?: IReplyType,
  theme?: Markdown["theme"];
  placeholder?: string;
  onChanged?: (target: MarkdownEditor) => void;
  onSubmit?: (target: MarkdownEditor) => void;
}

interface IReplyInput {
  replyTo?: string;
  isReplyToShown?: boolean;
  avatar?: string;
  type?: IReplyType;
  placeholder?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-thread-reply-input']: ScomThreadReplyInputElement;
    }
  }
}

@customElements('i-scom-thread-reply-input')
export class ScomThreadReplyInput extends Module {
  private lbReplyTo: Label;
  private replyEditor: MarkdownEditor;
  private btnReply: Button;
  private pnlReplyTo: Panel;
  private gridReply: GridLayout;
  private imgReplier: Image;

  private _data: IReplyInput;

  public onChanged: (target: MarkdownEditor) => void;
  public onSubmit: (target: MarkdownEditor) => void;

  get replyTo() {
    return this._data.replyTo ?? '';
  }
  set replyTo(value: string) {
    this._data.replyTo = value ?? '';
  }

  get avatar() {
    return this._data.avatar ?? '';
  }
  set avatar(value: string) {
    this._data.avatar = value ?? '';
  }

  get type() {
    return this._data.type ?? 'reply';
  }
  set type(value: IReplyType) {
    this._data.type = value ?? 'reply';
  }

  get placeholder() {
    return this._data.placeholder ?? '';
  }
  set placeholder(value: string) {
    this._data.placeholder = value ?? '';
  }

  get isReplyToShown(): boolean {
    return this._data.isReplyToShown ?? false;
  }
  set isReplyToShown(value: boolean) {
    this._data.isReplyToShown = value ?? false;
  }

  set theme(value: Markdown["theme"]) {
    if (this.replyEditor) this.replyEditor.theme = value;
  }

  setData(value: IReplyInput) {
    this.clear();
    this._data = value;
    this.lbReplyTo.caption = `${this.replyTo}`;
    this.pnlReplyTo.visible = this.isReplyToShown;
    if (this.avatar) this.imgReplier.url = this.avatar;
    this.replyEditor.placeholder = this.placeholder || 'Post your reply';
    this.updateGrid();
  }

  clear() {
    this.pnlReplyTo.visible = false;
    this.lbReplyTo.caption = '';
    this.imgReplier.url = '';
    this.replyEditor.value = '';
  }

  private updateGrid() {
    if (this.isReplyToShown) {
      this.gridReply.templateColumns = ['40px', 'auto'];
      this.gridReply.templateRows = ['minmax(auto, 1fr)', '36px'];
      this.gridReply.templateAreas = [
        ['avatar', 'editor'],
        ['avatar', 'reply']
      ]
    } else {
      this.gridReply.templateAreas = [['avatar', 'editor', 'reply']];
      this.gridReply.templateColumns = ['40px', 'auto', '80px'];
      this.gridReply.templateRows = ['auto'];
    }
    this.pnlReplyTo.visible = this.isReplyToShown;
  }

  private onEditorChanged() {
    this.btnReply.enabled = !!this.replyEditor.getMarkdownValue();
    if (this.onChanged) this.onChanged(this.replyEditor);
  }

  private onReply() {
    if (this.onSubmit) this.onSubmit(this.replyEditor);
  }

  protected _handleClick(event: MouseEvent, stopPropagation?: boolean): boolean {
    if (this.type !== 'quote') {
      this.isReplyToShown = true;
      this.updateGrid();
    }
    return true;
  }

  init() {
    super.init();
    this.onChanged = this.getAttribute('onChanged', true) || this.onChanged;
    this.onSubmit = this.getAttribute('onSubmit', true) || this.onSubmit;
    const replyTo = this.getAttribute('replyTo', true, '');
    const avatar = this.getAttribute('avatar', true, '');
    const type = this.getAttribute('type', true, 'reply');
    const isReplyToShown = this.getAttribute('isReplyToShown', true, false);
    this.setData({isReplyToShown, replyTo, avatar, type});
    const theme = this.getAttribute('theme', true);
    if (theme) this.theme = theme;
  }

  render() {
    return (
      <i-panel padding={{bottom: 12, top: 12}}>
        <i-hstack id="pnlReplyTo" visible={false} gap="0.5rem" verticalAlignment="center" padding={{top: 4, bottom: 12, left: 52}}>
          <i-label caption='Replying to' font={{size: '1rem', color: Theme.text.secondary}}></i-label>
          <i-label id="lbReplyTo" link={{href: ''}} font={{size: '1rem', color: Theme.colors.primary.main}}></i-label>
        </i-hstack>
        <i-grid-layout
          id="gridReply"
          gap={{column: 12}}
        >
          <i-image
            id="imgReplier"
            grid={{area: 'avatar'}}
            width={36} height={36} display="block"
            background={{color: Theme.background.gradient}}
            border={{radius: '50%'}}
            overflow={'hidden'}
            stack={{shrink: '0'}}
            class={'avatar'}
          ></i-image>
          <i-markdown-editor
            id="replyEditor"
            width="100%"
            placeholder="Post your reply"
            viewer={false}
            hideModeSwitch={true}
            mode='wysiwyg'
            toolbarItems={[]}
            font={{size: '1.25rem', color: Theme.text.primary}}
            background={{color: 'transparent'}}
            height="auto" theme='dark'
            onChanged={this.onEditorChanged}
            class={editorStyle}
            grid={{area: 'editor'}}
          ></i-markdown-editor>
          <i-hstack horizontalAlignment="end" grid={{area: 'reply'}}>
            <i-button
              id="btnReply"
              height={36}
              padding={{left: '1rem', right: '1rem'}}
              background={{color: Theme.colors.primary.main}}
              font={{color: Theme.colors.primary.contrastText, bold: true}}
              border={{radius: '30px'}}
              enabled={false}
              caption='Reply'
              onClick={this.onReply}
            ></i-button>
          </i-hstack>
        </i-grid-layout>
      </i-panel>
    )
  }
}
