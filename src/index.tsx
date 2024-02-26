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
    Markdown,
    application,
    Modal
} from '@ijstech/components';
import { IThread, IThreadPost } from './interface';
import dataConfig from './data.json';
import { getCurrentUser, setDataFromJson } from './store/index';
import { IPost, IPostData, ScomPost } from '@scom/scom-post';
import { ScomPostComposer } from '@scom/scom-post-composer';
import './index.css';

export { IThreadPost };

const Theme = Styles.Theme.ThemeVars;
type clickCallbackType = (target: ScomPost, event?: MouseEvent) => void
type submitclickCallbackType = (content: string, medias: IPostData[]) => void

interface ScomThreadElement extends ControlElement {
    data?: IThread;
    onItemClicked?: clickCallbackType;
    onLikeButtonClicked?: clickCallbackType;
    onRepostButtonClicked?: clickCallbackType;
    onPostButtonClicked?: submitclickCallbackType;
    onSignInClick?: () => void;
    env?: string;
    avatar?: string;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['i-scom-thread']: ScomThreadElement;
        }
    }
}

type Action = {
    caption: string;
    icon?: {name: string, fill?: string;};
    tooltip?: string;
    onClick?: (e?: any) => void;
    hoveredColor?: string;
}

@customElements('i-scom-thread')
export class ScomThread extends Module {
    private pnlMain: Panel;
    private pnlAncestors: Panel;
    private mainPost: ScomPost;
    private inputReply: ScomPostComposer;
    private pnlActions: Panel;
    private pnlSignIn: Panel;
    private mdReplyPost: Modal;
    private mdThreadActions: Modal;
    onSignInClick: () => void;
    private inputReplyPost: ScomPostComposer;
    private focusedPostReply: ScomPost;
    private currentContent: Control;
    private env: string;
    private _avatar: string;

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
    private checkIsLogin() {
        const isLoggedIn = !!localStorage.getItem('loggedInAccount') &&
            !!localStorage.getItem('privateKey');
        return isLoggedIn;
    }
    private _theme: Markdown['theme'];

    tag = {
        light: {},
        dark: {}
    }
    onItemClicked: clickCallbackType;
    onLikeButtonClicked: clickCallbackType;
    onRepostButtonClicked: clickCallbackType;
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

    get avatar() {
        return this._avatar;
    }

    set avatar(value: string) {
        this._avatar = value;
        if (this.inputReply) this.inputReply.avatar = value;
        if (this.inputReplyPost) this.inputReplyPost.avatar = value;
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
                onQuotedPostClicked={this.onViewPost}
                disableGutters={true}
            ></i-scom-post>
        );
        this.mainPost.onReplyClicked = (target: Control, data: IPost, event?: MouseEvent) => this.onViewPost(this.mainPost, event);
        this.mainPost.onLikeClicked = (target: Control, data: IPost, event?: MouseEvent) => this.onLikeButtonClicked(this.mainPost, event);
        this.mainPost.onRepostClicked = (target: Control, data: IPost, event?: MouseEvent) => this.onRepostButtonClicked(this.mainPost, event);
        this.mainPost.onProfileClicked = (target: Control, data: IThreadPost, event: Event) => this.onShowModal(target, data, 'mdThreadActions');
        this.pnlMain.appendChild(this.mainPost);
        this.inputReplyPost.focusedPost = this.focusedPost;
    }

    private renderAncestorPosts() {
        this.pnlAncestors.clearInnerHTML();
        if (!this.ancestorPosts?.length) return;
        for (let post of this.ancestorPosts) {
            const postEl = (
                <i-scom-post
                    border={{top: {width: 1, style: 'solid', color: 'rgb(47, 51, 54)'}}}
                    data={post}
                    position='relative'
                    type='short'
                    onQuotedPostClicked={this.onViewPost}
                ></i-scom-post>
            );
            postEl.onClick = this.onViewPost;
            postEl.onReplyClicked = (target: Control, data: IPost, event?: MouseEvent) => this.onViewPost(postEl, event);
            postEl.onLikeClicked = (target: Control, data: IPost, event?: MouseEvent) => this.onLikeButtonClicked(postEl, event);
            postEl.onRepostClicked = (target: Control, data: IPost, event?: MouseEvent) => this.onRepostButtonClicked(postEl, event);
            postEl.onProfileClicked = (target: Control, data: IThreadPost, event: Event) => this.onShowModal(target, data, 'mdThreadActions');
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

    addReply(post: IPost) {
        const replyEl = this.mainPost.addReply(this.focusedPost.id, post);
        replyEl.onClick = this.onViewPost;
        replyEl.onReplyClicked = (target: Control, data: IPost, event?: MouseEvent) => this.onViewPost(replyEl, event);
        replyEl.onLikeClicked = (target: Control, data: IPost, event?: MouseEvent) => this.onLikeButtonClicked(replyEl, event);
        replyEl.onRepostClicked = (target: Control, data: IPost, event?: MouseEvent) => this.onRepostButtonClicked(replyEl, event);
    }

    private renderReplies() {
        if (!this.replies?.length) return;
        const length = this.replies.length - 1;
        for (let i = length; i >= 0; i--) {
            this.addReply(this.replies[i]);
        }
    }

    private appendReplyInput() {
        const isLoggedIn = this.checkIsLogin();
        const pnlReply = this.mainPost.appendReplyPanel();
        pnlReply.gap = '0.5rem';

        const pnlSignIn = (<i-panel id={'pnlSignIn'}
                                    padding={{top: '0.75rem', bottom: '0.75rem', left: '1rem', right: '1rem'}}
                                    background={{color: Theme.background.paper}}
                                    border={{radius: '.25rem'}}
                                    width={'100%'}>
            <i-hstack justifyContent={'center'} alignItems={'center'} gap={5} font={{color: Theme.colors.primary.main}}
                      hover={{fontColor: Theme.colors.primary.light}}>
                <i-button caption={'Sign in now to reply'} font={{size: '1rem', weight: 800, color: 'inherit'}}
                          background={{color: 'transparent'}} onClick={() => {
                    this.onSignInClick && this.onSignInClick()
                }}/>
            </i-hstack>
        </i-panel>) as Panel;

        const input: ScomPostComposer = <i-scom-post-composer
            id="inputReply"
            display='block'
            visible={false}
            padding={{top: '0.75rem', bottom: '0.75rem', left: '1rem', right: '1rem'}}
            // background={{color: Theme.background.paper}}
            border={{radius: '.25rem'}}
            width={'100%'}
            placeholder='Post your reply...'
            buttonCaption='Reply'
            avatar={this._avatar}
            mediaQueries={[
                {
                    maxWidth: '767px',
                    properties: {
                        visible: false
                    }
                }
            ]}
        ></i-scom-post-composer>
        if(this.env === 'prod') {
            input.disableMarkdownEditor();
            input.isAttachmentDisabled = true;
        }
        input.setData({type: 'reply'});
        input.onSubmit = this.onReplySubmit.bind(this);
        pnlReply.prepend(input);
        pnlReply.prepend(pnlSignIn);
        this.inputReply.visible = isLoggedIn;
        this.pnlSignIn.visible = !isLoggedIn;
    };

    private renderActions() {
        const actions: Action[] = [
            {
                caption: 'Copy note link',
                icon: { name: 'copy' },
                tooltip: 'The link has been copied successfully',
                onClick: (e) => {
                    const data = e.closest('i-scom-post')?._data?.data;
                    if(typeof data !== 'undefined') {
                        application.copyToClipboard(`${window.location.origin}/#/e/${data.id}`)
                    }
                    this.mdThreadActions.visible = false;
                }
            },
            {
                caption: 'Copy note text',
                icon: { name: 'copy' },
                tooltip: 'The text has been copied successfully',
                onClick: (e) => {
                    const data = e.closest('i-scom-post')?._data?.data;
                    application.copyToClipboard(data['eventData']?.content)
                    this.mdThreadActions.visible = false;
                }
            },
            {
                caption: 'Copy note ID',
                icon: { name: 'copy' },
                tooltip: 'The ID has been copied successfully',
                onClick: (e) => {
                    const data = e.closest('i-scom-post')?._data?.data;
                    if(typeof data !== 'undefined') {
                        application.copyToClipboard(data.id)
                    }
                    this.mdThreadActions.visible = false;
                }
            },
            {
                caption: 'Copy raw data',
                icon: { name: 'copy' },
                tooltip: 'The raw data has been copied successfully',
                onClick: (e) => {
                    const data = e.closest('i-scom-post')?._data?.data;
                    if(typeof data !== 'undefined') {
                        application.copyToClipboard(JSON.stringify(data['eventData']))
                    }
                    this.mdThreadActions.visible = false;

                }
            },
            // {
            //     caption: 'Broadcast note',
            //     icon: { name: "broadcast-tower" }
            // },
            {
                caption: 'Copy user public key',
                icon: { name: 'copy' },
                tooltip: 'The public key has been copied successfully',
                onClick: (e) => {
                    const data = e.closest('i-scom-post')?._data?.data;
                    if(typeof data !== 'undefined') {
                        application.copyToClipboard(data.author.npub || '')
                    }
                    this.mdThreadActions.visible = false;
                }
            },
            // {
            //     caption: 'Mute user',
            //     icon: { name: "user-slash", fill: Theme.colors.error.main },
            //     hoveredColor: 'color-mix(in srgb, var(--colors-error-main) 25%, var(--background-paper))'
            // },
            // {
            //     caption: 'Report user',
            //     icon: { name: "exclamation-circle", fill: Theme.colors.error.main },
            //     hoveredColor: 'color-mix(in srgb, var(--colors-error-main) 25%, var(--background-paper))'
            // }
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
                    onClick={item.onClick?.bind(this)}
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
                    onClick={() => this.onCloseModal('mdThreadActions')}
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

    async onShow(options) {
        this.mdReplyPost.visible = options.isReplyPost;
        if(options.isReplyPost)
            this.inputReplyPost.setFocus();
    }

    private removeShow(name: string) {
        if (this[name]) this[name].classList.remove('show');
    }

    private onReplySubmit(content: string, medias: IPostData[]) {
        let postDataArr;
        if (content) {
            const textData = {
                module: '@scom/scom-markdown-editor',
                data: {
                    "properties": { content },
                    "tag": {
                        "width": "100%",
                        "pt": 0,
                        "pb": 0,
                        "pl": 0,
                        "pr": 0
                    }
                }
            }
            postDataArr = [textData, ...medias];
        }
        else {
            postDataArr = [...medias];
        }
        if (this.onPostButtonClicked) this.onPostButtonClicked(content, postDataArr);
        this.mdReplyPost.visible = false;
    }

    init() {
        super.init();
        this.env = this.getAttribute('env', true) || this.env;

        this.onItemClicked = this.getAttribute('onItemClicked', true) || this.onItemClicked;
        this.onLikeButtonClicked = this.getAttribute('onLikeButtonClicked', true) || this.onLikeButtonClicked;
        this.onRepostButtonClicked = this.getAttribute('onRepostButtonClicked', true) || this.onRepostButtonClicked;
        this.onPostButtonClicked = this.getAttribute('onPostButtonClicked', true) || this.onPostButtonClicked;
        const avatar = this.getAttribute('avatar', true);
        if (avatar) this.avatar = avatar;
        const data = this.getAttribute('data', true);
        if (data) this.setData(data);
        this.style.setProperty('--card-bg-color', `color-mix(in srgb, ${Theme.background.main}, #fff 3%)`);
        this.renderActions();
        application.EventBus.register(this, 'isAccountLoggedIn', async (data: any) => {
            const loggedIn = data.loggedIn;
            if(this.pnlSignIn) {
                this.pnlSignIn.visible = !loggedIn;
            }
            if(this.inputReply) {
                this.inputReply.visible = loggedIn;
            }
        });
        application.EventBus.register(this, 'FAB_REPLY_POST', () => {
            history.pushState(null, 'Reply', `${location.hash}/reply-post`)
           this.mdReplyPost.visible = true;
            this.inputReplyPost.setFocus();
        });
        if(this.env === 'prod') {
            this.inputReplyPost.disableMarkdownEditor();
            this.inputReplyPost.isAttachmentDisabled = true;
        }
    }

    private handleModalClose() {
        history.replaceState(null, 'Post', location.hash.replace('/reply-post', ''));
        this.mdReplyPost.visible = false;
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
                    visible={false}
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
                <i-modal id={"mdReplyPost"} visible={false}>
                    <i-scom-post-composer
                        id="inputReplyPost"
                        mobile={true}
                        placeholder='Post your reply...'
                        buttonCaption='Reply'
                        autoFocus={true}
                        onCancel={this.handleModalClose.bind(this)}
                        onSubmit={this.onReplySubmit}
                    />
                </i-modal>
            </i-vstack>
        );
    }
}

