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
  Image,
} from '@ijstech/components';
import { editorStyle } from './index.css';
import { ScomThreadComment } from '../comment/index';
import { IPostData } from '../../interface';
const Theme = Styles.Theme.ThemeVars;

type IReplyType = 'reply' | 'quote';
interface ScomThreadReplyInputElement extends ControlElement {
  replyTo?: IPostData;
  isReplyToShown?: boolean;
  type?: IReplyType;
  theme?: Markdown['theme'];
  placeholder?: string;
  onChanged?: (target: MarkdownEditor) => void;
  onSubmit?: (target: MarkdownEditor) => void;
}

interface IReplyInput {
  replyTo?: IPostData;
  isReplyToShown?: boolean;
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
  private pnlBorder: Panel;
  private quotedComment: ScomThreadComment;

  private _data: IReplyInput;

  public onChanged: (target: MarkdownEditor) => void;
  public onSubmit: (target: MarkdownEditor) => void;

  get replyTo() {
    return this._data.replyTo;
  }
  set replyTo(value: IPostData) {
    this._data.replyTo = value;
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

  set theme(value: Markdown['theme']) {
    if (this.replyEditor) this.replyEditor.theme = value;
  }

  private get isQuote() {
    return this.type === 'quote';
  }

  setData(value: IReplyInput) {
    this.clear();
    this._data = value;
    this.lbReplyTo.caption = `@${this.replyTo?.username || ''}`;
    this.pnlReplyTo.visible = this.isReplyToShown;
    this.imgReplier.url = '' // TODO: user avatar
    const defaultPlaceholder = this.isQuote ? 'Add a comment' : 'Post your reply';
    this.replyEditor.placeholder = this.placeholder || defaultPlaceholder;
    this.btnReply.caption = this.isQuote ? 'Post' : 'Reply';
    this.pnlBorder.style.borderTopStyle = this.isQuote ? 'solid' : 'none';
    this.updateGrid();
  }

  clear() {
    this.pnlReplyTo.visible = false;
    this.lbReplyTo.caption = '';
    this.imgReplier.url = '';
    this.replyEditor.value = '';
    this.quotedComment.visible = false;
    this.pnlBorder.border = {
      top: {
        width: '1px',
        style: 'none',
        color: Theme.divider,
      }
    };
    this.btnReply.caption = 'Reply';
  }

  private updateGrid() {
    if (this.isQuote) {
      this.gridReply.templateAreas = [
        ['avatar', 'editor'],
        ['avatar', 'quoted'],
        ['avatar', 'reply'],
      ];
      this.quotedComment.visible = true;
      if (this.replyTo) this.quotedComment.setData({ ...this.replyTo });
      this.isReplyToShown = false;
    } else {
      if (this.isReplyToShown) {
        this.gridReply.templateColumns = ['40px', 'auto'];
        this.gridReply.templateRows = ['minmax(auto, 1fr)', 'auto'];
        this.gridReply.templateAreas = [
          ['avatar', 'editor'],
          ['avatar', 'reply'],
        ];
      } else {
        this.gridReply.templateAreas = [['avatar', 'editor', 'reply']];
        this.gridReply.templateColumns = ['40px', 'auto', '80px'];
        this.gridReply.templateRows = ['auto'];
      }
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
    const replyTo = this.getAttribute('replyTo', true);
    const type = this.getAttribute('type', true, 'reply');
    const isReplyToShown = this.getAttribute('isReplyToShown', true, false);
    this.setData({ isReplyToShown, replyTo, type });
    const theme = this.getAttribute('theme', true);
    if (theme) this.theme = theme;
  }

  render() {
    return (
      <i-panel padding={{ bottom: 12, top: 12 }}>
        <i-hstack
          id="pnlReplyTo"
          visible={false}
          gap="0.5rem"
          verticalAlignment="center"
          padding={{ top: 4, bottom: 12, left: 52 }}
        >
          <i-label
            caption="Replying to"
            font={{ size: '1rem', color: Theme.text.secondary }}
          ></i-label>
          <i-label
            id="lbReplyTo"
            link={{ href: '' }}
            font={{ size: '1rem', color: Theme.colors.primary.main }}
          ></i-label>
        </i-hstack>
        <i-grid-layout id="gridReply" gap={{ column: 12 }}>
          <i-image
            id="imgReplier"
            grid={{ area: 'avatar' }}
            width={40}
            height={40}
            display="block"
            background={{ color: Theme.background.gradient }}
            border={{ radius: '50%' }}
            overflow={'hidden'}
            stack={{basis: '40px'}}
            class={'avatar'}
          ></i-image>
          <i-markdown-editor
            id="replyEditor"
            width="100%"
            placeholder="Post your reply"
            viewer={false}
            hideModeSwitch={true}
            mode="wysiwyg"
            toolbarItems={[]}
            font={{ size: '1.25rem', color: Theme.text.primary }}
            background={{ color: 'transparent' }}
            height="auto"
            theme="dark"
            onChanged={this.onEditorChanged}
            class={editorStyle}
            grid={{ area: 'editor' }}
          ></i-markdown-editor>
          <i-scom-thread-comment
            id="quotedComment"
            width="100%"
            display="block"
            border={{
              width: '1px',
              style: 'solid',
              color: Theme.colors.secondary.light,
              radius: 16,
            }}
            padding={{ left: '12px', right: '12px', top: '12px', bottom: '12px' }}
            visible={false}
            margin={{ top: '1rem' }}
            grid={{ area: 'quoted' }}
          />
          <i-hstack
            id="pnlBorder"
            horizontalAlignment="end"
            grid={{ area: 'reply' }}
            padding={{ top: '12px' }}
            margin={{ top: '1rem' }}
          >
            <i-button
              id="btnReply"
              height={36}
              padding={{ left: '1rem', right: '1rem' }}
              background={{ color: Theme.colors.primary.main }}
              font={{ color: Theme.colors.primary.contrastText, bold: true }}
              border={{ radius: '30px' }}
              enabled={false}
              caption="Reply"
              onClick={this.onReply}
            ></i-button>
          </i-hstack>
        </i-grid-layout>
      </i-panel>
    );
  }
}
