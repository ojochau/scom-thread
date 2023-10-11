import {
  ControlElement,
  customElements,
  Module,
  Styles,
  Modal,
  Label,
  Button,
  Panel
} from '@ijstech/components';
const Theme = Styles.Theme.ThemeVars;

interface IButtonElement extends ControlElement {
  caption: string;
}
interface IToast {
  message: string;
  buttons?: IButtonElement[];
}

interface ScomThreadToastElement extends ControlElement {
  message?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-thread-toast']: ScomThreadToastElement;
    }
  }
}

@customElements('i-scom-thread-toast')
export class ScomThreadToast extends Module {
  private mdAlert: Modal;
  private lbAlert: Label;
  private btnAlert: Button;
  private pnlButtons: Panel;

  private _data: IToast;
  private timer: any;

  set message(value: string) {
    this._data.message = value;
  }
  get message() {
    return this._data.message ?? '';
  }

  set buttons(value: IButtonElement[]) {
    this._data.buttons = value;
  }
  get buttons() {
    return this._data.buttons ?? [];
  }

  async setData(value: IToast) {
    this._data = value;
    this.lbAlert.caption = this.message;
    this.pnlButtons.clearInnerHTML();
    if (this.buttons?.length) {
      for (let item of this.buttons) {
        const btn = await Button.create({...item});
        this.pnlButtons.appendChild(btn);
      }
    }
  }

  getData() {
    return this._data;
  }

  toast() {
    this.mdAlert.visible = true;
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.mdAlert.visible = false;
    }, 2000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.timer) clearTimeout(this.timer);
  }

  init() {
    super.init();
    const message = this.getAttribute('message', true);
    if (message) this.message = message;
  }

  render() {
    return (
      <i-modal
        id="mdAlert"
        position="fixed"
        maxWidth={'100%'}
        width={'50%'}
        popupPlacement='bottom'
        bottom={'10px'}
        padding={{top: 0, left: 0, right: 0, bottom: 0}}
        background={{color: 'transparent'}}
        class="custom-modal"
      >
        <i-hstack
          verticalAlignment="center"
          horizontalAlignment="space-between"
          padding={{top: 12, bottom: 12, left: 16, right: 16}}
          border={{radius: 5, style: 'none'}}
          background={{color: Theme.colors.primary.main}}
        >
          <i-label
            id="lbAlert"
            caption=""
            font={{color: Theme.colors.primary.contrastText}}
          ></i-label>
          <i-hstack
            id="pnlButtons"
            verticalAlignment="center"
            gap="0.5rem"
          />
        </i-hstack>
      </i-modal>
    )
  }
}
