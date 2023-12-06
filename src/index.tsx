import {
  ControlElement,
  customElements,
  Module,
  Container,
  Styles,
  MarkdownEditor,
  moment,
  IdUtils,
  Panel,
  Control,
  Markdown
} from '@ijstech/components';
import { IThread, IThreadPost } from './interface';
import dataConfig from './data.json';
import { getCurrentUser, setDataFromJson } from './store/index';
import { IPost, IPostData, ScomPost } from '@scom/scom-post';
import { ScomPostComposer } from '@scom/scom-post-composer';

export { IThreadPost };

const Theme = Styles.Theme.ThemeVars;
type clickCallbackType = (target: ScomPost, event: MouseEvent) => void
type submitclickCallbackType = (content: string, medias: IPostData[]) => void

interface ScomThreadElement extends ControlElement {
  data?: IThread;
  onItemClicked?: clickCallbackType;
  onPostButtonClicked?: submitclickCallbackType;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-thread']: ScomThreadElement;
    }
  }
}

@customElements('i-scom-thread')
export class ScomThread extends Module {;
  private pnlMain: Panel;
  private pnlAncestors: Panel;
  private mainPost: ScomPost;
  private inputReply: ScomPostComposer;
  private pnlActions: Panel;

  private _data: IThread = {
    ancestorPosts: [],
    replies: [],
    focusedPost: {
      id: '',
      author: undefined,
      publishDate: '',
      contentElements: []
    }
  };
  private _theme: Markdown['theme'];

  tag = {
    light: {},
    dark: {}
  }
  onItemClicked: clickCallbackType;
  onPostButtonClicked: submitclickCallbackType;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    if (dataConfig) setDataFromJson(dataConfig);
    this.onViewPost = this.onViewPost.bind(this);
  }

  static async create(options?: ScomThreadElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  get ancestorPosts() {
    return this._data.ancestorPosts || [];
  }
  set ancestorPosts(value: IThreadPost[]) {
    this._data.ancestorPosts = value || [];
  }

  get focusedPost() {
    return this._data.focusedPost;
  }
  set focusedPost(value: IThreadPost) {
    this._data.focusedPost = value;
  }

  get replies() {
    return this._data.replies || [];
  }
  set replies(value: IThreadPost[]) {
    this._data.replies = value || [];
  }

  async setData(value: IThread) {
    this._data = value;
    await this.renderUI();
  }

  getData() {
    return this._data;
  }

  clear() {
    this.pnlMain.clearInnerHTML();
    this.pnlAncestors.clearInnerHTML();
    if (this.inputReply) this.inputReply.clear();
  }

  private onViewPost(target: ScomPost, event?: MouseEvent) {
    if (this.onItemClicked) this.onItemClicked(target, event);
  }

  private async renderUI() {
    this.clear();
    this.renderAncestorPosts();
    this.renderFocusedPost();
    this.appendReplyInput()
    this.renderReplies();
  }

  private renderFocusedPost() {
    this.pnlMain.clearInnerHTML();
    this.mainPost = (
      <i-scom-post
        id={this.focusedPost.id}
        data={this.focusedPost}
        type="short"
        isActive={true}
      ></i-scom-post>
    )
    this.mainPost.onProfileClicked = (target: Control, data: IThreadPost) => this.onShowModal(target, data, 'mdThreadActions');
    this.pnlMain.appendChild(this.mainPost);
  }

  private renderAncestorPosts() {
    this.pnlAncestors.clearInnerHTML();
    if (!this.ancestorPosts?.length) return;
    for (let post of this.ancestorPosts) {
      const postEl = (
        <i-scom-post
          data={post}
          position='relative'
          type='short'
        ></i-scom-post>
      );
      postEl.onClick = this.onViewPost;
      postEl.onReplyClicked = () => this.onViewPost(postEl);
      postEl.appendChild(
        <i-panel
          width={'0.125rem'} height={'calc(100% - 2.25rem)'}
          left="2.5625rem" top="3.75rem"
          background={{color: Theme.colors.secondary.main}}
          zIndex={1}
          mediaQueries={[
            {
              maxWidth: '767px',
              properties: {
                left: "2.3125rem"
              }
            }
          ]}
        ></i-panel>
      )
      this.pnlAncestors.append(postEl);
    }
  }

  private renderReplies() {
    if (!this.replies?.length) return;
    const length = this.replies.length - 1;
    for (let i = length; i >= 0; i--) {
      const replyEl = this.mainPost.addReply(this.focusedPost.id, this.replies[i]);
      replyEl.onClick = this.onViewPost;
      replyEl.onReplyClicked = () => this.onViewPost(replyEl);
    }
  }

  private appendReplyInput(){
    const pnlReply = this.mainPost.appendReplyPanel();
    const input = (
      <i-scom-post-composer
        id="inputReply"
        display='block'
        padding={{top: '0.75rem', bottom: '0.75rem', left: '1rem', right: '1rem'}}
        background={{color: Theme.background.paper}}
        margin={{top: '0.25rem'}}
        border={{radius: '.25rem'}}
        width={'100%'}
        placeholder='Post your reply'
        buttonCaption='Reply'
      ></i-scom-post-composer>
    );
    input.setData({ type: 'reply' });
    input.onSubmit = this.onReplySubmit.bind(this);
    pnlReply.gap = '0.5rem';
    pnlReply.prepend(input);
  };

  private renderActions() {
    const actions = [
      {
        caption: 'Copy note link',
        icon: { name: 'copy' }
      },
      {
        caption: 'Copy note text',
        icon: { name: 'copy' }
      },
      {
        caption: 'Copy note ID',
        icon: { name: 'copy' }
      },
      {
        caption: 'Copy raw data',
        icon: { name: 'copy' }
      },
      {
        caption: 'Broadcast note',
        icon: { name: "broadcast-tower" }
      },
      {
        caption: 'Copy user public key',
        icon: { name: 'copy' }
      },
      {
        caption: 'Mute user',
        icon: { name: "user-slash", fill: Theme.colors.error.main },
        hoveredColor: 'color-mix(in srgb, var(--colors-error-main) 25%, var(--background-paper))'
      },
      {
        caption: 'Report user',
        icon: { name: "exclamation-circle", fill: Theme.colors.error.main },
        hoveredColor: 'color-mix(in srgb, var(--colors-error-main) 25%, var(--background-paper))'
      }
    ]
    this.pnlActions.clearInnerHTML();
    for (let i = 0; i < actions.length; i++) {
      const item: any = actions[i];
      this.pnlActions.appendChild(
        <i-hstack
          horizontalAlignment="space-between"
          verticalAlignment="center"
          width="100%"
          padding={{top: '0.625rem', bottom: '0.625rem', left: '0.75rem', right: '0.75rem'}}
          background={{color: 'transparent'}}
          border={{radius: '0.5rem'}}
          opacity={item.hoveredColor ? 1 : 0.667}
          hover={{
            backgroundColor: item.hoveredColor || Theme.action.hoverBackground,
            opacity: 1
          }}
          onClick={() => {
            if (item.onClick) item.onClick();
          }}
        >
          <i-label
            caption={item.caption}
            font={{color: item.icon?.fill || Theme.text.primary, weight: 400, size: '0.875rem'}}
          ></i-label>
          <i-icon
            name={item.icon.name}
            width='0.75rem' height='0.75rem'
            display='inline-flex'
            fill={item.icon?.fill || Theme.text.primary}
          ></i-icon>
        </i-hstack>
      )
    }
    this.pnlActions.appendChild(
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
          background={{color: 'transparent'}}
          boxShadow="none"
          onClick={() => this.onCloseModal('mdShare')}
        ></i-button>
      </i-hstack>
    )
  }

  private onCloseModal(name: string) {
    if (this[name]) this[name].visible = false;
  }

  private onShowModal(target: Control, data: IThreadPost, name: string) {
    if (this[name]) {
      this[name].parent = target;
      this[name].position = 'absolute';
      this[name].refresh();
      this[name].visible = true;
      this[name].classList.add('show');
    }
  }

  private removeShow(name: string) {
    if (this[name]) this[name].classList.remove('show');
  }

  private onReplySubmit(target: MarkdownEditor, medias: IPostData[]) {
    const content = target.getMarkdownValue();
    if (this.onPostButtonClicked) this.onPostButtonClicked(content, medias);
    // const textData = {
    //   module: '@scom/scom-markdown-editor',
    //   data: {
    //     "properties": { content },
    //     "tag": {
    //       "width": "100%",
    //       "pt": 0,
    //       "pb": 0,
    //       "pl": 0,
    //       "pr": 0
    //     }
    //   }
    // }
    // const postDatas = content ? [textData, ...medias] : [...medias];
    // const newPost = {
    //   id: IdUtils.generateUUID(),
    //   publishDate: moment().utc().toString(),
    //   author: getCurrentUser(),
    //   stat: {
    //     reply: 0,
    //     repost: 0,
    //     upvote: 0,
    //     downvote: 0,
    //     view: 0
    //   },
    //   contentElements: [...postDatas]
    // }
  }

  init() {
    super.init();
    this.onItemClicked = this.getAttribute('onItemClicked', true) || this.onItemClicked;
    this.onPostButtonClicked = this.getAttribute('onPostButtonClicked', true) || this.onPostButtonClicked;
    const data = this.getAttribute('data', true);
    if (data) this.setData(data);
    this.style.setProperty('--card-bg-color', `color-mix(in srgb, ${Theme.background.main}, #fff 3%)`);
    this.renderActions();
  }

  render() {
    return (
      <i-vstack
        id="pnlThread"
        width="100%" maxWidth={'100%'}
        margin={{left: 'auto', right: 'auto'}}
        padding={{bottom: '1rem'}}
      >
        <i-vstack id="pnlAncestors" gap={'0.5rem'} margin={{bottom: '0.5rem'}}></i-vstack>
        <i-vstack id="pnlMain"></i-vstack>
        <i-modal
          id="mdThreadActions"
          maxWidth={'15rem'}
          minWidth={'12.25rem'}
          popupPlacement='bottomRight'
          showBackdrop={false}
          border={{radius: '0.25rem', width: '1px', style: 'solid', color: Theme.divider}}
          padding={{top: '0.5rem', left: '0.5rem', right: '0.5rem', bottom: '0.5rem'}}
          mediaQueries={[
            {
              maxWidth: '767px',
              properties: {
                showBackdrop: true,
                popupPlacement: 'bottom',
                position: 'fixed',
                zIndex: 999,
                maxWidth: '100%',
                width: '100%',
                maxHeight: '50vh',
                overflow: {y: 'auto'},
                border: {radius: '16px 16px 0 0'}
              }
            }
          ]}
          onClose={() => this.removeShow('mdThreadActions')}
        >
          <i-vstack id="pnlActions" minWidth={0} maxHeight={'27.5rem'} overflow={{y: 'auto'}}/>
        </i-modal>
      </i-vstack>
    );
  }
}
