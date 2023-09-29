import {
  ControlElement,
  customElements,
  Module,
  Styles,
  GridLayout,
  Control
} from '@ijstech/components';
import { IAnalytic } from '../../interface';
import { formatNumber } from '../../global/index';
import { analyticStyle } from './index.css';
const Theme = Styles.Theme.ThemeVars;

interface ScomThreadAnalyticsElement extends ControlElement {
  data?: IAnalytic[];
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-thread-analytics']: ScomThreadAnalyticsElement;
    }
  }
}

@customElements('i-scom-thread-analytics')
export class ScomThreadAnalytics extends Module {
  private gridAnalysis: GridLayout;

  private _data: IAnalytic[];

  setData(value: IAnalytic[]) {
    this._data = value ?? [];
    this.renderUI();
  }

  getData() {
    return this._data ?? [];
  }

  private renderUI() {
    this.gridAnalysis.clearInnerHTML();
    for (let item of this._data) {
      let itemEl: Control;
      if (item.onRender) {
        itemEl = item.onRender();
      } else {
        itemEl = (
          <i-hstack
            verticalAlignment="center"
            gap='0.5rem'
            tooltip={{content: item.name || '', placement: 'bottomLeft'}}
            class="analytic"
          >
            <i-icon
              name={item.icon} width={28} height={28} fill={Theme.text.secondary}
              border={{radius: '50%'}}
              padding={{top: 5, bottom: 5, left: 5, right: 5}}
            ></i-icon>
            <i-label
              caption={formatNumber(item.value, 0)}
              font={{color: Theme.text.secondary, size: '0.813rem'}}
            ></i-label>
          </i-hstack>
        )
      }
      this.gridAnalysis.appendChild(itemEl);
      if (item.class) itemEl.classList.add(item.class);
      itemEl.onClick = () => {
        if (item.onClick) item.onClick();
      }
    }
    this.gridAnalysis.appendChild(
      <i-hstack class="analytic">
          <i-icon
            name={'share-square'} width={28} height={28} fill={Theme.text.secondary}
            border={{radius: '50%'}}
            padding={{top: 5, bottom: 5, left: 5, right: 5}}
          ></i-icon>
      </i-hstack>
    )
  }

  init() {
    super.init();
    const data = this.getAttribute('data', true);
    if (data) this.setData(data);
  }

  render(): void {
    return (
      <i-grid-layout
        id="gridAnalysis"
        templateColumns={['repeat(4, 1fr)', 'auto']}
        gap={{column: '4px'}}
        padding={{top: '1rem', bottom: '1rem'}}
        width={'100%'}
        class={analyticStyle}
      />
    )
  }
}
