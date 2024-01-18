var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-thread/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-thread/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-thread/data.json.ts'/> 
    exports.default = {
        "ipfsGatewayUrl": "https://ipfs.scom.dev/ipfs/"
    };
});
define("@scom/scom-thread/store/index.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getCurrentUser = exports.setUserActions = exports.getUserActions = exports.getUser = exports.setUser = exports.getIPFSGatewayUrl = exports.setIPFSGatewayUrl = exports.setDataFromJson = exports.getMode = exports.setMode = exports.state = void 0;
    const getLocalUser = () => {
        let localData = localStorage.getItem('user');
        try {
            return localData ? JSON.parse(localData) : {};
        }
        catch { }
        return {};
    };
    const defaultUserData = {
        actions: {}
    };
    exports.state = {
        ipfsGatewayUrl: "",
        mode: 'development',
        user: { ...getLocalUser() }
    };
    const setMode = (mode) => {
        exports.state.mode = mode;
    };
    exports.setMode = setMode;
    const getMode = () => {
        return exports.state.mode;
    };
    exports.getMode = getMode;
    const setDataFromJson = (options) => {
        if (options.ipfsGatewayUrl) {
            (0, exports.setIPFSGatewayUrl)(options.ipfsGatewayUrl);
        }
    };
    exports.setDataFromJson = setDataFromJson;
    const setIPFSGatewayUrl = (url) => {
        exports.state.ipfsGatewayUrl = url;
    };
    exports.setIPFSGatewayUrl = setIPFSGatewayUrl;
    const getIPFSGatewayUrl = () => {
        return exports.state.ipfsGatewayUrl;
    };
    exports.getIPFSGatewayUrl = getIPFSGatewayUrl;
    const setUser = (data) => {
        exports.state.user = { ...defaultUserData, ...data };
        localStorage.setItem('user', JSON.stringify(data));
    };
    exports.setUser = setUser;
    const getUser = () => {
        return exports.state.user;
    };
    exports.getUser = getUser;
    const getUserActions = (cid) => {
        return exports.state.user?.actions?.[cid] || null;
    };
    exports.getUserActions = getUserActions;
    const setUserActions = (cid, value) => {
        const useActions = exports.state.user?.actions;
        if (!useActions)
            exports.state.user.actions = {};
        exports.state.user.actions[cid] = { ...value };
        localStorage.setItem('user', JSON.stringify({ ...exports.state.user }));
    };
    exports.setUserActions = setUserActions;
    const getCurrentUser = () => {
        const user = {
            id: "",
            username: "",
            internetIdentifier: "",
            pubKey: "",
            displayName: "",
            description: "",
            avatar: undefined
        };
        return user;
    };
    exports.getCurrentUser = getCurrentUser;
});
define("@scom/scom-thread/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_1.Styles.Theme.ThemeVars;
    components_1.Styles.cssRule('#mdReplyPost', {
        $nest: {
            '.modal': {
                // height: '100%',
                top: 0,
                position: 'absolute',
                padding: 0,
                overflow: 'hidden'
            }
        }
    });
});
define("@scom/scom-thread", ["require", "exports", "@ijstech/components", "@scom/scom-thread/data.json.ts", "@scom/scom-thread/store/index.ts", "@scom/scom-thread/index.css.ts"], function (require, exports, components_2, data_json_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomThread = void 0;
    const Theme = components_2.Styles.Theme.ThemeVars;
    let ScomThread = class ScomThread extends components_2.Module {
        checkIsLogin() {
            const isLoggedIn = !!localStorage.getItem('loggedInAccount') &&
                !!localStorage.getItem('privateKey');
            return isLoggedIn;
        }
        constructor(parent, options) {
            super(parent, options);
            this._data = {
                ancestorPosts: [],
                replies: [],
                focusedPost: {
                    id: '',
                    author: undefined,
                    publishDate: '',
                    contentElements: []
                }
            };
            this.tag = {
                light: {},
                dark: {}
            };
            if (data_json_1.default)
                (0, index_1.setDataFromJson)(data_json_1.default);
            this.onViewPost = this.onViewPost.bind(this);
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        get ancestorPosts() {
            return this._data.ancestorPosts || [];
        }
        set ancestorPosts(value) {
            this._data.ancestorPosts = value || [];
        }
        get focusedPost() {
            return this._data.focusedPost;
        }
        set focusedPost(value) {
            this._data.focusedPost = value;
        }
        get replies() {
            return this._data.replies || [];
        }
        set replies(value) {
            this._data.replies = value || [];
        }
        async setData(value) {
            this._data = value;
            await this.renderUI();
        }
        getData() {
            return this._data;
        }
        clear() {
            this.pnlMain.clearInnerHTML();
            this.pnlAncestors.clearInnerHTML();
            if (this.inputReply)
                this.inputReply.clear();
        }
        onViewPost(target, event) {
            if (this.onItemClicked)
                this.onItemClicked(target, event);
        }
        async renderUI() {
            this.clear();
            this.renderAncestorPosts();
            this.renderFocusedPost();
            this.appendReplyInput();
            this.renderReplies();
        }
        renderFocusedPost() {
            this.pnlMain.clearInnerHTML();
            this.mainPost = (this.$render("i-scom-post", { id: this.focusedPost.id, data: this.focusedPost, type: "short", isActive: true, onQuotedPostClicked: this.onViewPost, disableGutters: true }));
            this.mainPost.onProfileClicked = (target, data) => this.onShowModal(target, data, 'mdThreadActions');
            this.pnlMain.appendChild(this.mainPost);
            this.inputReplyPost.focusedPost = this.focusedPost;
        }
        renderAncestorPosts() {
            this.pnlAncestors.clearInnerHTML();
            if (!this.ancestorPosts?.length)
                return;
            for (let post of this.ancestorPosts) {
                const postEl = (this.$render("i-scom-post", { data: post, position: 'relative', type: 'short', onQuotedPostClicked: this.onViewPost }));
                postEl.onClick = this.onViewPost;
                postEl.onReplyClicked = () => this.onViewPost(postEl);
                postEl.onLikeClicked = () => this.onLikeButtonClicked(postEl);
                postEl.onRepostClicked = () => this.onRepostButtonClicked(postEl);
                postEl.appendChild(this.$render("i-panel", { width: '0.125rem', height: 'calc(100% - 2.25rem)', left: "2.5625rem", top: "3.75rem", background: { color: Theme.colors.secondary.main }, zIndex: 1, mediaQueries: [
                        {
                            maxWidth: '767px',
                            properties: {
                                left: "2.3125rem"
                            }
                        }
                    ] }));
                this.pnlAncestors.append(postEl);
            }
        }
        addReply(post) {
            const replyEl = this.mainPost.addReply(this.focusedPost.id, post);
            replyEl.onClick = this.onViewPost;
            replyEl.onReplyClicked = () => this.onViewPost(replyEl);
            replyEl.onLikeClicked = () => this.onLikeButtonClicked(replyEl);
            replyEl.onRepostClicked = () => this.onRepostButtonClicked(replyEl);
        }
        renderReplies() {
            if (!this.replies?.length)
                return;
            const length = this.replies.length - 1;
            for (let i = length; i >= 0; i--) {
                this.addReply(this.replies[i]);
            }
        }
        appendReplyInput() {
            const isLoggedIn = this.checkIsLogin();
            const pnlReply = this.mainPost.appendReplyPanel();
            pnlReply.gap = '0.5rem';
            const pnlSignIn = (this.$render("i-panel", { id: 'pnlSignIn', padding: { top: '0.75rem', bottom: '0.75rem', left: '1rem', right: '1rem' }, background: { color: Theme.background.paper }, margin: { top: '0.5rem' }, border: { radius: '.25rem' }, width: '100%' },
                this.$render("i-hstack", { justifyContent: 'center', alignItems: 'center', gap: 5, font: { color: Theme.colors.primary.main }, hover: { fontColor: Theme.colors.primary.light } },
                    this.$render("i-button", { caption: 'Sign in now to reply', font: { size: '1rem', weight: 800, color: 'inherit' }, background: { color: 'transparent' }, onClick: () => {
                            this.onSignInClick && this.onSignInClick();
                        } }))));
            const input = this.$render("i-scom-post-composer", { id: "inputReply", display: 'block', visible: false, padding: { top: '0.75rem', bottom: '0.75rem', left: '1rem', right: '1rem' }, background: { color: Theme.background.paper }, margin: { top: '0.25rem' }, border: { radius: '.25rem' }, width: '100%', placeholder: 'Post your reply...', buttonCaption: 'Reply', mediaQueries: [
                    {
                        maxWidth: '767px',
                        properties: {
                            visible: false
                        }
                    }
                ] });
            input.setData({ type: 'reply' });
            input.onSubmit = this.onReplySubmit.bind(this);
            pnlReply.prepend(input);
            pnlReply.prepend(pnlSignIn);
            this.inputReply.visible = isLoggedIn;
            this.pnlSignIn.visible = !isLoggedIn;
        }
        ;
        renderActions() {
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
            ];
            this.pnlActions.clearInnerHTML();
            for (let i = 0; i < actions.length; i++) {
                const item = actions[i];
                this.pnlActions.appendChild(this.$render("i-hstack", { horizontalAlignment: "space-between", verticalAlignment: "center", width: "100%", padding: { top: '0.625rem', bottom: '0.625rem', left: '0.75rem', right: '0.75rem' }, background: { color: 'transparent' }, border: { radius: '0.5rem' }, opacity: item.hoveredColor ? 1 : 0.667, hover: {
                        backgroundColor: item.hoveredColor || Theme.action.hoverBackground,
                        opacity: 1
                    }, onClick: () => {
                        if (item.onClick)
                            item.onClick();
                    } },
                    this.$render("i-label", { caption: item.caption, font: { color: item.icon?.fill || Theme.text.primary, weight: 400, size: '0.875rem' } }),
                    this.$render("i-icon", { name: item.icon.name, width: '0.75rem', height: '0.75rem', display: 'inline-flex', fill: item.icon?.fill || Theme.text.primary })));
            }
            this.pnlActions.appendChild(this.$render("i-hstack", { width: "100%", horizontalAlignment: "center", padding: { top: 12, bottom: 12, left: 16, right: 16 }, visible: false, mediaQueries: [
                    {
                        maxWidth: '767px',
                        properties: { visible: true }
                    }
                ] },
                this.$render("i-button", { caption: 'Cancel', width: "100%", minHeight: 44, padding: { left: 16, right: 16 }, font: { color: Theme.text.primary, weight: 600 }, border: { radius: '30px', width: '1px', style: 'solid', color: Theme.colors.secondary.light }, grid: { horizontalAlignment: 'center' }, background: { color: 'transparent' }, boxShadow: "none", onClick: () => this.onCloseModal('mdShare') })));
        }
        onCloseModal(name) {
            if (this[name])
                this[name].visible = false;
        }
        onShowModal(target, data, name) {
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
        }
        removeShow(name) {
            if (this[name])
                this[name].classList.remove('show');
        }
        onReplySubmit(content, medias) {
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
                };
                postDataArr = [textData, ...medias];
            }
            else {
                postDataArr = [...medias];
            }
            if (this.onPostButtonClicked)
                this.onPostButtonClicked(content, postDataArr);
        }
        init() {
            super.init();
            this.onItemClicked = this.getAttribute('onItemClicked', true) || this.onItemClicked;
            this.onLikeButtonClicked = this.getAttribute('onLikeButtonClicked', true) || this.onLikeButtonClicked;
            this.onRepostButtonClicked = this.getAttribute('onRepostButtonClicked', true) || this.onRepostButtonClicked;
            this.onPostButtonClicked = this.getAttribute('onPostButtonClicked', true) || this.onPostButtonClicked;
            const data = this.getAttribute('data', true);
            if (data)
                this.setData(data);
            this.style.setProperty('--card-bg-color', `color-mix(in srgb, ${Theme.background.main}, #fff 3%)`);
            this.renderActions();
            components_2.application.EventBus.register(this, 'isAccountLoggedIn', async (data) => {
                const loggedIn = data.loggedIn;
                this.pnlSignIn.visible = !loggedIn;
                this.inputReply.visible = loggedIn;
            });
            components_2.application.EventBus.register(this, 'FAB_REPLY_POST', () => {
                history.pushState(null, 'Reply', `${location.hash}/reply-post`);
                this.mdReplyPost.visible = true;
            });
        }
        handleModalClose() {
            history.replaceState(null, 'Post', location.hash.replace('/reply-post', ''));
            this.mdReplyPost.visible = false;
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlThread", width: "100%", maxWidth: '100%', margin: { left: 'auto', right: 'auto' }, padding: { bottom: '1rem' } },
                this.$render("i-vstack", { id: "pnlAncestors", gap: '0.5rem', margin: { bottom: '0.5rem' } }),
                this.$render("i-vstack", { id: "pnlMain" }),
                this.$render("i-modal", { id: "mdThreadActions", visible: false, maxWidth: '15rem', minWidth: '12.25rem', popupPlacement: 'bottomRight', showBackdrop: false, border: { radius: '0.25rem', width: '1px', style: 'solid', color: Theme.divider }, padding: { top: '0.5rem', left: '0.5rem', right: '0.5rem', bottom: '0.5rem' }, mediaQueries: [
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
                                overflow: { y: 'auto' },
                                border: { radius: '16px 16px 0 0' }
                            }
                        }
                    ], onClose: () => this.removeShow('mdThreadActions') },
                    this.$render("i-vstack", { id: "pnlActions", minWidth: 0, maxHeight: '27.5rem', overflow: { y: 'auto' } })),
                this.$render("i-modal", { id: "mdReplyPost", visible: false },
                    this.$render("i-scom-post-composer", { id: "inputReplyPost", mobile: true, placeholder: 'Post your reply...', buttonCaption: 'Reply', onCancel: this.handleModalClose.bind(this) }))));
        }
    };
    ScomThread = __decorate([
        (0, components_2.customElements)('i-scom-thread')
    ], ScomThread);
    exports.ScomThread = ScomThread;
});
