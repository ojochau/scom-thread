import {
  ControlElement,
  customElements,
  Module,
  Styles,
  Modal,
  Label,
  Button,
  Icon,
  application
} from '@ijstech/components';
import { IPostAnalytics, ReplyType } from '../../interface';
import { formatNumber } from '../../global/index';
import { analyticStyle } from './index.css';
import { getUserActions, setUserActions } from '../../store/index';
import { ScomThreadToast } from '../toast/index';
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
  private toastElm: ScomThreadToast;
  private lbReply: Label;
  private lbRepost: Label;
  private lbVote: Label;
  private lbBookmark: Label;
  private iconBookmark: Icon;

  private _data: IAnalyticsConfig;
  private userActions = {
    bookmarked: false,
    voted: 0
  }

  public onReplyClicked: (type: ReplyType) => void;

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
    const storedData = getUserActions(this._data.cid);
    if (storedData) this.userActions = {...storedData};
    if (this.userActions['bookmarked']) {
      this.iconBookmark.fill = Theme.colors.primary.main;
    } else {
      this.iconBookmark.fill = Theme.text.secondary;
    }
    const bookmark = this.userActions['bookmarked'] ? Number(this._data?.bookmark ?? 0) + 1 : this._data?.bookmark;
    this.lbBookmark.caption = bookmark ? formatNumber(bookmark, 0) : '';
  }

  private onShowModal(name: string) {
    this[name].visible = !this[name].visible;
    if (this[name].visible) this[name].classList.add('show');
    else this[name].classList.remove('show');
  }

  private onCloseModal(name: string) {
    this[name].visible = false;
    this.removeShow(name);
  }

  private removeShow(name: string) {
    this[name].classList.remove('show');
  }

  private onHandleReply(type: ReplyType) {
    if (this.onReplyClicked) this.onReplyClicked(type);
  }

  private onHandleVote(num: 1 | -1) {
    let voteQty = Number(this._data?.vote || 0);
    this._data.vote = Number(voteQty) + num;
    this.lbVote.caption = formatNumber(this._data.vote, 0);
    this.userActions['voted'] = num;
    setUserActions(this._data.cid, {...this.userActions});
  }

  private onHandleBookmark() {
    const bookmarked = this.userActions['bookmarked'] ?? false;
    this.userActions['bookmarked'] = !bookmarked;
    let bookmarkedQty = Number(this._data?.bookmark || 0);
    if (this.userActions['bookmarked']) {
      this.toastElm.setData({
        message: 'Added to your Bookmarks',
        buttons: [
          {
            caption: 'View',
            font: {color: Theme.colors.primary.contrastText, weight: 600},
            onClick: () => {}
          }
        ]
      });
      this.iconBookmark.fill = Theme.colors.primary.main;
      this._data.bookmark = bookmarkedQty + 1;
    } else {
      this.toastElm.setData({
        message: 'Removed from your Bookmarks'
      });
      this.iconBookmark.fill = Theme.text.secondary;
      this._data.bookmark = bookmarkedQty <= 0 ? 0 : bookmarkedQty - 1;
    }
    this.lbBookmark.caption = formatNumber(this._data.bookmark, 0);
    this.toastElm.toast();
    setUserActions(this._data.cid, {...this.userActions});
  }

  private async onCopyLink() {
    await application.copyToClipboard(`/${this._data.cid}`);
    this.toastElm.setData({
      message: 'Copied to clipboard'
    });
    this.toastElm.toast();
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
            onClick={() => this.onHandleReply(ReplyType.REPLY)}
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
              border={{radius: 12}}
              padding={{top: '0px', left: '0px', right: '0px', bottom: '0px'}}
              class='share-modal'
              mediaQueries={[
                {
                  maxWidth: '767px',
                  properties: {
                    showBackdrop: true,
                    popupPlacement: 'bottom',
                    position: 'fixed',
                    maxWidth: '100%',
                    width: '100%',
                    border: {radius: '16px 16px 0 0'}
                  }
                }
              ]}
              onClose={() => this.removeShow('mdRepost')}
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
                  onClick={() => this.onHandleReply(ReplyType.QUOTE)}
                ></i-button>
                <i-hstack
                  width="100%"
                  horizontalAlignment="center"
                  padding={{top: 12, bottom: 12, left: 16, right: 16}}
                  visible={false}
                  mediaQueries={[
                    {
                      maxWidth: '767px',
                      properties: { visible: true }
                    }
                  ]}
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
              border={{radius: 12}}
              padding={{top: '0px', left: '0px', right: '0px', bottom: '0px'}}
              class='share-modal'
              mediaQueries={[
                {
                  maxWidth: '767px',
                  properties: {
                    showBackdrop: true,
                    popupPlacement: 'bottom',
                    position: 'fixed',
                    maxWidth: '100%',
                    width: '100%',
                    maxHeight: '50vh',
                    border: {radius: '16px 16px 0 0'}
                  }
                }
              ]}
              onClose={() => this.removeShow('mdShare')}
            >
              <i-vstack minWidth={0}>
                <i-button
                  caption='Copy link'
                  width="100%"
                  padding={{top: 12, bottom: 12, left: 16, right: 16}}
                  font={{color: Theme.text.primary, weight: 600}}
                  icon={{name: 'link', width: 16, height: 16, fill: Theme.text.primary}}
                  grid={{horizontalAlignment: 'start'}}
                  onClick={this.onCopyLink}
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
                  visible={false}
                  mediaQueries={[
                    {
                      maxWidth: '767px',
                      properties: { visible: true }
                    }
                  ]}
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
        <i-scom-thread-toast id="toastElm" />
      </i-panel>
    )
  }
}
