import {
  ControlElement,
  customElements,
  Module,
  Styles,
  Modal,
  Label,
  Button,
  Icon
} from '@ijstech/components';
import { IPostAnalytics } from '../../interface';
import { formatNumber } from '../../global/index';
import { analyticStyle } from './index.css';
const Theme = Styles.Theme.ThemeVars;

interface IAnalyticsConfig extends IPostAnalytics {
  cid: string;
}

interface ScomThreadAnalyticsElement extends ControlElement {
  data?: IAnalyticsConfig;
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
  private mdShare: Modal;
  private mdRepost: Modal;
  private lbReply: Label;
  private lbRepost: Label;
  private lbVote: Label;
  private lbBookmark: Label;
  private iconBookmark: Icon;
  private mdAlert: Modal;
  private lbAlert: Label;
  private btnAlert: Button;

  private _data: IAnalyticsConfig;
  private userActions = {
    bookmarked: false,
    reposted: false,
    voted: 0
  };
  private timer: any;

  public onReplyClicked: (data: { cid: string, type: 'quote'|'reply' }) => void;

  setData(value: IAnalyticsConfig) {
    this._data = value;
    this.renderUI();
  }

  getData() {
    return this._data ?? [];
  }

  private renderUI() {
    this.lbReply.caption = this._data?.reply ? formatNumber(this._data?.reply, 0) : '';
    this.lbRepost.caption = this._data?.repost ? formatNumber(this._data?.repost, 0) : '';
    this.lbVote.caption = this._data?.vote ? formatNumber(this._data?.vote, 0) : '';
    this.lbBookmark.caption = this._data?.bookmark ? formatNumber(this._data?.bookmark, 0) : '';
    if (this.userActions['bookmarked']) {
      this.iconBookmark.fill = Theme.colors.primary.main;
    } else {
      this.iconBookmark.fill = Theme.text.secondary;
    }
  }

  private onShowModal(name: string) {
    this[name].visible = !this[name].visible;
    if (this[name].visible) this[name].classList.add('show');
    else this[name].classList.remove('show');
  }

  private onCloseModal(name: string) {
    this[name].visible = false;
    this[name].classList.remove('show');
  }

  private onHandleReply(type: 'quote'|'reply') {
    if (this.onReplyClicked) this.onReplyClicked({cid: this._data.cid, type});
  }

  private onHandleVote(num: 1 | -1) {
    let voteQty = Number(this._data?.vote || 0);
    this._data.vote = Number(voteQty) + num;
    this.lbVote.caption = formatNumber(this._data.vote, 0);
    this.userActions['voted'] = num;
  }

  private onHandleBookmark() {
    this.userActions['bookmarked'] = !this.userActions['bookmarked'];
    let bookmarkedQty = Number(this._data?.bookmark || 0);
    if (this.userActions['bookmarked']) {
      this.lbAlert.caption = 'Added to your Bookmarks';
      this.btnAlert.visible = true;
      this.iconBookmark.fill = Theme.colors.primary.main;
      this._data.bookmark = Number(bookmarkedQty) + 1;
    } else {
      this.lbAlert.caption = 'Removed from your Bookmarks';
      this.btnAlert.visible = false;
      this.iconBookmark.fill = Theme.text.secondary;
      this._data.bookmark = Number(bookmarkedQty) - 1;
    }
    this.lbBookmark.caption = formatNumber(this._data.bookmark, 0);
    this.mdAlert.visible = true;
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.mdAlert.visible = false;
    }, 3000);
  }

  private onViewBookmark() {}

  onHide(): void {
    if (this.timer) clearTimeout(this.timer);
  }

  init() {
    super.init();
    const data = this.getAttribute('data', true);
    if (data) this.setData(data);
  }

  render(): void {
    return (
      <i-panel class={analyticStyle}>
        <i-hstack
          id="groupAnalysis"
          horizontalAlignment="space-between"
          padding={{top: '0.4rem', bottom: '0.4rem'}}
          width={'100%'}
        >
          <i-hstack
            id="pnlReply"
            verticalAlignment="center"
            tooltip={{content: 'Reply', placement: 'bottomLeft'}}
            class="analytic"
            onClick={() => this.onHandleReply('reply')}
          >
            <i-icon
              name={'comment'} width={34} height={34} fill={Theme.text.secondary}
              border={{radius: '50%'}}
              padding={{top: 8, bottom: 8, left: 8, right: 8}}
            ></i-icon>
            <i-label
              id="lbReply"
              caption=''
              font={{color: Theme.text.secondary, size: '0.813rem'}}
            ></i-label>
          </i-hstack>
          <i-hstack
            id="pnlRepost"
            verticalAlignment="center"
            tooltip={{content: 'Repost', placement: 'bottomLeft'}}
            class="analytic green-icon"
            position="relative"
            onClick={() => this.onShowModal('mdRepost')}
          >
            <i-icon
              name={'retweet'} width={34} height={34} fill={Theme.text.secondary}
              border={{radius: '50%'}}
              padding={{top: 8, bottom: 8, left: 8, right: 8}}
            ></i-icon>
            <i-label
              id="lbRepost"
              caption=''
              font={{color: Theme.text.secondary, size: '0.813rem'}}
            ></i-label>
            <i-modal
              id="mdRepost"
              maxWidth={200}
              minWidth={150}
              popupPlacement='bottomRight'
              showBackdrop={false}
              class='share-modal mobile-modal'
            >
              <i-vstack minWidth={0}>
                <i-button
                  caption='Repost'
                  width="100%"
                  padding={{top: 12, bottom: 12, left: 16, right: 16}}
                  font={{color: Theme.text.primary, weight: 600}}
                  icon={{name: 'retweet', width: 16, height: 16, fill: Theme.text.primary}}
                  grid={{horizontalAlignment: 'start'}}
                  onClick={() => {}}
                ></i-button>
                <i-button
                  caption='Quote'
                  width="100%"
                  padding={{top: 12, bottom: 12, left: 16, right: 16}}
                  font={{color: Theme.text.primary, weight: 600}}
                  icon={{name: 'edit', width: 16, height: 16, fill: Theme.text.primary}}
                  grid={{horizontalAlignment: 'start'}}
                  onClick={() => this.onHandleReply('quote')}
                ></i-button>
                <i-hstack
                  width="100%"
                  horizontalAlignment="center"
                  padding={{top: 12, bottom: 12, left: 16, right: 16}}
                  class='cancel-btn'
                >
                  <i-button
                    caption='Cancel'
                    width="100%" minHeight={44}
                    padding={{left: 16, right: 16}}
                    font={{color: Theme.text.primary, weight: 600}}
                    border={{radius: '30px', width: '1px', style: 'solid', color: Theme.colors.secondary.light}}
                    grid={{horizontalAlignment: 'center'}}
                    onClick={() => this.onCloseModal('mdRepost')}
                  ></i-button>
                </i-hstack>
              </i-vstack>
            </i-modal>
          </i-hstack>
          <i-hstack
            verticalAlignment="center"
            tooltip={{ content: 'Upvote/downvote', placement: 'bottomLeft' }}
            class="analytic red-icon"
          >
            <i-icon
              name={'arrow-up'}
              width={34}
              height={34}
              fill={Theme.text.secondary}
              border={{ radius: '50%' }}
              padding={{ top: 8, bottom: 8, left: 8, right: 8 }}
              onClick={() => this.onHandleVote(1)}
            ></i-icon>
            <i-label
              id="lbVote"
              caption=''
              font={{color: Theme.text.secondary, size: '0.813rem'}}
            ></i-label>
            <i-icon
              name={'arrow-down'}
              width={34}
              height={34}
              fill={Theme.text.secondary}
              border={{ radius: '50%' }}
              padding={{ top: 8, bottom: 8, left: 8, right: 8 }}
              onClick={() => this.onHandleVote(-1)}
            ></i-icon>
          </i-hstack>
          <i-hstack
            verticalAlignment="center"
            tooltip={{content: 'Bookmark', placement: 'bottomLeft'}}
            class="analytic"
            onClick={this.onHandleBookmark}
          >
            <i-icon
              id="iconBookmark"
              name={'bookmark'} width={34} height={34} fill={Theme.text.secondary}
              border={{radius: '50%'}}
              padding={{top: 8, bottom: 8, left: 8, right: 8}}
            ></i-icon>
            <i-label
              id="lbBookmark"
              caption=''
              font={{color: Theme.text.secondary, size: '0.813rem'}}
            ></i-label>
          </i-hstack>
          <i-hstack id="pnlShare" class="analytic" position="relative">
            <i-icon
              name={'share-square'} width={34} height={34} fill={Theme.text.secondary}
              border={{radius: '50%'}}
              padding={{top: 8, bottom: 8, left: 8, right: 8}}
              onClick={() => this.onShowModal('mdShare')}
            ></i-icon>
            <i-modal
              id="mdShare"
              maxWidth={384}
              minWidth={300}
              popupPlacement='bottomRight'
              showBackdrop={false}
              class='share-modal mobile-modal'
            >
              <i-vstack minWidth={0}>
                <i-button
                  caption='Copy link'
                  width="100%"
                  padding={{top: 12, bottom: 12, left: 16, right: 16}}
                  font={{color: Theme.text.primary, weight: 600}}
                  icon={{name: 'link', width: 16, height: 16, fill: Theme.text.primary}}
                  grid={{horizontalAlignment: 'start'}}
                  onClick={() => {}}
                ></i-button>
                <i-button
                  caption='Share post via...'
                  width="100%"
                  padding={{top: 12, bottom: 12, left: 16, right: 16}}
                  font={{color: Theme.text.primary, weight: 600}}
                  icon={{name: 'share', width: 16, height: 16, fill: Theme.text.primary}}
                  grid={{horizontalAlignment: 'start'}}
                  onClick={() => {}}
                ></i-button>
                <i-button
                  caption='Send via Direct Message'
                  width="100%"
                  padding={{top: 12, bottom: 12, left: 16, right: 16}}
                  font={{color: Theme.text.primary, weight: 600}}
                  icon={{name: 'envelope', width: 16, height: 16, fill: Theme.text.primary}}
                  grid={{horizontalAlignment: 'start'}}
                  onClick={() => {}}
                ></i-button>
                <i-button
                  caption='Bookmark'
                  width="100%"
                  padding={{top: 12, bottom: 12, left: 16, right: 16}}
                  font={{color: Theme.text.primary, weight: 600}}
                  icon={{name: 'bookmark', width: 16, height: 16, fill: Theme.text.primary}}
                  grid={{horizontalAlignment: 'start'}}
                  onClick={() => {}}
                ></i-button>
                <i-hstack
                  width="100%"
                  horizontalAlignment="center"
                  padding={{top: 12, bottom: 12, left: 16, right: 16}}
                  class='cancel-btn'
                >
                  <i-button
                    caption='Cancel'
                    width="100%" minHeight={44}
                    padding={{left: 16, right: 16}}
                    font={{color: Theme.text.primary, weight: 600}}
                    border={{radius: '30px', width: '1px', style: 'solid', color: Theme.colors.secondary.light}}
                    grid={{horizontalAlignment: 'center'}}
                    onClick={() => this.onCloseModal('mdShare')}
                  ></i-button>
                </i-hstack>
              </i-vstack>
            </i-modal>
          </i-hstack>
        </i-hstack>
        <i-modal
          id="mdAlert"
          position="fixed"
          maxWidth={'100%'}
          width={'50%'}
          popupPlacement='bottom'
          bottom={'10px'}
          showBackdrop={false}
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
            <i-button
              id="btnAlert"
              font={{color: Theme.colors.primary.contrastText, weight: 600}}
              caption='View'
              onClick={this.onViewBookmark}
            ></i-button>
          </i-hstack>
        </i-modal>
      </i-panel>
    )
  }
}
