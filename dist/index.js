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
define("@scom/scom-thread/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.modalStyle = exports.customStyles = exports.multiLineTextStyle = exports.labelStyle = exports.spinnerStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    const spin = components_1.Styles.keyframes({
        "to": {
            "-webkit-transform": "rotate(360deg)"
        }
    });
    exports.spinnerStyle = components_1.Styles.style({
        display: "inline-block",
        width: "2.5rem",
        height: "2.5rem",
        border: "3px solid transparent",
        borderRadius: "50%",
        borderTopColor: Theme.colors.primary.main,
        borderRightColor: Theme.colors.primary.main,
        "animation": `${spin} 0.46s linear infinite`,
        "-webkit-animation": `${spin} 0.46s linear infinite`
    });
    exports.labelStyle = components_1.Styles.style({
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    });
    exports.multiLineTextStyle = components_1.Styles.style({
        display: '-webkit-box',
        '-webkit-line-clamp': 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
    });
    exports.customStyles = components_1.Styles.style({
        $nest: {
            '.hovered-icon': {
                transition: 'background 0.3s ease-in'
            },
            '.hovered-icon:hover': {
                background: Theme.colors.primary.main
            },
            '.avatar img': {
                objectFit: 'cover'
            }
        }
    });
    exports.modalStyle = components_1.Styles.style({
        $nest: {
            '.modal': {
                padding: '0 1rem 1rem',
                borderRadius: '1rem',
            },
            '.modal .i-modal_header': {
                display: 'none'
            }
        }
    });
});
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
    exports.getIPFSGatewayUrl = exports.setIPFSGatewayUrl = exports.setDataFromJson = exports.state = void 0;
    ///<amd-module name='@scom/scom-thread/store/index.ts'/> 
    exports.state = {
        ipfsGatewayUrl: ""
    };
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
});
define("@scom/scom-thread/global/utils.ts", ["require", "exports", "@ijstech/components", "@scom/scom-thread/store/index.ts"], function (require, exports, components_2, index_1) {
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
            return components_2.FormatUtils.formatNumber(value, { shortScale: true, decimalFigures: decimal !== null && decimal !== void 0 ? decimal : 0 });
        }
        return components_2.FormatUtils.formatNumber(value, { decimalFigures: decimal !== null && decimal !== void 0 ? decimal : 0 });
    };
    exports.formatNumber = formatNumber;
    const getDuration = (date) => {
        const startDate = components_2.FormatUtils.unixToFormattedDate(date);
        const endDate = (0, components_2.moment)(new Date());
        let duration = components_2.moment.duration(endDate.diff(startDate));
        let days = duration.asDays();
        if (days >= 1)
            return components_2.moment.unix(date).format('MMM DD');
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
define("@scom/scom-thread/global/localData/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-thread/global/localData/data.json.ts'/> 
    exports.default = {
        "username": "OpenSwap",
        "description": "We are thrilled to announce that the OpenSwap Bridge has officially launched its pilot phase! This means that you can now transfer your $OSWAP tokens between the BNB Smart Chain and Avalanche.",
        "dataUri": "bafybeicijtusosl6v3xdmvva2ggsuazfqk54qpv7z4yfib5asmbeeps3uq",
        "owner": "0xaA530FC26ee1Be26a27ca2CC001e74b972563a22",
        "avatar": "https://placehold.co/50",
        "publishDate": 1695876446.837,
        "analytics": {
            reply: 7,
            repost: 4,
            like: 2300,
            bookmark: 950000,
            view: 10000000
        },
        replies: [
            {
                cid: 'bafybeicijtusosl6v3xdmvva2ggsuazfqk54qpv7z4yfib5asmbeeps3uq'
            },
            {
                cid: 'bafybeicijtusosl6v3xdmvva2ggsuazfqk54qpv7z4yfib5asmbeeps3uq'
            }
        ]
    };
});
define("@scom/scom-thread/global/localData/scconfig.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-thread/global/localData/scconfig.json.ts'/> 
    exports.default = {
        "sections": [
            {
                "id": "6876b0ab-a29c-4ed8-905e-51cd515fa26c",
                "row": 0,
                "name": "First section",
                "elements": [
                    {
                        "id": "ed212703-9bb6-4bc4-9cc3-4d98136dcb06",
                        "column": 1,
                        "columnSpan": 12,
                        "module": {},
                        "tag": {
                            "pt": '0px',
                            "pb": '0px'
                        },
                        "elements": [
                            {
                                "id": "c30c832b-8d9f-4ecc-963d-0a45085c3332",
                                "column": 1,
                                "columnSpan": 12,
                                "properties": {
                                    "content": "<span class=\"p5\">We are thrilled to announce that the OpenSwap Bridge has officially launched its pilot phase! This means that you can now transfer your $OSWAP tokens between the </span>[<span style=\"color: #585858\" class=\"p5\">BNB Smart Chain</span>](https://www.bnbchain.org/en/smartChain)<span style=\"color: #585858\" class=\"p5\"> and </span>[<span style=\"color: #585858\" class=\"p5\">Avalanche</span>](https://www.avax.network/)<span style=\"color: #585858\" class=\"p5\">.</span>"
                                },
                                "module": {
                                    "name": "Text box",
                                    "path": "scom-markdown-editor",
                                    "category": "widgets",
                                    "imgUrl": "https://ipfs.scom.dev/ipfs/bafybeicn7huboxcg5aiietevo2dwdmigsnpfokg7erxhaysbqdezz4p2qq/composables/textbox.png"
                                },
                                "tag": {
                                    "width": "100%",
                                    "pt": '0px',
                                    "pb": '0px'
                                }
                            },
                            {
                                "id": "ad666a03-715e-4611-8605-33652ce51ba3",
                                "column": 1,
                                "columnSpan": 12,
                                "properties": {
                                    "title": "",
                                    "description": "",
                                    "linkUrl": "",
                                    "isExternal": false,
                                    "backgroundImageUrl": "https://miro.medium.com/v2/resize:fit:720/format:webp/1*bvMYR5ACNydZ4P1PP3kYaw.png",
                                    "userName": "",
                                    "avatar": ""
                                },
                                "module": {
                                    "name": "Blog",
                                    "path": "scom-blog",
                                    "category": "widgets",
                                    "disableClicked": true,
                                    "imgUrl": "https://ipfs.scom.dev/ipfs/bafybeicn7huboxcg5aiietevo2dwdmigsnpfokg7erxhaysbqdezz4p2qq/composables/blog.png"
                                },
                                "tag": {
                                    "titleFontColor": "#565656",
                                    "descriptionFontColor": "#565656",
                                    "linkTextColor": "#FE8B10",
                                    "dateColor": "#565656",
                                    "userNameColor": "#565656",
                                    "backgroundColor": "transparent",
                                    "pt": '0px',
                                    "pb": '0px'
                                }
                            }
                        ],
                        "config": {
                            "backgroundColor": "#e09e9eff",
                            "margin": {
                                "x": "auto",
                                "y": "0"
                            },
                            "sectionWidth": 1000,
                            "textColor": "#000000de",
                            "customBackdrop": false,
                            "backdropColor": "",
                            "padding": {
                                "bottom": 0,
                                "left": 0,
                                "right": 0,
                                "top": 0
                            },
                            "fullWidth": false,
                            "customBackgroundColor": false,
                            "customTextColor": false,
                            "customTextSize": false,
                            "textSize": "md",
                            "border": false,
                            "borderColor": ""
                        }
                    }
                ],
                config: {
                    "backgroundColor": "#e09e9eff",
                    "padding": {
                        "bottom": 0,
                        "left": 0,
                        "right": 0,
                        "top": 0
                    }
                }
            }
        ]
    };
});
define("@scom/scom-thread/global/API.ts", ["require", "exports", "@scom/scom-thread/store/index.ts", "@scom/scom-thread/global/localData/data.json.ts", "@scom/scom-thread/global/localData/scconfig.json.ts"], function (require, exports, index_2, data_json_1, scconfig_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getWidgetData = exports.fetchDataByCid = void 0;
    const fetchDataByCid = async (cid) => {
        return Object.assign({}, data_json_1.default);
        try {
            const ipfsBaseUrl = (0, index_2.getIPFSGatewayUrl)();
            const url = `${ipfsBaseUrl}/${cid}`;
            const response = await fetch(url);
            return await response.json();
        }
        catch (_a) { }
        return null;
    };
    exports.fetchDataByCid = fetchDataByCid;
    const getWidgetData = async (dataUri) => {
        return Object.assign({}, scconfig_json_1.default);
        let widgetData;
        try {
            const ipfsBaseUrl = (0, index_2.getIPFSGatewayUrl)();
            const scconfigResponse = await fetch(`${ipfsBaseUrl}${dataUri}/scconfig.json`);
            const scconfigResult = await scconfigResponse.json();
            widgetData = scconfigResult.widgetData;
        }
        catch (err) { }
        return widgetData;
    };
    exports.getWidgetData = getWidgetData;
});
define("@scom/scom-thread/global/index.ts", ["require", "exports", "@scom/scom-thread/global/utils.ts", "@scom/scom-thread/global/API.ts"], function (require, exports, utils_1, API_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-thread/global/index.ts'/> 
    __exportStar(utils_1, exports);
    __exportStar(API_1, exports);
});
define("@scom/scom-thread/commons/analytics/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.analyticStyle = void 0;
    const Theme = components_3.Styles.Theme.ThemeVars;
    exports.analyticStyle = components_3.Styles.style({
        $nest: {
            'i-icon': {
                transition: 'background 0.3s ease-in'
            },
            'i-label': {
                transition: 'color 0.3s ease-in'
            },
            '.analytic:hover': {
                $nest: {
                    'i-icon': {
                        background: Theme.colors.primary.main
                    },
                    'i-label': {
                        color: `${Theme.colors.primary.main}!important`
                    }
                }
            },
            '.green-icon:hover': {
                $nest: {
                    'i-icon': {
                        background: Theme.colors.success.main
                    },
                    'i-label': {
                        color: `${Theme.colors.success.main}!important`
                    }
                }
            },
            '.red-icon:hover': {
                $nest: {
                    'i-icon': {
                        background: Theme.colors.error.main
                    },
                    'i-label': {
                        color: `${Theme.colors.error.main}!important`
                    }
                }
            }
        }
    });
});
define("@scom/scom-thread/commons/analytics/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-thread/global/index.ts", "@scom/scom-thread/commons/analytics/index.css.ts"], function (require, exports, components_4, index_3, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomThreadAnalytics = void 0;
    const Theme = components_4.Styles.Theme.ThemeVars;
    let ScomThreadAnalytics = class ScomThreadAnalytics extends components_4.Module {
        setData(value) {
            this._data = value !== null && value !== void 0 ? value : [];
            this.renderUI();
        }
        getData() {
            var _a;
            return (_a = this._data) !== null && _a !== void 0 ? _a : [];
        }
        renderUI() {
            this.gridAnalysis.clearInnerHTML();
            for (let item of this._data) {
                let itemEl;
                if (item.onRender) {
                    itemEl = item.onRender();
                }
                else {
                    itemEl = (this.$render("i-hstack", { verticalAlignment: "center", gap: '0.5rem', tooltip: { content: item.name || '', placement: 'bottomLeft' }, class: "analytic" },
                        this.$render("i-icon", { name: item.icon, width: 28, height: 28, fill: Theme.text.secondary, border: { radius: '50%' }, padding: { top: 5, bottom: 5, left: 5, right: 5 } }),
                        this.$render("i-label", { caption: (0, index_3.formatNumber)(item.value, 0), font: { color: Theme.text.secondary, size: '0.813rem' } })));
                }
                this.gridAnalysis.appendChild(itemEl);
                if (item.class)
                    itemEl.classList.add(item.class);
                itemEl.onClick = () => {
                    if (item.onClick)
                        item.onClick();
                };
            }
            this.gridAnalysis.appendChild(this.$render("i-hstack", { class: "analytic" },
                this.$render("i-icon", { name: 'share-square', width: 28, height: 28, fill: Theme.text.secondary, border: { radius: '50%' }, padding: { top: 5, bottom: 5, left: 5, right: 5 } })));
        }
        init() {
            super.init();
            const data = this.getAttribute('data', true);
            if (data)
                this.setData(data);
        }
        render() {
            return (this.$render("i-grid-layout", { id: "gridAnalysis", templateColumns: ['repeat(4, 1fr)', 'auto'], gap: { column: '4px' }, padding: { top: '1rem', bottom: '1rem' }, width: '100%', class: index_css_1.analyticStyle }));
        }
    };
    ScomThreadAnalytics = __decorate([
        (0, components_4.customElements)('i-scom-thread-analytics')
    ], ScomThreadAnalytics);
    exports.ScomThreadAnalytics = ScomThreadAnalytics;
});
define("@scom/scom-thread/commons/post/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.customStyles = void 0;
    const Theme = components_5.Styles.Theme.ThemeVars;
    exports.customStyles = components_5.Styles.style({
        cursor: 'pointer',
        $nest: {
            '.has-border:after': {
                content: "''",
                position: 'absolute',
                width: 2,
                height: 'calc(100% - 2.5rem)',
                display: 'block',
                backgroundColor: Theme.action.hover,
                transform: 'translateX(-50%)',
                left: '18px',
                top: '2.5rem'
            },
            '#pnlMore:hover > .more-block': {
                background: Theme.action.hover
            }
        }
    });
});
define("@scom/scom-thread/commons/post/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-thread/commons/post/index.css.ts", "@scom/scom-thread/global/index.ts", "@scom/scom-thread/index.css.ts"], function (require, exports, components_6, index_css_2, index_4, index_css_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomThreadPost = void 0;
    const Theme = components_6.Styles.Theme.ThemeVars;
    const MAX_HEIGHT = 352;
    let ScomThreadPost = class ScomThreadPost extends components_6.Module {
        constructor(parent, options) {
            super(parent, options);
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        get cid() {
            return this._config.cid;
        }
        set cid(value) {
            this._config.cid = value;
        }
        get type() {
            return this._config.type;
        }
        set type(value) {
            this._config.type = value;
        }
        get showAnalytics() {
            var _a;
            return (_a = this._config.showAnalytics) !== null && _a !== void 0 ? _a : true;
        }
        set showAnalytics(value) {
            this._config.showAnalytics = value !== null && value !== void 0 ? value : true;
        }
        set theme(value) {
            if (this.pageViewer)
                this.pageViewer.theme = value;
            if (this.inputReply)
                this.inputReply.theme = value;
        }
        async setData(data) {
            this._config = Object.assign({}, data);
            await this.fetchData();
            await this.renderUI();
        }
        getData() {
            return this._data;
        }
        async fetchData() {
            try {
                this._data = await (0, index_4.fetchDataByCid)(this.cid);
            }
            catch (_a) {
                this._data = null;
            }
        }
        clear() {
            this.imgAvatar.url = "";
            this.lblOwner.caption = "";
            this.lblUsername.caption = "";
            this.lblDate.caption = "";
            this.pageViewer.setData({});
            this.pnlAvatar.classList.remove('has-border');
            this.pnlMore.visible = false;
            this.analyticEl.visible = false;
            this.inputReply.clear();
            this.inputReply.visible = false;
            this.pnlOverlay.visible = false;
            this.btnViewMore.visible = false;
        }
        async renderUI() {
            var _a, _b;
            this.clear();
            const { analytics, owner, publishDate, dataUri, username, avatar } = this._data || {};
            this.analyticEl.setData([
                {
                    value: (analytics === null || analytics === void 0 ? void 0 : analytics.reply) || 0,
                    name: 'Reply',
                    icon: 'comment',
                    onClick: () => {
                        if (this.onReplyClicked)
                            this.onReplyClicked({ cid: this.cid });
                    }
                },
                {
                    value: (analytics === null || analytics === void 0 ? void 0 : analytics.repost) || 0,
                    name: 'Repost',
                    icon: 'retweet',
                    class: 'green-icon'
                },
                {
                    name: 'Vote',
                    onRender: () => {
                        let voteQty = Number((analytics === null || analytics === void 0 ? void 0 : analytics.like) || 0);
                        const lb = this.$render("i-label", { caption: (0, index_4.formatNumber)(voteQty, 0), font: { color: Theme.text.secondary, size: '0.813rem' } });
                        return (this.$render("i-hstack", { verticalAlignment: "center", gap: '0.5rem', tooltip: { content: 'Upvote/downvote', placement: 'bottomLeft' }, class: "analytic" },
                            this.$render("i-icon", { name: 'arrow-up', width: 28, height: 28, fill: Theme.text.secondary, border: { radius: '50%' }, class: "hovered-icon", padding: { top: 5, bottom: 5, left: 5, right: 5 }, onClick: () => {
                                    lb.caption = (0, index_4.formatNumber)(++voteQty, 0);
                                } }),
                            lb,
                            this.$render("i-icon", { name: 'arrow-down', width: 28, height: 28, fill: Theme.text.secondary, border: { radius: '50%' }, class: "hovered-icon", padding: { top: 5, bottom: 5, left: 5, right: 5 }, onClick: () => {
                                    lb.caption = (0, index_4.formatNumber)(--voteQty, 0);
                                } })));
                    },
                    class: 'red-icon'
                },
                {
                    value: (analytics === null || analytics === void 0 ? void 0 : analytics.view) || 0,
                    name: 'View',
                    icon: 'chart-bar'
                }
            ]);
            this.lblOwner.caption = components_6.FormatUtils.truncateWalletAddress(owner);
            this.lblUsername.caption = `@${username}`;
            this.lblUsername.link.href = '';
            this.analyticEl.visible = this.showAnalytics;
            this.lblDate.caption = `. ${(0, index_4.getDuration)(publishDate)}`;
            this.imgAvatar.url = avatar !== null && avatar !== void 0 ? avatar : '';
            if (dataUri) {
                this.pnlLoader.visible = true;
                await this.pageViewer.setData(await (0, index_4.getWidgetData)(dataUri));
                this.pageViewer.style.setProperty('--custom-background-color', 'transparent');
                this.pnlLoader.visible = false;
            }
            if ((_b = (_a = this._data) === null || _a === void 0 ? void 0 : _a.replies) === null || _b === void 0 ? void 0 : _b.length) {
                this.pnlMore.visible = true;
                this.pnlAvatar.classList.add('has-border');
            }
            if (this.type === 'reply') {
                this.pnlAvatar.classList.add('has-border');
                this.pnlMore.visible = false;
                this.inputReply.onSubmit = this.onReplySubmit;
                this.inputReply.setData({ replyTo: `@${username}`, isReplyToShown: true });
                this.inputReply.visible = true;
                this.gridPost.padding = { top: '0px', left: '0px', right: '0px' };
            }
            else {
                this.gridPost.padding = { top: '0.75rem', left: '1rem', right: '1rem' };
            }
            if (this.pnlStatusDetail.scrollHeight > MAX_HEIGHT) {
                this.pnlOverlay.visible = true;
                this.btnViewMore.visible = true;
            }
        }
        onReplySubmit() { }
        onShowMore() {
            this.renderReplies();
        }
        async renderReplies() {
            var _a, _b;
            this.pnlMore.clearInnerHTML();
            if ((_b = (_a = this._data) === null || _a === void 0 ? void 0 : _a.replies) === null || _b === void 0 ? void 0 : _b.length) {
                for (let reply of this._data.replies) {
                    const replyElm = this.$render("i-scom-thread-post", { class: "reply" });
                    replyElm.setData({ cid: reply.cid });
                    this.pnlMore.appendChild(replyElm);
                }
            }
        }
        onViewMore() {
            this.pnlStatusDetail.style.maxHeight = '';
            this.pnlStatusDetail.style.overflow = '';
            this.pnlOverlay.visible = false;
            this.btnViewMore.visible = false;
        }
        async init() {
            super.init();
            this.onReplyClicked = this.getAttribute('onReplyClicked', true) || this.onReplyClicked;
            const cid = this.getAttribute('cid', true);
            const type = this.getAttribute('type', true);
            const showAnalytics = this.getAttribute('showAnalytics', true, true);
            await this.setData({ cid, type, showAnalytics });
            const theme = this.getAttribute('theme', true);
            if (theme)
                this.theme = theme;
        }
        render() {
            return (this.$render("i-vstack", { width: "100%", class: index_css_2.customStyles },
                this.$render("i-grid-layout", { id: "gridPost", templateColumns: ['40px', 'auto'], class: "post-body" },
                    this.$render("i-panel", { id: "pnlAvatar" },
                        this.$render("i-image", { id: "imgAvatar", width: 36, height: 36, display: "block", background: { color: Theme.background.gradient }, border: { radius: '50%' }, overflow: 'hidden', stack: { shrink: '0' }, class: 'avatar' })),
                    this.$render("i-vstack", { width: '100%', gap: "12px" },
                        this.$render("i-hstack", { verticalAlignment: "center", horizontalAlignment: "space-between", gap: "0.5rem", width: "100%" },
                            this.$render("i-hstack", { stack: { basis: '50%' }, gap: '0.5rem', verticalAlignment: "center", wrap: "wrap" },
                                this.$render("i-label", { id: "lblOwner", class: index_css_3.labelStyle, font: { size: '17px', weight: 500 } }),
                                this.$render("i-label", { id: "lblUsername", class: index_css_3.labelStyle, font: { color: Theme.text.secondary } }),
                                this.$render("i-label", { id: "lblDate", font: { size: '0.875rem', color: Theme.text.secondary } })),
                            this.$render("i-hstack", { stack: { basis: '50%' }, verticalAlignment: "center", horizontalAlignment: "end", gap: "0.5rem" },
                                this.$render("i-button", { id: "btnSubcribe", minHeight: 32, padding: { left: '1rem', right: '1rem' }, background: { color: Theme.colors.primary.main }, font: { color: Theme.colors.primary.contrastText }, border: { radius: '30px' }, caption: 'Subcribe', visible: false }),
                                this.$render("i-icon", { name: "ellipsis-h", width: 30, height: 30, fill: Theme.text.primary, border: { radius: '50%' }, padding: { top: 5, bottom: 5, left: 5, right: 5 }, class: "hovered-icon" }))),
                        this.$render("i-panel", { id: "pnlStatusDetail", maxHeight: MAX_HEIGHT, overflow: 'hidden' },
                            this.$render("i-vstack", { id: "pnlLoader", width: "100%", height: "100%", minHeight: 300, horizontalAlignment: "center", verticalAlignment: "center", padding: { top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }, visible: false },
                                this.$render("i-panel", { class: index_css_3.spinnerStyle })),
                            this.$render("i-scom-page-viewer", { id: "pageViewer" }),
                            this.$render("i-panel", { id: "pnlOverlay", visible: false, height: '5rem', width: '100%', position: 'absolute', bottom: "0px", background: { color: `linear-gradient(0, var(--card-bg-color) 0%, transparent 100%)` } })),
                        this.$render("i-hstack", { id: "btnViewMore", verticalAlignment: "center", padding: { top: '1rem' }, gap: '0.5rem', visible: false, onClick: this.onViewMore },
                            this.$render("i-label", { caption: 'Read more', font: { size: '1rem', color: Theme.colors.primary.main } }),
                            this.$render("i-icon", { name: "angle-down", width: 16, height: 16, fill: Theme.colors.primary.main })),
                        this.$render("i-scom-thread-analytics", { id: "analyticEl", visible: false }))),
                this.$render("i-panel", { id: "pnlMore", visible: false },
                    this.$render("i-hstack", { verticalAlignment: "center", gap: "2rem", padding: { top: '1rem', bottom: '1rem', left: '1.5rem', right: '1rem' }, class: "more-block", onClick: this.onShowMore },
                        this.$render("i-icon", { name: "ellipsis-v", width: 20, height: 20, fill: Theme.text.secondary }),
                        this.$render("i-label", { caption: 'Show replies', font: { color: Theme.colors.primary.main, size: '1rem' } }))),
                this.$render("i-scom-thread-reply-input", { id: "inputReply", visible: false })));
        }
    };
    ScomThreadPost = __decorate([
        (0, components_6.customElements)('i-scom-thread-post')
    ], ScomThreadPost);
    exports.ScomThreadPost = ScomThreadPost;
});
define("@scom/scom-thread/commons/status/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.customStyles = void 0;
    const Theme = components_7.Styles.Theme.ThemeVars;
    exports.customStyles = components_7.Styles.style({
        cursor: 'pointer',
        $nest: {
            '.post-body:hover': {
                background: Theme.action.hover
            }
        }
    });
});
define("@scom/scom-thread/commons/status/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-thread/commons/status/index.css.ts", "@scom/scom-thread/index.css.ts", "@scom/scom-thread/global/index.ts"], function (require, exports, components_8, index_css_4, index_css_5, index_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomThreadStatus = void 0;
    const Theme = components_8.Styles.Theme.ThemeVars;
    const MAX_HEIGHT = 352;
    let ScomThreadStatus = class ScomThreadStatus extends components_8.Module {
        constructor(parent, options) {
            super(parent, options);
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        get cid() {
            return this._cid;
        }
        set cid(value) {
            this._cid = value;
        }
        set theme(value) {
            if (this.pageViewer)
                this.pageViewer.theme = value;
            if (this.inputReply)
                this.inputReply.theme = value;
        }
        async setData(cid) {
            this.cid = cid;
            await this.fetchData();
            await this.renderUI();
        }
        getData() {
            return this._data;
        }
        async fetchData() {
            try {
                this._data = await (0, index_5.fetchDataByCid)(this.cid);
            }
            catch (_a) {
                this._data = null;
            }
        }
        clear() {
            this.imgAvatar.url = "";
            this.lblOwner.caption = "";
            this.lblDate.caption = "";
            this.lbViews.caption = "";
            this.lblUsername.caption = "";
            this.pageViewer.setData({});
            this.btnViewMore.visible = false;
            this.pnlOverlay.visible = false;
        }
        async renderUI() {
            this.clear();
            const { analytics, owner, username, publishDate, dataUri, avatar } = this._data || {};
            this.analyticEl.setData([
                {
                    value: (analytics === null || analytics === void 0 ? void 0 : analytics.reply) || 0,
                    name: 'Reply',
                    icon: 'comment',
                    onClick: () => {
                        if (this.onReplyClicked)
                            this.onReplyClicked({ cid: this.cid });
                    }
                },
                {
                    value: (analytics === null || analytics === void 0 ? void 0 : analytics.repost) || 0,
                    name: 'Repost',
                    icon: 'retweet',
                    class: 'green-icon'
                },
                {
                    name: 'Vote',
                    onRender: () => {
                        let voteQty = Number((analytics === null || analytics === void 0 ? void 0 : analytics.like) || 0);
                        const lb = this.$render("i-label", { caption: (0, index_5.formatNumber)(voteQty, 0), font: { color: Theme.text.secondary, size: '0.813rem' } });
                        return (this.$render("i-hstack", { verticalAlignment: "center", gap: '0.5rem', tooltip: { content: 'Upvote/downvote', placement: 'bottomLeft' }, class: "analytic" },
                            this.$render("i-icon", { name: 'arrow-up', width: 28, height: 28, fill: Theme.text.secondary, border: { radius: '50%' }, class: "hovered-icon", padding: { top: 5, bottom: 5, left: 5, right: 5 }, onClick: () => {
                                    lb.caption = (0, index_5.formatNumber)(++voteQty, 0);
                                } }),
                            lb,
                            this.$render("i-icon", { name: 'arrow-down', width: 28, height: 28, fill: Theme.text.secondary, border: { radius: '50%' }, class: "hovered-icon", padding: { top: 5, bottom: 5, left: 5, right: 5 }, onClick: () => {
                                    lb.caption = (0, index_5.formatNumber)(--voteQty, 0);
                                } })));
                    },
                    class: 'red-icon'
                },
                {
                    value: (analytics === null || analytics === void 0 ? void 0 : analytics.bookmark) || 0,
                    name: 'Bookmark',
                    icon: 'bookmark'
                }
            ]);
            this.lblOwner.caption = components_8.FormatUtils.truncateWalletAddress(owner);
            this.lblUsername.caption = `@${username}`;
            this.lblUsername.link.href = '';
            this.lblDate.caption = publishDate ? components_8.FormatUtils.unixToFormattedDate(publishDate) : "";
            this.lbViews.caption = (0, index_5.formatNumber)((analytics === null || analytics === void 0 ? void 0 : analytics.view) || 0, 0);
            this.imgAvatar.url = avatar !== null && avatar !== void 0 ? avatar : '';
            if (dataUri) {
                this.pnlLoader.visible = true;
                await this.pageViewer.setData(await (0, index_5.getWidgetData)(dataUri));
                this.pnlLoader.visible = false;
            }
            if (this.pnlStatusDetail.scrollHeight > MAX_HEIGHT) {
                this.pnlOverlay.visible = true;
                this.btnViewMore.visible = true;
            }
            this.renderPostFrom();
            this.renderReplies();
            this.inputReply.onSubmit = this.onReplySubmit;
            this.inputReply.setData({ replyTo: `@${username}` });
        }
        renderPostFrom() {
            this.pnlPostFrom.clearInnerHTML();
            // TODO: check type to show
            this.pnlPostFrom.visible = true;
            this.pnlPostFrom.appendChild(this.$render("i-hstack", { verticalAlignment: "center", gap: "12px", margin: { bottom: '0.5rem' }, width: "100%" },
                this.$render("i-hstack", { stack: { basis: '40px', shrink: '0' }, horizontalAlignment: "end" },
                    this.$render("i-icon", { name: "retweet", width: 14, height: 14, fill: Theme.text.primary })),
                this.$render("i-label", { font: { size: '0.813rem', weight: 600 }, caption: `${this.lblOwner.caption} reposted`, link: { href: '#' } })));
        }
        async renderReplies() {
            var _a, _b;
            this.pnlStatusReplies.clearInnerHTML();
            if ((_b = (_a = this._data) === null || _a === void 0 ? void 0 : _a.replies) === null || _b === void 0 ? void 0 : _b.length) {
                const length = this._data.replies.length;
                for (let i = 0; i < length; i++) {
                    const reply = this._data.replies[i];
                    const replyElm = (this.$render("i-scom-thread-post", { border: { bottom: { width: '1px', style: i !== length - 1 ? 'solid' : 'none', color: Theme.action.hover } } }));
                    replyElm.onReplyClicked = this.onReplyClicked;
                    replyElm.setData({ cid: reply.cid });
                    this.pnlStatusReplies.appendChild(replyElm);
                }
            }
        }
        onViewMore() {
            this.pnlStatusDetail.style.maxHeight = '';
            this.pnlStatusDetail.style.overflow = '';
            this.pnlOverlay.visible = false;
            this.btnViewMore.visible = false;
        }
        onReplySubmit() { }
        init() {
            super.init();
            this.onReplyClicked = this.getAttribute('onReplyClicked', true) || this.onReplyClicked;
            const cid = this.getAttribute('cid', true);
            if (cid)
                this.setData(cid);
            const theme = this.getAttribute('theme', true);
            if (theme)
                this.theme = theme;
        }
        render() {
            return (this.$render("i-vstack", { width: "100%", class: index_css_4.customStyles },
                this.$render("i-panel", { padding: { left: '1rem', right: '1rem' } },
                    this.$render("i-panel", { id: "pnlPostFrom", visible: false }),
                    this.$render("i-hstack", { verticalAlignment: "center", gap: "12px", stack: { grow: '1' }, width: "100%" },
                        this.$render("i-panel", { stack: { basis: '40px', shrink: '0' } },
                            this.$render("i-image", { id: "imgAvatar", width: 36, height: 36, display: "block", background: { color: Theme.background.gradient }, border: { radius: '50%' }, overflow: 'hidden', stack: { shrink: '0' }, class: 'avatar' })),
                        this.$render("i-hstack", { verticalAlignment: "center", horizontalAlignment: "space-between", gap: "0.5rem", width: "100%" },
                            this.$render("i-hstack", { stack: { basis: '50%' }, gap: '0.5rem', verticalAlignment: "center" },
                                this.$render("i-label", { id: "lblOwner", class: index_css_5.labelStyle, font: { size: '1rem', weight: 700 } }),
                                this.$render("i-label", { id: "lblUsername", class: index_css_5.labelStyle, font: { size: '1rem', color: Theme.text.secondary } })),
                            this.$render("i-hstack", { stack: { basis: '50%' }, verticalAlignment: "center", horizontalAlignment: "end", gap: "0.5rem" },
                                this.$render("i-button", { id: "btnSubcribe", minHeight: 32, padding: { left: '1rem', right: '1rem' }, background: { color: Theme.colors.primary.main }, font: { color: Theme.colors.primary.contrastText }, border: { radius: '30px' }, caption: 'Subcribe' }),
                                this.$render("i-icon", { name: "ellipsis-h", width: 30, height: 30, fill: Theme.text.primary, border: { radius: '50%' }, padding: { top: 5, bottom: 5, left: 5, right: 5 }, class: "hovered-icon" })))),
                    this.$render("i-panel", { id: "pnlStatusDetail", maxHeight: MAX_HEIGHT, overflow: 'hidden' },
                        this.$render("i-vstack", { id: "pnlLoader", width: "100%", height: "100%", minHeight: 300, horizontalAlignment: "center", verticalAlignment: "center", padding: { top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }, visible: false },
                            this.$render("i-panel", { class: index_css_5.spinnerStyle })),
                        this.$render("i-scom-page-viewer", { id: "pageViewer" }),
                        this.$render("i-panel", { id: "pnlOverlay", visible: false, height: '5rem', width: '100%', position: 'absolute', bottom: "0px", background: { color: `linear-gradient(0, var(--card-bg-color) 0%, transparent 100%)` } })),
                    this.$render("i-hstack", { id: "btnViewMore", verticalAlignment: "center", padding: { top: '1rem' }, gap: '0.5rem', visible: false, onClick: this.onViewMore },
                        this.$render("i-label", { caption: 'Read more', font: { size: '1rem', color: Theme.colors.primary.main } }),
                        this.$render("i-icon", { name: "angle-down", width: 16, height: 16, fill: Theme.colors.primary.main })),
                    this.$render("i-hstack", { verticalAlignment: "center", gap: "4px", padding: { top: '1rem', bottom: '1rem' } },
                        this.$render("i-label", { id: "lblDate", font: { size: '1rem', color: Theme.text.secondary } }),
                        this.$render("i-label", { id: "lbViews", caption: '0', font: { size: '1rem', weight: 700 } }),
                        this.$render("i-label", { caption: "Views", font: { size: '1rem', color: Theme.text.secondary } })),
                    this.$render("i-scom-thread-analytics", { id: "analyticEl", display: 'block', border: { top: { width: '1px', style: 'solid', color: Theme.action.hover }, bottom: { width: '1px', style: 'solid', color: Theme.action.hover } } }),
                    this.$render("i-scom-thread-reply-input", { id: "inputReply" })),
                this.$render("i-vstack", { id: "pnlStatusReplies", border: { top: { width: '1px', style: 'solid', color: Theme.action.hover } } })));
        }
    };
    ScomThreadStatus = __decorate([
        (0, components_8.customElements)('i-scom-thread-status')
    ], ScomThreadStatus);
    exports.ScomThreadStatus = ScomThreadStatus;
});
define("@scom/scom-thread/commons/replyInput/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.editorStyle = void 0;
    const Theme = components_9.Styles.Theme.ThemeVars;
    exports.editorStyle = components_9.Styles.style({
        cursor: 'text',
        $nest: {
            '.toastui-editor-ww-container > .toastui-editor': {
                minHeight: '0px !important'
            },
            '.toastui-editor-toolbar': {
                display: 'none'
            },
            '.toastui-editor-contents': {
                fontSize: '1.25rem',
                color: `${Theme.text.secondary} !important`,
                padding: '0 0 12px !important'
            },
            '.toastui-editor-contents p': {
                color: `${Theme.text.secondary} !important`,
            },
            '.toastui-editor-defaultUI': {
                border: 'none'
            },
            '.toastui-editor-ww-container': {
                background: 'transparent !important'
            }
        }
    });
});
define("@scom/scom-thread/commons/replyInput/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-thread/commons/replyInput/index.css.ts"], function (require, exports, components_10, index_css_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomThreadReplyInput = void 0;
    const Theme = components_10.Styles.Theme.ThemeVars;
    let ScomThreadReplyInput = class ScomThreadReplyInput extends components_10.Module {
        get replyTo() {
            var _a;
            return (_a = this._data.replyTo) !== null && _a !== void 0 ? _a : '';
        }
        set replyTo(value) {
            this._data.replyTo = value !== null && value !== void 0 ? value : '';
        }
        get avatar() {
            var _a;
            return (_a = this._data.avatar) !== null && _a !== void 0 ? _a : '';
        }
        set avatar(value) {
            this._data.avatar = value !== null && value !== void 0 ? value : '';
        }
        get isReplyToShown() {
            var _a;
            return (_a = this._data.isReplyToShown) !== null && _a !== void 0 ? _a : false;
        }
        set isReplyToShown(value) {
            this._data.isReplyToShown = value !== null && value !== void 0 ? value : false;
        }
        set theme(value) {
            if (this.replyEditor)
                this.replyEditor.theme = value;
        }
        setData(value) {
            this._data = value;
            this.lbReplyTo.caption = `${this.replyTo}`;
            this.pnlReplyTo.visible = this.isReplyToShown;
            if (this.avatar)
                this.imgReplier.url = this.avatar;
            this.updateGrid();
        }
        clear() {
            this.pnlReplyTo.visible = false;
            this.lbReplyTo.caption = '';
            this.imgReplier.url = '';
        }
        updateGrid() {
            if (this.isReplyToShown) {
                this.gridReply.templateColumns = ['40px', 'auto'];
                this.gridReply.templateRows = ['minmax(auto, 1fr)', '36px'];
                this.gridReply.templateAreas = [
                    ['avatar', 'editor'],
                    ['avatar', 'reply']
                ];
            }
            else {
                this.gridReply.templateAreas = [['avatar', 'editor', 'reply']];
                this.gridReply.templateColumns = ['40px', 'auto', '80px'];
                this.gridReply.templateRows = ['auto'];
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
                this.onSubmit(this.replyEditor);
        }
        _handleClick(event, stopPropagation) {
            this.isReplyToShown = true;
            this.updateGrid();
            return true;
        }
        init() {
            super.init();
            this.onChanged = this.getAttribute('onChanged', true) || this.onChanged;
            this.onSubmit = this.getAttribute('onSubmit', true) || this.onSubmit;
            const replyTo = this.getAttribute('replyTo', true, '');
            const avatar = this.getAttribute('avatar', true, '');
            const isReplyToShown = this.getAttribute('isReplyToShown', true, false);
            this.setData({ isReplyToShown, replyTo, avatar });
            const theme = this.getAttribute('theme', true);
            if (theme)
                this.theme = theme;
        }
        render() {
            return (this.$render("i-panel", { padding: { bottom: 12, top: 12 } },
                this.$render("i-hstack", { id: "pnlReplyTo", visible: false, gap: "0.5rem", verticalAlignment: "center", padding: { top: 4, bottom: 12, left: 52 } },
                    this.$render("i-label", { caption: 'Replying to', font: { size: '1rem' } }),
                    this.$render("i-label", { id: "lbReplyTo", link: { href: '' }, font: { size: '1rem' } })),
                this.$render("i-grid-layout", { id: "gridReply", gap: { column: 12 } },
                    this.$render("i-image", { id: "imgReplier", grid: { area: 'avatar' }, width: 36, height: 36, display: "block", background: { color: Theme.background.gradient }, border: { radius: '50%' }, overflow: 'hidden', stack: { shrink: '0' }, class: 'avatar' }),
                    this.$render("i-markdown-editor", { id: "replyEditor", width: "100%", placeholder: "Post your reply", viewer: false, hideModeSwitch: true, mode: 'wysiwyg', toolbarItems: [], font: { size: '1.25rem', color: Theme.text.secondary }, background: { color: 'transparent' }, height: "auto", theme: 'dark', onChanged: this.onEditorChanged, class: index_css_6.editorStyle, grid: { area: 'editor' } }),
                    this.$render("i-hstack", { horizontalAlignment: "end", grid: { area: 'reply' } },
                        this.$render("i-button", { id: "btnReply", minHeight: 36, padding: { left: '1rem', right: '1rem' }, background: { color: Theme.colors.primary.main }, font: { color: Theme.colors.primary.contrastText, bold: true }, border: { radius: '30px' }, enabled: false, caption: 'Reply', onClick: this.onReply })))));
        }
    };
    ScomThreadReplyInput = __decorate([
        (0, components_10.customElements)('i-scom-thread-reply-input')
    ], ScomThreadReplyInput);
    exports.ScomThreadReplyInput = ScomThreadReplyInput;
});
define("@scom/scom-thread/commons/index.ts", ["require", "exports", "@scom/scom-thread/commons/analytics/index.tsx", "@scom/scom-thread/commons/post/index.tsx", "@scom/scom-thread/commons/status/index.tsx", "@scom/scom-thread/commons/replyInput/index.tsx"], function (require, exports, index_6, index_7, index_8, index_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomThreadReplyInput = exports.ScomThreadStatus = exports.ScomThreadPost = exports.ScomThreadAnalytics = void 0;
    Object.defineProperty(exports, "ScomThreadAnalytics", { enumerable: true, get: function () { return index_6.ScomThreadAnalytics; } });
    Object.defineProperty(exports, "ScomThreadPost", { enumerable: true, get: function () { return index_7.ScomThreadPost; } });
    Object.defineProperty(exports, "ScomThreadStatus", { enumerable: true, get: function () { return index_8.ScomThreadStatus; } });
    Object.defineProperty(exports, "ScomThreadReplyInput", { enumerable: true, get: function () { return index_9.ScomThreadReplyInput; } });
});
define("@scom/scom-thread", ["require", "exports", "@ijstech/components", "@scom/scom-thread/index.css.ts", "@scom/scom-thread/data.json.ts", "@scom/scom-thread/store/index.ts"], function (require, exports, components_11, index_css_7, data_json_2, index_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_11.Styles.Theme.ThemeVars;
    let ScomThread = class ScomThread extends components_11.Module {
        ;
        constructor(parent, options) {
            super(parent, options);
            if (data_json_2.default)
                (0, index_10.setDataFromJson)(data_json_2.default);
            this.onShowReplyMd = this.onShowReplyMd.bind(this);
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        get cid() {
            return this._data.cid;
        }
        set cid(value) {
            this._data.cid = value;
        }
        set theme(value) {
            if (this.mdPost)
                this.mdPost.theme = value;
            if (this.mainStatus)
                this.mainStatus.theme = value;
        }
        async setData(value) {
            this._data = value;
            await this.renderUI();
        }
        getData() {
            return this._data;
        }
        clear() {
            this.mainStatus.clear();
            this.mdPost.clear();
        }
        async renderUI() {
            this.mdPost.onReplyClicked = this.onShowReplyMd;
            this.mainStatus.onReplyClicked = this.onShowReplyMd;
            await this.mainStatus.setData(this.cid);
        }
        onClosedReplyMd() {
            this.mdReply.visible = false;
        }
        async onShowReplyMd(data) {
            await this.mdPost.setData({ cid: data.cid, showAnalytics: false, type: 'reply' });
            this.mdReply.refresh();
            this.mdReply.visible = true;
        }
        initEvents() { }
        init() {
            super.init();
            const cid = this.getAttribute('cid', true);
            if (cid)
                this.setData({ cid });
            this.initEvents();
            const theme = this.getAttribute('theme', true);
            const themeVar = theme || document.body.style.getPropertyValue('--theme');
            if (themeVar)
                this.theme = themeVar;
            this.style.setProperty('--card-bg-color', `color-mix(in srgb, ${Theme.background.paper}, #fff 3%)`);
        }
        render() {
            return (this.$render("i-vstack", { width: "100%", maxWidth: 600, margin: { left: 'auto', right: 'auto' }, class: index_css_7.customStyles },
                this.$render("i-panel", { padding: { left: '1rem', right: '1rem' } },
                    this.$render("i-scom-thread-status", { id: "mainStatus" })),
                this.$render("i-modal", { id: "mdReply", maxWidth: 600, class: index_css_7.modalStyle },
                    this.$render("i-vstack", { gap: "1rem" },
                        this.$render("i-hstack", { verticalAlignment: "center", minHeight: 53 },
                            this.$render("i-icon", { name: "times", width: 20, height: 20, onClick: this.onClosedReplyMd }),
                            this.$render("i-button", { caption: 'Drafts', padding: { top: '0.5rem', bottom: '0.5rem', left: '1rem', right: '1rem' }, background: { color: 'transparent' }, visible: false })),
                        this.$render("i-scom-thread-post", { id: "mdPost" })))));
        }
    };
    ScomThread = __decorate([
        (0, components_11.customElements)('i-scom-thread')
    ], ScomThread);
    exports.default = ScomThread;
});
