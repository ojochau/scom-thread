var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
            description: "",
            avatar: undefined
        };
        return user;
    };
    exports.getCurrentUser = getCurrentUser;
});
define("@scom/scom-thread/global/utils.ts", ["require", "exports", "@ijstech/components", "@scom/scom-thread/store/index.ts"], function (require, exports, components_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getDuration = exports.formatNumber = exports.getImageIpfsUrl = void 0;
    const getImageIpfsUrl = (url) => {
        const ipfsBaseUrl = (0, index_1.getIPFSGatewayUrl)();
        if (isIpfsCid(url))
            return ipfsBaseUrl + url;
        return url;
    };
    exports.getImageIpfsUrl = getImageIpfsUrl;
    const isIpfsCid = (value) => {
        const regex = new RegExp('^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})$');
        return regex.test(value);
    };
    const formatNumber = (value, decimal) => {
        const numberValue = Number(value);
        if (numberValue >= 10000) {
            return components_1.FormatUtils.formatNumber(value, { shortScale: true, decimalFigures: decimal ?? 0 });
        }
        return components_1.FormatUtils.formatNumber(value, { decimalFigures: decimal ?? 0 });
    };
    exports.formatNumber = formatNumber;
    const getDuration = (date) => {
        const startDate = components_1.FormatUtils.unixToFormattedDate(date);
        const endDate = (0, components_1.moment)(new Date());
        let duration = components_1.moment.duration(endDate.diff(startDate));
        let days = duration.asDays();
        if (days >= 1)
            return components_1.moment.unix(date).format('MMM DD');
        let hours = duration.asHours();
        if (hours >= 1)
            return `${formatNumber(hours, 0)}h`;
        let minutes = duration.asMinutes();
        if (minutes >= 1)
            return `${formatNumber(minutes, 0)}m`;
        let seconds = duration.asSeconds();
        return `${formatNumber(seconds, 0)}s`;
    };
    exports.getDuration = getDuration;
});
define("@scom/scom-thread/global/API.ts", ["require", "exports", "@scom/scom-thread/store/index.ts"], function (require, exports, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fetchDataByCid = exports.searchEmojis = exports.fetchEmojis = exports.colorsMapper = exports.emojiCategories = exports.fetchReactionGifs = exports.fetchGifs = void 0;
    const fetchDataByCid = async (cid) => {
        try {
            const ipfsBaseUrl = (0, index_2.getIPFSGatewayUrl)();
            const url = `${ipfsBaseUrl}/${cid}`;
            const response = await fetch(url);
            return await response.json();
        }
        catch { }
        return null;
    };
    exports.fetchDataByCid = fetchDataByCid;
    const fetchGifs = async (params) => {
        if (!params.offset)
            params.offset = 0;
        if (!params.limit)
            params.limit = 40;
        params.api_key = 'K0QfKNGrvsuY9nPKE1vn9lEGapWEY4eR';
        const queries = params ? new URLSearchParams({
            ...params
        }).toString() : '';
        try {
            const response = await fetch(`http://api.giphy.com/v1/gifs/search?${queries}`);
            return await response.json();
        }
        catch {
            return null;
        }
    };
    exports.fetchGifs = fetchGifs;
    const fetchReactionGifs = async () => {
        const params = {
            api_key: 'K0QfKNGrvsuY9nPKE1vn9lEGapWEY4eR'
        };
        const queries = new URLSearchParams({ ...params }).toString();
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/categories/reactions?${queries}`);
            return await response.json();
        }
        catch {
            return null;
        }
    };
    exports.fetchReactionGifs = fetchReactionGifs;
    exports.emojiCategories = [
        {
            name: 'Recent',
            value: 'recent',
            image: 'https://abs-0.twimg.com/emoji/v2/svg/1f551.svg',
            groups: []
        },
        {
            name: 'Smileys & Emotion',
            value: 'smileys-and-people',
            image: 'https://abs-0.twimg.com/emoji/v2/svg/1f600.svg',
            groups: ['body', 'cat-face', 'clothing', 'creature-face', 'emotion', 'face-negative', 'face-neutral', 'face-positive', 'face-positive', 'face-role', 'face-sick', 'family', 'monkey-face', 'person', 'person-activity', 'person-gesture', 'person-role', 'skin-tone']
        },
        {
            name: 'Animals & nature',
            value: 'animals-and-nature',
            image: 'https://abs-0.twimg.com/emoji/v2/svg/1f43b.svg',
            groups: ['animal-amphibian', 'animal-bird', 'animal-bug', 'animal-mammal', 'animal-marine', 'animal-reptile', 'plant-flower', 'plant-other']
        },
        {
            name: 'Food & drink',
            value: 'food-and-drink',
            image: 'https://abs-0.twimg.com/emoji/v2/svg/1f354.svg',
            groups: ['dishware', 'drink', 'food-asian', 'food-fruit', 'food-prepared', 'food-sweat', 'food-vegetable']
        },
        {
            name: 'Activity',
            value: 'activities',
            image: 'https://abs-0.twimg.com/emoji/v2/svg/26bd.svg',
            groups: ["activities"]
        },
        {
            name: 'Travel & places',
            value: 'travel-and-places',
            image: 'https://abs-0.twimg.com/emoji/v2/svg/1f698.svg',
            groups: ["travel-and-places"]
        },
        {
            name: 'Objects',
            value: 'objects',
            image: 'https://abs-0.twimg.com/emoji/v2/svg/1f4a1.svg',
            groups: ["objects"]
        },
        {
            name: 'Symbols',
            value: 'symbols',
            image: 'https://abs-0.twimg.com/emoji/v2/svg/1f523.svg',
            groups: ["symbols"]
        },
        {
            name: 'Flags',
            value: 'flags',
            image: 'https://abs-0.twimg.com/emoji/v2/svg/1f6a9.svg',
            groups: ["flags"]
        }
    ];
    exports.colorsMapper = {
        'rgb(255, 220, 93)': {
            htmlCode: '',
            unicode: ''
        },
        'rgb(247, 222, 206)': {
            htmlCode: '&#127995;',
            unicode: 'U+1F3FB'
        },
        'rgb(243, 210, 162)': {
            htmlCode: '&#127996;',
            unicode: 'U+1F3FC'
        },
        'rgb(213, 171, 136)': {
            htmlCode: '&#127997;',
            unicode: 'U+1F3FD'
        },
        'rgb(175, 126, 87)': {
            htmlCode: '&#127998;',
            unicode: 'U+1F3FE'
        },
        'rgb(124, 83, 62)': {
            htmlCode: '&#127999;',
            unicode: 'U+1F3FF'
        }
    };
    const EMOJI_BASE_URL = 'https://emojihub.yurace.pro/api/all';
    const fetchEmojis = async (params) => {
        try {
            const uri = `${EMOJI_BASE_URL}/category/${params.category}`;
            const response = await fetch(`${uri}`);
            return await response.json();
        }
        catch {
            return [];
        }
    };
    exports.fetchEmojis = fetchEmojis;
    const searchEmojis = (q, mapper) => {
        const keyword = q.toLowerCase();
        const categoryName = exports.emojiCategories.find(cate => cate.name.toLowerCase().includes(keyword))?.name;
        if (categoryName)
            return mapper.get(categoryName);
        const groups = Array.from(mapper);
        let result = [];
        for (let group of groups) {
            const filteredGroup = [...group].filter(emoji => emoji.name.toLowerCase().includes(keyword));
            result = [...result, ...filteredGroup];
        }
        return result;
    };
    exports.searchEmojis = searchEmojis;
});
define("@scom/scom-thread/global/index.ts", ["require", "exports", "@scom/scom-thread/global/utils.ts", "@scom/scom-thread/global/API.ts"], function (require, exports, utils_1, API_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-thread/global/index.ts'/> 
    __exportStar(utils_1, exports);
    __exportStar(API_1, exports);
});
define("@scom/scom-thread/commons/replyInput/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-thread/global/index.ts", "@scom/scom-thread/store/index.ts"], function (require, exports, components_2, index_3, index_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomThreadReplyInput = void 0;
    const Theme = components_2.Styles.Theme.ThemeVars;
    let ScomThreadReplyInput = class ScomThreadReplyInput extends components_2.Module {
        constructor(parent, options) {
            super(parent, options);
            this.extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'tiff', 'tif', 'mp4', 'avi', 'mkv', 'mov', 'm3u8'];
            this.currentGifPage = 0;
            this.totalGifPage = 1;
            this.renderedMap = {};
            this.bottomObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting)
                        return;
                    if (this.currentGifPage < this.totalGifPage) {
                        ++this.currentGifPage;
                        this.renderGifs(this.inputGif.value || '');
                    }
                    // else {
                    //   this.clearObservers();
                    // }
                });
            }, {
                root: null,
                rootMargin: "20px",
                threshold: 0.9
            });
            this.newReply = [];
            this.isEmojiSearching = false;
            this.recentEmojis = {};
            this.emojiCateMapper = new Map();
            this.emojiGroupsData = new Map();
            this.onRecentClear = this.onRecentClear.bind(this);
            this.onEmojiColorSelected = this.onEmojiColorSelected.bind(this);
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        get replyTo() {
            return this._data.replyTo;
        }
        set replyTo(value) {
            this._data.replyTo = value;
        }
        get type() {
            return this._data.type ?? 'reply';
        }
        set type(value) {
            this._data.type = value ?? 'reply';
        }
        get placeholder() {
            return this._data.placeholder ?? '';
        }
        set placeholder(value) {
            this._data.placeholder = value ?? '';
        }
        get isReplyToShown() {
            return this._data.isReplyToShown ?? false;
        }
        set isReplyToShown(value) {
            this._data.isReplyToShown = value ?? false;
        }
        get isQuote() {
            return this.type === 'quote';
        }
        get hasRecentEmojis() {
            return !!Object.values(this.recentEmojis).length;
        }
        get emojiColors() {
            return Object.keys(index_3.colorsMapper);
        }
        get currentEmojiColor() {
            return this.selectedColor?.background?.color || this.emojiColors[0];
        }
        isRecent(category) {
            return category.value === 'recent';
        }
        setData(value) {
            this.clear();
            this._data = value;
            this.lbReplyTo.caption = `@${this.replyTo?.author?.username || ''}`;
            this.imgReplier.url = (0, index_4.getCurrentUser)()?.avatar || '';
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
            this.pnlBorder.border = {
                top: {
                    width: '1px',
                    style: 'none',
                    color: Theme.divider,
                }
            };
            this.btnReply.caption = 'Reply';
            this.currentGifPage = 1;
            this.totalGifPage = 1;
            this.pnlMedias.clearInnerHTML();
            this.emojiGroupsData = new Map();
        }
        clearObservers() {
            this.bottomElm.visible = false;
            this.bottomObserver.unobserve(this.bottomElm);
            this.renderedMap = {};
        }
        updateGrid() {
            if (this.isQuote) {
                this.gridReply.templateColumns = ['2.75rem', 'auto'];
                this.gridReply.templateAreas = [
                    ['avatar', 'editor'],
                    ['avatar', 'quoted'],
                    ['avatar', 'reply'],
                ];
                this.isReplyToShown = false;
                this.pnlReplyTo.visible = false;
            }
            else {
                if (this.isReplyToShown && !this.pnlReplyTo.visible) {
                    this.gridReply.templateAreas = [['avatar', 'editor', 'reply']];
                    this.gridReply.templateColumns = ['2.75rem', 'auto', '5.5rem'];
                }
                else {
                    this.gridReply.templateColumns = ['2.75rem', 'auto'];
                    this.gridReply.templateAreas = [
                        ['avatar', 'editor'],
                        ['avatar', 'reply'],
                    ];
                }
            }
            this.pnlReplyTo.visible = this.isReplyToShown;
        }
        onEditorChanged() {
            this.btnReply.enabled = !!this.replyEditor.getMarkdownValue();
            if (this.onChanged)
                this.onChanged(this.replyEditor);
        }
        onReply() {
            if (this.onSubmit)
                this.onSubmit(this.replyEditor, [...this.newReply]);
            this.replyEditor.value = '';
            this.pnlMedias.clearInnerHTML();
        }
        async onUpload() {
            const result = components_2.application.uploadFile(this.extensions);
            console.log('onUpload', result);
        }
        onCloseModal(name) {
            this[name].visible = false;
        }
        onShowModal(name) {
            this[name].refresh();
            this[name].visible = true;
        }
        onGifMdOpen() {
            this.autoPlaySwitch.checked = true;
            this.onToggleMainGif(true);
        }
        onGifMdClose() {
            this.clearObservers();
        }
        async renderGifCate() {
            this.gridGifCate.clearInnerHTML();
            const { data = [] } = await (0, index_3.fetchReactionGifs)();
            const limitedList = [...data].slice(0, 8);
            for (let cate of limitedList) {
                this.gridGifCate.appendChild(this.$render("i-panel", { overflow: 'hidden', onClick: () => this.onGifSearch(cate.name) },
                    this.$render("i-image", { url: cate.gif.images['480w_still'].url, width: '100%', display: 'block' }),
                    this.$render("i-label", { caption: cate.name, font: { size: '1.25rem', weight: 700 }, position: "absolute", bottom: "0px", display: "block", width: '100%', padding: { left: '0.5rem', top: '0.5rem', right: '0.5rem', bottom: '0.5rem' } })));
            }
        }
        onGifSelected(gif) {
            this.onCloseModal('mdGif');
            this.btnReply.enabled = true;
            let index = this.newReply.length;
            const mediaWrap = this.$render("i-panel", { background: { color: Theme.action.hover } },
                this.$render("i-panel", { width: '100%', height: '100%', position: 'absolute', zIndex: 5, background: { color: Theme.action.hoverOpacity } }),
                this.$render("i-icon", { name: "times", width: 16, height: 16, fill: Theme.text.primary, border: { radius: '50%' }, padding: { top: 5, bottom: 5, left: 5, right: 5 }, background: { color: 'rgba(15, 20, 25, 0.75)' }, position: 'absolute', right: "10px", top: "10px", zIndex: 9, onClick: () => {
                        mediaWrap.remove();
                        this.newReply.splice(index, 1);
                    } }));
            mediaWrap.parent = this.pnlMedias;
            this.pnlMedias.appendChild(mediaWrap);
            const getPostData = (render) => {
                return {
                    module: '@scom/scom-image',
                    data: {
                        "properties": {
                            url: render ? gif.images.original_still.url : gif.images.original.url
                        },
                        "tag": {
                            "width": "100%",
                            "height": "auto",
                            "pt": 0,
                            "pb": 0,
                            "pl": 0,
                            "pr": 0
                        }
                    }
                };
            };
            this.newReply.push(getPostData(false));
            // TODO: check
            // getEmbedElement(getPostData(true), mediaWrap);
        }
        onGifSearch(q) {
            this.onToggleMainGif(false);
            this.inputGif.value = q;
            this.renderGifs(q);
        }
        onToggleMainGif(value) {
            this.gridGifCate.visible = value;
            this.pnlGif.visible = !value;
            this.currentGifPage = 1;
            this.totalGifPage = 1;
            if (value) {
                this.bottomObserver.unobserve(this.bottomElm);
                this.iconGif.name = 'times';
            }
            else {
                this.bottomObserver.observe(this.bottomElm);
                this.iconGif.name = 'arrow-left';
            }
            this.gridGif.clearInnerHTML();
            this.renderedMap = {};
            this.mdGif.refresh();
        }
        async renderGifs(q) {
            if (this.renderedMap[this.currentGifPage])
                return;
            this.gifLoading.visible = true;
            this.renderedMap[this.currentGifPage] = true;
            const params = { q, offset: this.currentGifPage - 1 };
            const { data = [], pagination: { total_count, count } } = await (0, index_3.fetchGifs)(params);
            this.totalGifPage = Math.ceil(total_count / count);
            this.bottomElm.visible = this.totalGifPage > 1;
            const autoPlay = this.autoPlaySwitch.checked;
            for (let gif of data) {
                this.gridGif.appendChild(this.$render("i-panel", { onClick: () => this.onGifSelected(gif), width: "100%", overflow: 'hidden' },
                    this.$render("i-image", { url: autoPlay ? gif.images.fixed_height.url : gif.images.fixed_height_still.url, width: '100%', height: '100%', objectFit: 'cover', display: 'block' })));
            }
            this.gifLoading.visible = false;
            this.mdGif.refresh();
        }
        onGifPlayChanged(target) {
            this.renderGifs(this.inputGif.value);
        }
        onIconGifClicked(icon) {
            if (icon.name === 'times') {
                this.onCloseModal('mdGif');
            }
            else {
                this.pnlGif.visible = false;
                this.gridGifCate.visible = true;
            }
        }
        async renderEmojis() {
            this.recentEmojis = {};
            this.emojiCateMapper = new Map();
            this.renderEmojiCate();
            for (let category of index_3.emojiCategories) {
                this.renderEmojiGroup(this.groupEmojis, category);
            }
            this.renderColor(this.emojiColors[0]);
        }
        async renderEmojiCate() {
            this.gridEmojiCate.clearInnerHTML();
            for (let category of index_3.emojiCategories) {
                const cateEl = (this.$render("i-vstack", { id: `cate-${category.value}`, overflow: 'hidden', cursor: 'pointer', opacity: 0.5, padding: { top: '0.25rem', bottom: '0.25rem' }, horizontalAlignment: "center", position: 'relative', class: "emoji-cate", gap: '0.5rem', onClick: (target) => this.onEmojiCateSelected(target, category) },
                    this.$render("i-image", { url: category.image, width: '1.25rem', height: '1.25rem', display: 'block' }),
                    this.$render("i-hstack", { visible: false, border: { radius: '9999px' }, height: '0.25rem', width: '100%', position: 'absolute', bottom: "0px", background: { color: Theme.colors.primary.main } })));
                this.gridEmojiCate.appendChild(cateEl);
                this.emojiCateMapper.set(`cate-${category.value}`, cateEl);
            }
        }
        async renderEmojiGroup(parent, category) {
            const group = (this.$render("i-vstack", { id: `${category.value}`, border: { bottom: { width: '1px', style: 'solid', color: Theme.divider } }, gap: "0.75rem", class: "emoji-group" },
                this.$render("i-hstack", { padding: { top: '0.75rem', left: '0.75rem', right: '0.75rem', bottom: '0.75rem' }, position: "sticky", top: "0px", width: '100%', zIndex: 9, background: { color: Theme.background.modal }, verticalAlignment: "center", horizontalAlignment: "space-between" },
                    this.$render("i-label", { caption: category.name, font: { size: '1.063rem', weight: 700 }, wordBreak: "break-word" }),
                    this.$render("i-button", { caption: "Clear all", font: { size: '0.9rem', weight: 700, color: Theme.colors.primary.main }, cursor: 'pointer', boxShadow: 'none', padding: { left: '0.75rem', right: '0.75rem' }, lineHeight: '1.25rem', border: { radius: '9999px' }, background: { color: Theme.colors.info.light }, visible: this.isRecent(category) && this.hasRecentEmojis, onClick: this.onRecentClear }))));
            const itemWrap = this.$render("i-grid-layout", { id: `group-${category.value}`, columnsPerRow: 9, padding: { left: '0.75rem', right: '0.75rem', bottom: '0.75rem' } });
            group.append(itemWrap);
            parent.appendChild(group);
            let data = [];
            if (this.isRecent(category)) {
                data = Object.values(this.recentEmojis);
            }
            else if (category.value === 'search') {
                const result = (0, index_3.searchEmojis)(this.inputEmoji.value, this.emojiGroupsData);
                data = this.filterGroups(result);
            }
            else {
                if (!this.emojiGroupsData.has(category.value)) {
                    const list = await (0, index_3.fetchEmojis)({ category: category.value });
                    this.emojiGroupsData.set(category.value, JSON.parse(JSON.stringify(list)));
                }
                data = this.filterGroups(this.emojiGroupsData.get(category.value));
            }
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                itemWrap.appendChild(this.$render("i-panel", { width: '1.5rem', height: '1.5rem', onClick: (target, event) => this.onEmojiSelected(event, item) },
                    this.$render("i-label", { caption: item.htmlCode.join(''), display: "inline-block" })));
            }
            if (this.isRecent(category)) {
                this.recent = group;
                parent.insertAdjacentElement('afterbegin', group);
            }
        }
        updateEmojiGroups() {
            for (let i = 1; i < index_3.emojiCategories.length; i++) {
                const category = index_3.emojiCategories[i];
                const gridElm = this.groupEmojis.querySelector(`#group-${category.value}`);
                if (!gridElm)
                    continue;
                gridElm.clearInnerHTML();
                const data = this.filterGroups(this.emojiGroupsData.get(category.value));
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    gridElm.appendChild(this.$render("i-panel", { width: '1.5rem', height: '1.5rem', onClick: (target, event) => this.onEmojiSelected(event, item) },
                        this.$render("i-label", { caption: item.htmlCode.join(''), display: "inline-block" })));
                }
            }
        }
        filterGroups(data) {
            const colorHtmlCode = index_3.colorsMapper[this.currentEmojiColor].htmlCode;
            return [...data].filter(item => {
                if (colorHtmlCode) {
                    return item.htmlCode.includes(colorHtmlCode);
                }
                else {
                    const itemLength = item.htmlCode?.length;
                    return itemLength && itemLength !== 2;
                }
            });
        }
        onRecentClear() {
            this.recentEmojis = {};
            if (this.recent) {
                this.recent.clearInnerHTML();
                this.recent = null;
            }
            this.onEmojiCateSelected(this.gridEmojiCate.children[1], index_3.emojiCategories[1]);
        }
        renderEmojiColors() {
            this.pnlColors.clearInnerHTML();
            for (let color of this.emojiColors) {
                this.renderColor(color);
            }
        }
        renderColor(color) {
            const isCurrentColor = color === this.currentEmojiColor;
            const colorEl = (this.$render("i-panel", { background: { color }, border: { radius: '50%' }, width: '1.188rem', height: '1.188rem', padding: { left: '0.35rem' }, stack: { grow: '0', shrink: '0', basis: '1.188rem' }, boxShadow: `${isCurrentColor ? 'rgb(29, 155, 240) 0px 0px 0px 2px' : 'none'}`, onClick: this.onEmojiColorSelected },
                this.$render("i-icon", { name: 'check', width: '0.5rem', height: '0.5rem', lineHeight: '0.35rem', fill: 'rgb(21, 32, 43)', visible: isCurrentColor })));
            if (isCurrentColor)
                this.selectedColor = colorEl;
            this.pnlColors.appendChild(colorEl);
        }
        onEmojiColorSelected(target) {
            if (!this.pnlColors?.children || this.pnlColors?.children?.length < 2) {
                this.renderEmojiColors();
                return;
            }
            if (this.selectedColor) {
                this.selectedColor.boxShadow = 'none';
                const icon = this.selectedColor.querySelector('i-icon');
                if (icon)
                    icon.visible = false;
            }
            target.boxShadow = 'rgb(29, 155, 240) 0px 0px 0px 2px';
            const icon = target.querySelector('i-icon');
            if (icon)
                icon.visible = true;
            this.selectedColor = target;
            this.updateEmojiGroups();
        }
        onEmojiCateSelected(target, category) {
            const preventSelected = this.isEmojiSearching || (this.isRecent(category) && !this.recent?.children[1]?.innerHTML);
            if (preventSelected)
                return;
            const cates = this.querySelectorAll('.emoji-cate');
            for (let cateEl of cates) {
                cateEl.opacity = 0.5;
                cateEl.children[1].visible = false;
            }
            target.children[1].visible = true;
            target.opacity = 1;
            if (this.isRecent(category)) {
                this.groupEmojis.scrollTo({ top: 0 });
            }
            else {
                const groupEl = this.querySelector(`#${category.value}`);
                if (groupEl) {
                    this.groupEmojis.scrollTo({ top: groupEl.offsetTop });
                }
            }
        }
        onEmojiSelected(event, emoji) {
            event.stopImmediatePropagation();
            event.preventDefault();
            this.lbEmoji.caption = `${emoji.htmlCode.join('')}`;
            this.replyEditor.value = this.replyEditor.getMarkdownValue() + `<span style='font-size:1.25rem;'>${emoji.htmlCode.join('')}</span>`;
            this.recentEmojis[emoji.name] = emoji;
            const parent = event.target.closest('.emoji-group');
            if (parent) {
                this.groupEmojis.scrollTo({ top: parent.offsetTop + event.clientY });
            }
        }
        async onEmojiSearch() {
            if (this.searchTimer)
                clearTimeout(this.searchTimer);
            this.pnlEmojiResult.visible = true;
            this.groupEmojis.visible = false;
            this.pnlEmojiResult.clearInnerHTML();
            this.searchTimer = setTimeout(() => {
                const category = {
                    name: 'Search results',
                    value: 'search'
                };
                this.renderEmojiGroup(this.pnlEmojiResult, category);
                this.mdEmoji.refresh();
            }, 100);
            this.isEmojiSearching = true;
        }
        onEmojiMdOpen() {
            this.pnlEmojiResult.visible = false;
            this.groupEmojis.visible = true;
            this.inputEmoji.value = '';
            this.lbEmoji.caption = '';
            this.isEmojiSearching = false;
            if (this.hasRecentEmojis) {
                const recent = this.groupEmojis.querySelector('#recent');
                recent && this.groupEmojis.removeChild(recent);
                this.renderEmojiGroup(this.groupEmojis, index_3.emojiCategories[0]);
            }
            else {
                this.recent && this.recent.clearInnerHTML();
            }
            const index = this.hasRecentEmojis ? 0 : 1;
            this.onEmojiCateSelected(this.gridEmojiCate.children[index], index_3.emojiCategories[index]);
            this.pnlColors.clearInnerHTML();
            this.renderColor(this.currentEmojiColor);
            this.mdEmoji.refresh();
        }
        _handleClick(event, stopPropagation) {
            this.pnlIcons.visible = true;
            if (this.isReplyToShown) {
                this.pnlReplyTo.visible = true;
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
            const placeholder = this.getAttribute('placeholder', true);
            const isReplyToShown = this.getAttribute('isReplyToShown', true, false);
            this.setData({ isReplyToShown, replyTo, type, placeholder });
            this.renderGifCate();
            this.renderEmojis();
        }
        render() {
            return (this.$render("i-panel", { cursor: 'default' },
                this.$render("i-hstack", { id: "pnlReplyTo", visible: false, gap: "0.5rem", verticalAlignment: "center", padding: { top: '0.25rem', bottom: '0.75rem', left: '3.25rem' } },
                    this.$render("i-label", { caption: "Replying to", font: { size: '1rem', color: Theme.text.secondary } }),
                    this.$render("i-label", { id: "lbReplyTo", link: { href: '' }, font: { size: '1rem', color: Theme.colors.primary.main } })),
                this.$render("i-grid-layout", { id: "gridReply", gap: { column: '0.75rem' }, templateColumns: ['2.75rem', 'auto'], templateRows: ['auto'], templateAreas: [
                        ['avatar', 'editor'],
                        ['avatar', 'reply']
                    ] },
                    this.$render("i-image", { id: "imgReplier", grid: { area: 'avatar' }, width: '2.75rem', height: '2.75rem', display: "block", background: { color: Theme.background.gradient }, border: { radius: '50%' }, overflow: 'hidden', margin: { top: '0.75rem' }, objectFit: 'cover' }),
                    this.$render("i-panel", { grid: { area: 'editor' } },
                        this.$render("i-markdown-editor", { id: "replyEditor", width: "100%", viewer: false, hideModeSwitch: true, mode: "wysiwyg", toolbarItems: [], font: { size: '1.25rem', color: Theme.text.primary }, lineHeight: 1.5, padding: { top: 12, bottom: 12, left: 0, right: 0 }, background: { color: 'transparent' }, height: "auto", minHeight: 0, onChanged: this.onEditorChanged, cursor: 'text', border: { style: 'none' } }),
                        this.$render("i-vstack", { id: "pnlMedias", margin: { bottom: '1rem' } })),
                    this.$render("i-hstack", { id: "pnlBorder", horizontalAlignment: "space-between", grid: { area: 'reply' }, padding: { top: '0.75rem' } },
                        this.$render("i-hstack", { id: "pnlIcons", gap: "4px", verticalAlignment: "center", visible: false },
                            this.$render("i-icon", { name: "image", width: 28, height: 28, fill: Theme.colors.primary.main, border: { radius: '50%' }, padding: { top: 5, bottom: 5, left: 5, right: 5 }, tooltip: { content: 'Media', placement: 'bottom' }, onClick: this.onUpload }),
                            this.$render("i-icon", { name: "images", width: 28, height: 28, fill: Theme.colors.primary.main, border: { radius: '50%' }, padding: { top: 5, bottom: 5, left: 5, right: 5 }, tooltip: { content: 'GIF', placement: 'bottom' }, onClick: () => this.onShowModal('mdGif') }),
                            this.$render("i-panel", null,
                                this.$render("i-icon", { name: "smile", width: 28, height: 28, fill: Theme.colors.primary.main, border: { radius: '50%' }, padding: { top: 5, bottom: 5, left: 5, right: 5 }, tooltip: { content: 'Emoji', placement: 'bottom' }, onClick: () => this.onShowModal('mdEmoji') }),
                                this.$render("i-modal", { id: "mdEmoji", maxWidth: '100%', minWidth: 320, popupPlacement: 'bottomRight', showBackdrop: false, border: { radius: '1rem' }, boxShadow: 'rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px', padding: { top: 0, left: 0, right: 0, bottom: 0 }, onOpen: this.onEmojiMdOpen },
                                    this.$render("i-vstack", { position: 'relative', padding: { left: '0.25rem', right: '0.25rem' } },
                                        this.$render("i-hstack", { verticalAlignment: "center", border: { radius: '9999px', width: '1px', style: 'solid', color: Theme.divider }, minHeight: 40, width: '100%', background: { color: Theme.input.background }, padding: { left: '0.75rem', right: '0.75rem' }, margin: { top: '0.25rem', bottom: '0.25rem' }, gap: "4px" },
                                            this.$render("i-icon", { width: '1rem', height: '1rem', name: 'search', fill: Theme.text.secondary }),
                                            this.$render("i-input", { id: "inputEmoji", placeholder: 'Search emojis', width: '100%', height: '100%', border: { style: 'none' }, captionWidth: '0px', showClearButton: true, onClearClick: this.onEmojiMdOpen, onKeyUp: this.onEmojiSearch })),
                                        this.$render("i-grid-layout", { id: "gridEmojiCate", verticalAlignment: "center", columnsPerRow: 9, margin: { top: 4 }, grid: { verticalAlignment: 'center', horizontalAlignment: 'center' }, border: { bottom: { width: '1px', style: 'solid', color: Theme.divider } } }),
                                        this.$render("i-vstack", { id: "groupEmojis", maxHeight: 400, overflow: { y: 'auto' } }),
                                        this.$render("i-vstack", { id: "pnlEmojiResult", border: { bottom: { width: '1px', style: 'solid', color: Theme.divider } }, maxHeight: 400, overflow: { y: 'auto' }, minHeight: 200, gap: "0.75rem", visible: false }),
                                        this.$render("i-hstack", { bottom: "0px", left: "0px", position: "absolute", width: '100%', verticalAlignment: "center", horizontalAlignment: "space-between", padding: { top: '0.75rem', left: '0.75rem', right: '0.75rem', bottom: '0.75rem' }, gap: "0.75rem", zIndex: 20, background: { color: Theme.background.modal }, border: { radius: '0 0 1rem 1rem', top: { width: '1px', style: 'solid', color: Theme.divider } } },
                                            this.$render("i-label", { id: "lbEmoji", width: '1.25rem', height: '1.25rem', display: "inline-block" }),
                                            this.$render("i-hstack", { id: "pnlColors", verticalAlignment: "center", gap: '0.25rem', overflow: 'hidden', cursor: "pointer", padding: { top: '0.25rem', left: '0.25rem', right: '0.25rem', bottom: '0.25rem' } }))))),
                            this.$render("i-icon", { name: "map-marker-alt", width: 28, height: 28, fill: Theme.colors.primary.main, border: { radius: '50%' }, padding: { top: 5, bottom: 5, left: 5, right: 5 }, tooltip: { content: 'SCOM widgets', placement: 'bottom' }, onClick: () => this.onShowModal('mdWidgets') })),
                        this.$render("i-button", { id: "btnReply", height: 36, padding: { left: '1rem', right: '1rem' }, background: { color: Theme.colors.primary.main }, font: { color: Theme.colors.primary.contrastText, bold: true }, border: { radius: '30px' }, enabled: false, margin: { left: 'auto' }, caption: "Reply", onClick: this.onReply }))),
                this.$render("i-modal", { id: "mdGif", border: { radius: '1rem' }, maxWidth: '600px', maxHeight: '90vh', padding: { top: 0, right: 0, left: 0, bottom: 0 }, mediaQueries: [
                        {
                            maxWidth: '767px',
                            properties: {
                                showBackdrop: true,
                                popupPlacement: 'top',
                                position: 'fixed',
                                zIndex: 999,
                                maxWidth: '100%',
                                height: '100%',
                                width: '100%',
                                border: { radius: 0 }
                            }
                        }
                    ], onOpen: this.onGifMdOpen, onClose: this.onGifMdClose },
                    this.$render("i-vstack", null,
                        this.$render("i-hstack", { verticalAlignment: "center", height: 53, margin: { top: 8, bottom: 8 }, padding: { right: '1rem', left: '1rem' }, position: "sticky", zIndex: 2, top: '0px', background: { color: Theme.background.modal } },
                            this.$render("i-panel", { stack: { basis: '56px' } },
                                this.$render("i-icon", { id: "iconGif", name: "times", cursor: 'pointer', width: 20, height: 20, fill: Theme.colors.secondary.main, onClick: this.onIconGifClicked })),
                            this.$render("i-hstack", { verticalAlignment: "center", padding: { left: '0.75rem', right: '0.75rem' }, border: { radius: '9999px', width: '1px', style: 'solid', color: Theme.divider }, minHeight: 40, width: '100%', background: { color: Theme.input.background }, gap: "4px" },
                                this.$render("i-icon", { width: 16, height: 16, name: 'search', fill: Theme.text.secondary }),
                                this.$render("i-input", { id: "inputGif", placeholder: 'Search for Gifs', width: '100%', height: '100%', captionWidth: '0px', border: { style: 'none' }, showClearButton: true, onClearClick: () => this.onToggleMainGif(true), onKeyUp: (target) => this.onGifSearch(target.value) }))),
                        this.$render("i-card-layout", { id: "gridGifCate", cardMinWidth: '18rem', cardHeight: '9.375rem' }),
                        this.$render("i-vstack", { id: "pnlGif", visible: false },
                            this.$render("i-hstack", { horizontalAlignment: "space-between", gap: "0.5rem", padding: { left: '0.75rem', right: '0.75rem', top: '0.75rem', bottom: '0.75rem' } },
                                this.$render("i-label", { caption: "Auto-play GIFs", font: { color: Theme.text.secondary, size: '0.9rem' } }),
                                this.$render("i-switch", { id: "autoPlaySwitch", checked: true, checkedThumbColor: Theme.colors.info.main, checkedTrackColor: Theme.colors.info.light, uncheckedTrackColor: 'rgb(147, 147, 147)', uncheckedThumbColor: Theme.colors.secondary.contrastText, onChanged: this.onGifPlayChanged })),
                            this.$render("i-panel", { id: "topElm", width: '100%' }),
                            this.$render("i-card-layout", { id: "gridGif", autoRowSize: "auto", autoColumnSize: "auto", cardHeight: 'auto', columnsPerRow: 4 }),
                            this.$render("i-panel", { id: "bottomElm", width: '100%', minHeight: 20 },
                                this.$render("i-vstack", { id: "gifLoading", padding: { top: '0.5rem', bottom: '0.5rem' }, visible: false, height: "100%", width: "100%", class: "i-loading-overlay", background: { color: Theme.background.modal } },
                                    this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                                        this.$render("i-icon", { class: "i-loading-spinner_icon", name: "spinner", width: 24, height: 24, fill: Theme.colors.primary.main }))))))),
                this.$render("i-modal", { id: "mdWidgets", border: { radius: '1rem' }, maxWidth: '600px', maxHeight: '90vh', padding: { top: 0, right: 0, left: 0, bottom: 0 }, mediaQueries: [
                        {
                            maxWidth: '767px',
                            properties: {
                                showBackdrop: true,
                                popupPlacement: 'top',
                                position: 'fixed',
                                zIndex: 999,
                                maxWidth: '100%',
                                height: '100%',
                                width: '100%',
                                border: { radius: 0 }
                            }
                        }
                    ] },
                    this.$render("i-vstack", null,
                        this.$render("i-hstack", { verticalAlignment: "center", horizontalAlignment: "space-between", padding: { right: '1rem', left: '1rem', top: '1rem', bottom: '1rem' } },
                            this.$render("i-label", { caption: 'SCOM Widgets', font: { color: Theme.colors.primary.main, size: '1rem', bold: true } }),
                            this.$render("i-icon", { name: "times", cursor: 'pointer', width: 20, height: 20, fill: Theme.colors.secondary.main, onClick: () => this.onCloseModal('mdWidgets') }))))));
        }
    };
    ScomThreadReplyInput = __decorate([
        (0, components_2.customElements)('i-scom-thread--reply-input')
    ], ScomThreadReplyInput);
    exports.ScomThreadReplyInput = ScomThreadReplyInput;
});
define("@scom/scom-thread/commons/toast/index.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomThreadToast = void 0;
    const Theme = components_3.Styles.Theme.ThemeVars;
    let ScomThreadToast = class ScomThreadToast extends components_3.Module {
        set message(value) {
            this._data.message = value;
        }
        get message() {
            return this._data.message ?? '';
        }
        set buttons(value) {
            this._data.buttons = value;
        }
        get buttons() {
            return this._data.buttons ?? [];
        }
        async setData(value) {
            this._data = value;
            this.lbAlert.caption = this.message;
            this.pnlButtons.clearInnerHTML();
            if (this.buttons?.length) {
                for (let item of this.buttons) {
                    const btn = await components_3.Button.create({ ...item });
                    this.pnlButtons.appendChild(btn);
                }
            }
        }
        getData() {
            return this._data;
        }
        toast() {
            this.mdAlert.visible = true;
            if (this.timer)
                clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.mdAlert.visible = false;
            }, 2000);
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            if (this.timer)
                clearTimeout(this.timer);
        }
        init() {
            super.init();
            const message = this.getAttribute('message', true);
            if (message)
                this.message = message;
        }
        render() {
            return (this.$render("i-modal", { id: "mdAlert", position: "fixed", maxWidth: '100%', width: '50%', popupPlacement: 'bottom', bottom: '10px', padding: { top: 0, left: 0, right: 0, bottom: 0 }, background: { color: 'transparent' }, class: "custom-modal" },
                this.$render("i-hstack", { verticalAlignment: "center", horizontalAlignment: "space-between", padding: { top: 12, bottom: 12, left: 16, right: 16 }, border: { radius: 5, style: 'none' }, background: { color: Theme.colors.primary.main } },
                    this.$render("i-label", { id: "lbAlert", caption: "", font: { color: Theme.colors.primary.contrastText } }),
                    this.$render("i-hstack", { id: "pnlButtons", verticalAlignment: "center", gap: "0.5rem" }))));
        }
    };
    ScomThreadToast = __decorate([
        (0, components_3.customElements)('i-scom-thread-toast')
    ], ScomThreadToast);
    exports.ScomThreadToast = ScomThreadToast;
});
define("@scom/scom-thread/commons/index.ts", ["require", "exports", "@scom/scom-thread/commons/replyInput/index.tsx", "@scom/scom-thread/commons/toast/index.tsx"], function (require, exports, index_5, index_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomThreadToast = exports.ScomThreadReplyInput = void 0;
    Object.defineProperty(exports, "ScomThreadReplyInput", { enumerable: true, get: function () { return index_5.ScomThreadReplyInput; } });
    Object.defineProperty(exports, "ScomThreadToast", { enumerable: true, get: function () { return index_6.ScomThreadToast; } });
});
define("@scom/scom-thread/assets.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const moduleDir = components_4.application.currentModuleDir;
    function fullPath(path) {
        return `${moduleDir}/${path}`;
    }
    ;
    exports.default = {
        fullPath
    };
});
define("@scom/scom-thread/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getHoverStyleClass = void 0;
    const Theme = components_5.Styles.Theme.ThemeVars;
    const getHoverStyleClass = (color) => {
        const styleObj = {
            $nest: {
                '&:hover': {
                    color: `${Theme.text.primary} !important`,
                    background: `${color || Theme.action.hoverBackground} !important`,
                    $nest: {
                        'i-label': {
                            color: `${Theme.text.primary} !important`
                        }
                    }
                }
            }
        };
        return components_5.Styles.style(styleObj);
    };
    exports.getHoverStyleClass = getHoverStyleClass;
});
define("@scom/scom-thread", ["require", "exports", "@ijstech/components", "@scom/scom-thread/data.json.ts", "@scom/scom-thread/store/index.ts", "@scom/scom-thread/assets.ts", "@scom/scom-thread/index.css.ts"], function (require, exports, components_6, data_json_1, index_7, assets_1, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomThread = void 0;
    const Theme = components_6.Styles.Theme.ThemeVars;
    let ScomThread = class ScomThread extends components_6.Module {
        ;
        constructor(parent, options) {
            super(parent, options);
            this._data = {
                posts: [],
                quotedPosts: []
            };
            this.tag = {
                light: {},
                dark: {}
            };
            if (data_json_1.default)
                (0, index_7.setDataFromJson)(data_json_1.default);
            this.onViewPost = this.onViewPost.bind(this);
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        get posts() {
            return this._data.posts || [];
        }
        set posts(value) {
            this._data.posts = value || [];
        }
        get quotedPosts() {
            return this._data.quotedPosts || [];
        }
        set quotedPosts(value) {
            this._data.quotedPosts = value || [];
        }
        set theme(value) {
            this._theme = value;
            // this.updateTheme();
        }
        get theme() {
            return this._theme;
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
            if (this.inputReply)
                this.inputReply.clear();
        }
        onViewPost(target) {
            if (this.onItemClicked)
                this.onItemClicked(target);
        }
        async renderUI() {
            this.clear();
            if (this.posts?.length) {
                this.renderFocusedPost(this.posts[0]);
                this.appendReplyInput();
                this.renderReplies();
            }
        }
        renderFocusedPost(post) {
            this.mainPost = (this.$render("i-scom-post", { id: post.id, data: {
                    ...post,
                    quotedPosts: this.quotedPosts
                }, type: "short", isActive: true }));
            this.mainPost.onProfileClicked = (target, data) => this.onShowModal(target, data, 'mdThreadActions');
            this.pnlMain.appendChild(this.mainPost);
        }
        renderReplies() {
            const length = this.posts.length - 1;
            for (let i = length; i >= 1; i--) {
                const replyEl = this.mainPost.addReply(this.mainPost.id, this.posts[i]);
                replyEl.onClick = this.onViewPost;
                replyEl.onReplyClicked = () => this.onViewPost(replyEl);
            }
        }
        appendReplyInput() {
            const pnlReply = this.mainPost.appendReplyPanel();
            const input = (this.$render("i-scom-thread--reply-input", { id: "inputReply", display: 'block', padding: { top: '0.75rem', bottom: '0.75rem', left: '1rem', right: '1rem' }, background: { color: Theme.background.paper }, margin: { top: '0.25rem' }, border: { radius: '.25rem' }, width: '100%' }));
            input.setData({ type: 'reply' });
            input.onSubmit = this.onReplySubmit.bind(this);
            pnlReply.gap = '0.5rem';
            pnlReply.prepend(input);
        }
        ;
        renderActions() {
            const actions = [
                {
                    caption: 'Zap',
                    icon: assets_1.default.fullPath('img/zap.svg')
                },
                {
                    caption: 'Copy note link',
                    icon: assets_1.default.fullPath('img/note_link.svg')
                },
                {
                    caption: 'Copy note text',
                    icon: assets_1.default.fullPath('img/note_text.svg')
                },
                {
                    caption: 'Copy note ID',
                    icon: assets_1.default.fullPath('img/note_id.svg')
                },
                {
                    caption: 'Copy raw data',
                    icon: assets_1.default.fullPath('img/raw_data.svg')
                },
                {
                    caption: 'Broadcast note',
                    icon: assets_1.default.fullPath('img/broadcast.svg')
                },
                {
                    caption: 'Copy user public key',
                    icon: assets_1.default.fullPath('img/pubkey.svg')
                },
                {
                    caption: 'Mute user',
                    icon: assets_1.default.fullPath('img/mute_user.svg'),
                    hoveredColor: 'color-mix(in srgb, var(--colors-error-main) 25%, var(--background-paper))'
                },
                {
                    caption: 'Report user',
                    icon: assets_1.default.fullPath('img/report.svg'),
                    hoveredColor: 'color-mix(in srgb, var(--colors-error-main) 25%, var(--background-paper))'
                }
            ];
            this.pnlActions.clearInnerHTML();
            for (let i = 0; i < actions.length; i++) {
                const item = actions[i];
                this.pnlActions.appendChild(this.$render("i-hstack", { horizontalAlignment: "space-between", verticalAlignment: "center", width: "100%", padding: { top: '0.625rem', bottom: '0.625rem', left: '0.75rem', right: '0.75rem' }, background: { color: 'transparent' }, border: { radius: '0.5rem' }, class: (0, index_css_1.getHoverStyleClass)(item?.hoveredColor), onClick: () => {
                        if (item.onClick)
                            item.onClick();
                    } },
                    this.$render("i-label", { caption: item.caption, font: { color: Theme.colors.secondary.light, weight: 400, size: '0.875rem' } }),
                    this.$render("i-image", { url: item.icon, width: '0.75rem', height: '0.75rem', display: 'inline-flex' })));
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
        removeShow(name) {
            if (this[name])
                this[name].classList.remove('show');
        }
        onReplySubmit(target, medias) {
            const content = target.getMarkdownValue();
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
            const postDatas = content ? [textData, ...medias] : [...medias];
            const newPost = {
                id: components_6.IdUtils.generateUUID(),
                publishDate: (0, components_6.moment)().utc().toString(),
                author: (0, index_7.getCurrentUser)(),
                stat: {
                    reply: 0,
                    repost: 0,
                    upvote: 0,
                    downvote: 0,
                    view: 0
                },
                data: [...postDatas]
            };
            const newReplyElm = this.mainPost.addReply(this.mainPost.id, newPost);
            newReplyElm.onClick = this.onViewPost;
        }
        init() {
            super.init();
            this.onItemClicked = this.getAttribute('onItemClicked', true) || this.onItemClicked;
            const data = this.getAttribute('data', true);
            if (data)
                this.setData(data);
            const theme = this.getAttribute('theme', true);
            const themeVar = theme || document.body.style.getPropertyValue('--theme');
            if (themeVar)
                this.theme = themeVar;
            this.style.setProperty('--card-bg-color', `color-mix(in srgb, ${Theme.background.main}, #fff 3%)`);
            this.renderActions();
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlThread", width: "100%", maxWidth: '100%', margin: { left: 'auto', right: 'auto' }, padding: { bottom: '1rem' } },
                this.$render("i-vstack", { id: "pnlMain" }),
                this.$render("i-vstack", { id: "pnlComment", gap: '0.5rem' }),
                this.$render("i-modal", { id: "mdThreadActions", maxWidth: '15rem', minWidth: '12.25rem', popupPlacement: 'bottomRight', showBackdrop: false, border: { radius: '0.25rem', width: '1px', style: 'solid', color: Theme.divider }, padding: { top: '0.5rem', left: '0.5rem', right: '0.5rem', bottom: '0.5rem' }, mediaQueries: [
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
                    this.$render("i-vstack", { id: "pnlActions", minWidth: 0, maxHeight: '27.5rem', overflow: { y: 'auto' } }))));
        }
    };
    ScomThread = __decorate([
        (0, components_6.customElements)('i-scom-thread')
    ], ScomThread);
    exports.ScomThread = ScomThread;
});
