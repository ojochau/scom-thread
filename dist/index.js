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
    exports.editorStyle = exports.modalStyle = exports.customStyles = exports.gridLayoutStyle = exports.overlayStyle = exports.multiLineTextStyle = exports.imageStyle = exports.cardStyle = exports.labelStyle = exports.avatarStyle = exports.spinnerStyle = void 0;
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
    exports.avatarStyle = components_1.Styles.style({
        background: Theme.background.gradient,
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        $nest: {
            'img': {
                objectFit: 'cover'
            }
        }
    });
    exports.labelStyle = components_1.Styles.style({
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    });
    exports.cardStyle = components_1.Styles.style({
        cursor: 'pointer',
        $nest: {
            '&:hover': {
                boxShadow: `0 0 0 2px hsla(0, 0%, var(--card-color-l), var(--card-color-a))`,
            },
            '&:hover i-image.banner': {
                transform: 'translateY(-50%) scale(1.04)'
            },
            'i-link > a': {
                textDecoration: 'none'
            },
            '.--description': {
                whiteSpace: 'pre-line'
            },
            '.icon-button': {
                gap: 0
            },
        }
    });
    exports.imageStyle = components_1.Styles.style({
        width: '100%',
        height: '0px',
        overflow: 'hidden',
        paddingTop: '50%',
        borderBottom: '1px solid hsla(0, 0%, var(--card-color-l), 0.03)',
        $nest: {
            'i-image': {
                position: 'absolute',
                display: 'block',
                top: '50%',
                width: '100%',
                height: 'auto',
                left: '0',
                transform: 'translateY(-50%)',
                transition: 'transform .4s ease',
                $nest: {
                    '&>img': {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }
                }
            }
        }
    });
    exports.multiLineTextStyle = components_1.Styles.style({
        display: '-webkit-box',
        '-webkit-line-clamp': 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
    });
    exports.overlayStyle = components_1.Styles.style({
        height: '5rem',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        background: `linear-gradient(0, var(--card-bg-color) 0%, transparent 100%)`,
    });
    exports.gridLayoutStyle = components_1.Styles.style({
        gridAutoRows: '440px',
        justifyContent: 'center'
    });
    exports.customStyles = components_1.Styles.style({
        cursor: 'pointer',
        $nest: {
            '.more-icon': {
                borderRadius: '50%',
                padding: 5,
                transition: 'background 0.3s ease-in'
            },
            '.more-icon:hover': {
                background: Theme.action.hover
            },
            '#mdPost .post-body': {
                padding: '0 !important'
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
    exports.editorStyle = components_1.Styles.style({
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
                padding: '0 0.5rem'
            },
            '.toastui-editor-defaultUI': {
                border: 'none'
            },
            '.toastui-editor-ww-container': {
                background: 'transparent'
            }
        }
    });
});
define("@scom/scom-thread/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                "id": "b60d05eb-ba68-4a75-83a3-da48e1e80790",
                "row": 0,
                "elements": [
                    {
                        "id": "429d0dac-fb6b-4a56-b1ca-dbf2a8d1574a",
                        "column": 1,
                        "columnSpan": 12,
                        "properties": {
                            "content": "We are thrilled to announce that the OpenSwap Bridge has officially launched its pilot phase!"
                        },
                        "module": {
                            "name": "Text box",
                            "path": "scom-markdown-editor",
                            "category": "widgets",
                            "imgUrl": "https://ipfs.scom.dev/ipfs/bafybeiaabddf67ht6nohe37bvg75ifgvrqeti4iuipuoxhpuvrfg3f4tdi/composables/textbox.png"
                        }
                    }
                ],
            },
            {
                "id": "04640bab-9a04-4ec7-b566-fc1930385562",
                "row": 1,
                "elements": [
                    {
                        "id": "b7d5122c-10a8-4492-b23e-d4967b2fb6f5",
                        "column": 1,
                        "columnSpan": 6,
                        "properties": {
                            "showHeader": false,
                            "showFooter": false,
                            "url": "https://miro.medium.com/v2/resize:fit:720/format:webp/1*bvMYR5ACNydZ4P1PP3kYaw.png",
                            "photoId": ""
                        },
                        "module": {
                            "name": "Image",
                            "path": "scom-image",
                            "category": "widgets",
                            "disableClicked": true,
                            "imgUrl": "https://ipfs.scom.dev/ipfs/bafybeiaabddf67ht6nohe37bvg75ifgvrqeti4iuipuoxhpuvrfg3f4tdi/composables/image.png"
                        }
                    }
                ]
            }
        ],
        "config": {
            "backgroundColor": "#0c1134",
            "margin": {
                "x": "auto",
                "y": "0"
            },
            "sectionWidth": 1024,
            "textColor": "#ffffffff",
            "customBackgroundColor": true,
            "customTextColor": true,
            "customTextSize": false
        }
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
define("@scom/scom-thread/global/const.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EVENTS = void 0;
    ///<amd-module name='@scom/scom-thread/global/const.ts'/> 
    exports.EVENTS = {
        'SHOW_REPLY_MODAL': 'SHOW_REPLY_MODAL'
    };
});
define("@scom/scom-thread/global/index.ts", ["require", "exports", "@scom/scom-thread/global/utils.ts", "@scom/scom-thread/global/API.ts", "@scom/scom-thread/global/const.ts"], function (require, exports, utils_1, API_1, const_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-thread/global/index.ts'/> 
    __exportStar(utils_1, exports);
    __exportStar(API_1, exports);
    __exportStar(const_1, exports);
});
define("@scom/scom-thread/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-thread/data.json.ts'/> 
    exports.default = {
        "ipfsGatewayUrl": "https://ipfs.scom.dev/ipfs/"
    };
});
define("@scom/scom-thread/commons/analytic/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.analyticStyle = void 0;
    const Theme = components_3.Styles.Theme.ThemeVars;
    exports.analyticStyle = components_3.Styles.style({
        $nest: {
            'i-icon': {
                borderRadius: '50%',
                padding: 5,
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
define("@scom/scom-thread/commons/analytic/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-thread/global/index.ts", "@scom/scom-thread/commons/analytic/index.css.ts"], function (require, exports, components_4, index_3, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomAnalytics = void 0;
    const Theme = components_4.Styles.Theme.ThemeVars;
    let ScomAnalytics = class ScomAnalytics extends components_4.Module {
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
                const itemEl = (this.$render("i-hstack", { verticalAlignment: "center", gap: '0.5rem', tooltip: { content: item.name || '', placement: 'bottomLeft' }, class: "analytic" },
                    this.$render("i-icon", { name: item.icon, width: 28, height: 28, fill: Theme.text.secondary }),
                    this.$render("i-label", { caption: (0, index_3.formatNumber)(item.value, 0), font: { color: Theme.text.secondary, size: '0.813rem' } })));
                this.gridAnalysis.appendChild(itemEl);
                if (item.class)
                    itemEl.classList.add(item.class);
                itemEl.onClick = () => {
                    if (item.onClick)
                        item.onClick();
                };
            }
            this.gridAnalysis.appendChild(this.$render("i-hstack", { class: "analytic" },
                this.$render("i-icon", { name: "share-square", width: 28, height: 28, fill: Theme.text.secondary })));
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
    ScomAnalytics = __decorate([
        (0, components_4.customElements)('i-scom-analytics')
    ], ScomAnalytics);
    exports.ScomAnalytics = ScomAnalytics;
});
define("@scom/scom-thread/commons/post/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.customStyles = exports.labelStyle = exports.avatarStyle = exports.spinnerStyle = void 0;
    const Theme = components_5.Styles.Theme.ThemeVars;
    const spin = components_5.Styles.keyframes({
        "to": {
            "-webkit-transform": "rotate(360deg)"
        }
    });
    exports.spinnerStyle = components_5.Styles.style({
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
    exports.avatarStyle = components_5.Styles.style({
        background: Theme.background.gradient,
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        $nest: {
            'img': {
                objectFit: 'cover'
            }
        }
    });
    exports.labelStyle = components_5.Styles.style({
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    });
    exports.customStyles = components_5.Styles.style({
        cursor: 'pointer',
        $nest: {
            '.more-icon': {
                borderRadius: '50%',
                padding: 5,
                transition: 'background 0.3s ease-in'
            },
            '.more-icon:hover': {
                background: Theme.action.hover
            },
            '.has-border:after': {
                content: "''",
                position: 'absolute',
                width: 2,
                height: 'calc(100% - 2.5rem)',
                display: 'block',
                backgroundColor: Theme.divider,
                opacity: 0.5,
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
define("@scom/scom-thread/commons/post/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-thread/commons/post/index.css.ts", "@scom/scom-thread/global/index.ts"], function (require, exports, components_6, index_css_2, index_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomPost = void 0;
    const Theme = components_6.Styles.Theme.ThemeVars;
    let ScomPost = class ScomPost extends components_6.Module {
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
            this.pnlReplyTo.visible = false;
        }
        async renderUI() {
            var _a, _b;
            this.clear();
            const { analytics } = this._data || {};
            this.analyticEl.setData([
                {
                    value: (analytics === null || analytics === void 0 ? void 0 : analytics.reply) || 0,
                    name: 'Reply',
                    icon: 'comment',
                    onClick: () => {
                        components_6.application.EventBus.dispatch(index_4.EVENTS.SHOW_REPLY_MODAL, { cid: this.cid });
                    }
                },
                {
                    value: (analytics === null || analytics === void 0 ? void 0 : analytics.repost) || 0,
                    name: 'Repost',
                    icon: 'retweet',
                    class: 'green-icon'
                },
                {
                    value: (analytics === null || analytics === void 0 ? void 0 : analytics.like) || 0,
                    name: 'Like',
                    icon: 'heart',
                    class: 'red-icon'
                },
                {
                    value: (analytics === null || analytics === void 0 ? void 0 : analytics.view) || 0,
                    name: 'View',
                    icon: 'chart-bar'
                }
            ]);
            this.lblOwner.caption = components_6.FormatUtils.truncateWalletAddress(this._data.owner);
            this.lblUsername.caption = `@${this._data.username}`;
            this.lblUsername.link.href = '';
            this.analyticEl.visible = this.showAnalytics;
            this.lblDate.caption = `. ${(0, index_4.getDuration)(this._data.publishDate)}`;
            if (this._data.dataUri) {
                this.pnlLoader.visible = true;
                await this.pageViewer.setData(await (0, index_4.getWidgetData)(this._data.dataUri));
                this.pnlLoader.visible = false;
            }
            if ((_b = (_a = this._data) === null || _a === void 0 ? void 0 : _a.replies) === null || _b === void 0 ? void 0 : _b.length) {
                this.pnlMore.visible = true;
                this.pnlAvatar.classList.add('has-border');
            }
            if (this.type === 'reply') {
                this.pnlAvatar.classList.add('has-border');
                this.pnlMore.visible = false;
                this.renderReplyTo();
            }
        }
        onShowMore() {
            this.renderReplies();
        }
        async renderReplies() {
            var _a, _b;
            this.pnlMore.clearInnerHTML();
            if ((_b = (_a = this._data) === null || _a === void 0 ? void 0 : _a.replies) === null || _b === void 0 ? void 0 : _b.length) {
                for (let reply of this._data.replies) {
                    const replyElm = this.$render("i-scom-post", { class: "reply" });
                    replyElm.setData({ cid: reply.cid });
                    this.pnlMore.appendChild(replyElm);
                }
            }
        }
        renderReplyTo() {
            this.pnlReplyTo.clearInnerHTML();
            this.pnlReplyTo.appendChild(this.$render("i-hstack", { gap: '0.5rem' },
                this.$render("i-label", { caption: `Replying to` }),
                this.$render("i-label", { caption: `Replying to @shaktibharatia and @TheEconomist`, link: { href: '' } })));
        }
        async init() {
            super.init();
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
                this.$render("i-grid-layout", { templateColumns: ['40px', 'auto'], gap: { column: 12 }, padding: { top: '1rem', left: '1rem', bottom: '0', right: '1rem' }, class: "post-body" },
                    this.$render("i-panel", { id: "pnlAvatar" },
                        this.$render("i-image", { id: "imgAvatar", class: index_css_2.avatarStyle, width: 36, height: 36, display: "block" })),
                    this.$render("i-vstack", { width: '100%', gap: "12px" },
                        this.$render("i-hstack", { verticalAlignment: "center", horizontalAlignment: "space-between", gap: "0.5rem", width: "100%" },
                            this.$render("i-hstack", { stack: { basis: '50%' }, gap: '0.5rem', verticalAlignment: "center", wrap: "wrap" },
                                this.$render("i-label", { id: "lblOwner", class: index_css_2.labelStyle, font: { size: '17px', weight: 500 } }),
                                this.$render("i-label", { id: "lblUsername", class: index_css_2.labelStyle, font: { color: Theme.text.secondary } }),
                                this.$render("i-label", { id: "lblDate", font: { size: '0.875rem', color: Theme.text.secondary } })),
                            this.$render("i-hstack", { stack: { basis: '50%' }, verticalAlignment: "center", horizontalAlignment: "end", gap: "0.5rem" },
                                this.$render("i-button", { id: "btnSubcribe", minHeight: 32, padding: { left: '1rem', right: '1rem' }, background: { color: Theme.colors.primary.main }, font: { color: Theme.colors.primary.contrastText }, border: { radius: '30px' }, caption: 'Subcribe', visible: false }),
                                this.$render("i-icon", { name: "ellipsis-h", width: 30, height: 30, fill: Theme.text.primary, class: "more-icon" }))),
                        this.$render("i-panel", null,
                            this.$render("i-vstack", { id: "pnlLoader", width: "100%", height: "100%", minHeight: 300, horizontalAlignment: "center", verticalAlignment: "center", padding: { top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }, visible: false },
                                this.$render("i-panel", { class: index_css_2.spinnerStyle })),
                            this.$render("i-scom-page-viewer", { id: "pageViewer" })),
                        this.$render("i-panel", { id: "pnlReplyTo", visible: false }),
                        this.$render("i-scom-analytics", { id: "analyticEl", visible: false }))),
                this.$render("i-panel", { id: "pnlMore", visible: false },
                    this.$render("i-hstack", { verticalAlignment: "center", gap: "2rem", padding: { top: '1rem', bottom: '1rem', left: '1.5rem', right: '1rem' }, class: "more-block", onClick: this.onShowMore },
                        this.$render("i-icon", { name: "ellipsis-v", width: 20, height: 20, fill: Theme.text.secondary }),
                        this.$render("i-label", { caption: 'Show replies', font: { color: Theme.colors.primary.main } })))));
        }
    };
    ScomPost = __decorate([
        (0, components_6.customElements)('i-scom-post')
    ], ScomPost);
    exports.ScomPost = ScomPost;
});
define("@scom/scom-thread/commons/status/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.editorStyle = exports.customStyles = exports.labelStyle = exports.avatarStyle = exports.spinnerStyle = void 0;
    const Theme = components_7.Styles.Theme.ThemeVars;
    const spin = components_7.Styles.keyframes({
        "to": {
            "-webkit-transform": "rotate(360deg)"
        }
    });
    exports.spinnerStyle = components_7.Styles.style({
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
    exports.avatarStyle = components_7.Styles.style({
        background: Theme.background.gradient,
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        $nest: {
            'img': {
                objectFit: 'cover'
            }
        }
    });
    exports.labelStyle = components_7.Styles.style({
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    });
    exports.customStyles = components_7.Styles.style({
        cursor: 'pointer',
        $nest: {
            '.more-icon': {
                borderRadius: '50%',
                padding: 5,
                transition: 'background 0.3s ease-in'
            },
            '.more-icon:hover': {
                background: Theme.action.hover
            },
            '.post-body:hover': {
                background: Theme.action.hover
            }
        }
    });
    exports.editorStyle = components_7.Styles.style({
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
                padding: '0 0.5rem'
            },
            '.toastui-editor-defaultUI': {
                border: 'none'
            },
            '.toastui-editor-ww-container': {
                background: 'transparent'
            }
        }
    });
});
define("@scom/scom-thread/commons/status/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-thread/commons/status/index.css.ts", "@scom/scom-thread/global/index.ts"], function (require, exports, components_8, index_css_3, index_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomStatus = void 0;
    const Theme = components_8.Styles.Theme.ThemeVars;
    let ScomStatus = class ScomStatus extends components_8.Module {
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
            if (this.replyEditor)
                this.replyEditor.theme = value;
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
        }
        async renderUI() {
            this.clear();
            const { analytics, owner, username, publishDate, dataUri } = this._data || {};
            this.analyticEl.setData([
                {
                    value: (analytics === null || analytics === void 0 ? void 0 : analytics.reply) || 0,
                    name: 'Reply',
                    icon: 'comment',
                    onClick: () => {
                        components_8.application.EventBus.dispatch(index_5.EVENTS.SHOW_REPLY_MODAL, { cid: this.cid });
                    }
                },
                {
                    value: (analytics === null || analytics === void 0 ? void 0 : analytics.repost) || 0,
                    name: 'Repost',
                    icon: 'retweet',
                    class: 'green-icon'
                },
                {
                    value: (analytics === null || analytics === void 0 ? void 0 : analytics.like) || 0,
                    name: 'Like',
                    icon: 'heart',
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
            if (dataUri) {
                this.pnlLoader.visible = true;
                // TODO: update later
                // await this.pageViewer.setData({ cid: this._data.dataUri + "/scconfig.json" } as any);
                await this.pageViewer.setData(await (0, index_5.getWidgetData)(dataUri));
                this.pnlLoader.visible = false;
            }
            this.renderPostFrom();
            this.renderReplies();
        }
        renderPostFrom() {
            this.pnlPostFrom.clearInnerHTML();
            // TODO: check type to show
            this.pnlPostFrom.visible = true;
            this.pnlPostFrom.appendChild(this.$render("i-hstack", { verticalAlignment: "center", gap: "12px", margin: { bottom: '0.5rem' }, width: "100%" },
                this.$render("i-hstack", { stack: { basis: '40px', shrink: '0' }, horizontalAlignment: "end" },
                    this.$render("i-icon", { name: "retweet", width: 14, height: 14, fill: Theme.text.primary })),
                this.$render("i-label", { font: { size: '0.813rem', weight: 500 }, caption: `${this.lblOwner.caption} reposted`, link: { href: '#' } })));
        }
        async renderReplies() {
            var _a, _b;
            this.pnlStatusReplies.clearInnerHTML();
            if ((_b = (_a = this._data) === null || _a === void 0 ? void 0 : _a.replies) === null || _b === void 0 ? void 0 : _b.length) {
                for (let reply of this._data.replies) {
                    const replyElm = this.$render("i-scom-post", { class: "reply" });
                    replyElm.setData({ cid: reply.cid });
                    this.pnlStatusReplies.appendChild(replyElm);
                }
            }
        }
        init() {
            super.init();
            const cid = this.getAttribute('cid', true);
            if (cid)
                this.setData(cid);
            const theme = this.getAttribute('theme', true);
            if (theme)
                this.theme = theme;
        }
        render() {
            return (this.$render("i-vstack", { width: "100%", class: index_css_3.customStyles },
                this.$render("i-panel", { padding: { left: '1rem', right: '1rem' } },
                    this.$render("i-panel", { id: "pnlPostFrom", visible: false }),
                    this.$render("i-hstack", { verticalAlignment: "center", gap: "12px", stack: { grow: '1' }, width: "100%" },
                        this.$render("i-panel", { stack: { basis: '40px', shrink: '0' } },
                            this.$render("i-image", { id: "imgAvatar", class: index_css_3.avatarStyle, width: 36, height: 36, display: "block" })),
                        this.$render("i-hstack", { verticalAlignment: "center", horizontalAlignment: "space-between", gap: "0.5rem", width: "100%" },
                            this.$render("i-hstack", { stack: { basis: '50%' }, gap: '0.5rem', verticalAlignment: "center" },
                                this.$render("i-label", { id: "lblOwner", class: index_css_3.labelStyle, font: { size: '17px', weight: 500 } }),
                                this.$render("i-label", { id: "lblUsername", class: index_css_3.labelStyle, font: { color: Theme.text.secondary } })),
                            this.$render("i-hstack", { stack: { basis: '50%' }, verticalAlignment: "center", horizontalAlignment: "end", gap: "0.5rem" },
                                this.$render("i-button", { id: "btnSubcribe", minHeight: 32, padding: { left: '1rem', right: '1rem' }, background: { color: Theme.colors.primary.main }, font: { color: Theme.colors.primary.contrastText }, border: { radius: '30px' }, caption: 'Subcribe' }),
                                this.$render("i-icon", { name: "ellipsis-h", width: 30, height: 30, fill: Theme.text.primary, class: "more-icon" })))),
                    this.$render("i-panel", { margin: { top: '12px' } },
                        this.$render("i-vstack", { id: "pnlLoader", width: "100%", height: "100%", minHeight: 300, horizontalAlignment: "center", verticalAlignment: "center", padding: { top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }, visible: false },
                            this.$render("i-panel", { class: index_css_3.spinnerStyle })),
                        this.$render("i-scom-page-viewer", { id: "pageViewer" })),
                    this.$render("i-hstack", { verticalAlignment: "center", gap: "4px", padding: { top: '1rem', bottom: '1rem' } },
                        this.$render("i-label", { id: "lblDate", font: { size: '0.875rem', color: Theme.text.secondary } }),
                        this.$render("i-label", { id: "lbViews", caption: '0', font: { weight: 600 } }),
                        this.$render("i-label", { caption: "Views", font: { color: Theme.text.secondary } })),
                    this.$render("i-scom-analytics", { id: "analyticEl", display: 'block', border: { top: { width: '1px', style: 'solid', color: Theme.divider }, bottom: { width: '1px', style: 'solid', color: Theme.divider } } }),
                    this.$render("i-grid-layout", { templateColumns: ['40px', 'auto', '80px'], gap: { column: 12 }, grid: { verticalAlignment: 'center' }, margin: { top: 12, bottom: 12 } },
                        this.$render("i-image", { class: index_css_3.avatarStyle, width: 36, height: 36, display: "block" }),
                        this.$render("i-markdown-editor", { id: "replyEditor", width: "100%", value: "Post your reply", viewer: false, hideModeSwitch: true, mode: 'wysiwyg', toolbarItems: [], font: { size: '1.5rem' }, height: "auto", theme: 'dark', stack: { grow: '1' }, class: index_css_3.editorStyle }),
                        this.$render("i-hstack", { horizontalAlignment: "end" },
                            this.$render("i-button", { minHeight: 32, padding: { left: '1rem', right: '1rem' }, background: { color: Theme.colors.primary.main }, font: { color: Theme.colors.primary.contrastText }, border: { radius: '30px' }, enabled: false, caption: 'Reply' })))),
                this.$render("i-vstack", { id: "pnlStatusReplies", gap: "0.5rem", border: { top: { width: '1px', style: 'solid', color: Theme.divider } } })));
        }
    };
    ScomStatus = __decorate([
        (0, components_8.customElements)('i-scom-status')
    ], ScomStatus);
    exports.ScomStatus = ScomStatus;
});
define("@scom/scom-thread/commons/index.ts", ["require", "exports", "@scom/scom-thread/commons/analytic/index.tsx", "@scom/scom-thread/commons/post/index.tsx", "@scom/scom-thread/commons/status/index.tsx"], function (require, exports, index_6, index_7, index_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomStatus = exports.ScomPost = exports.ScomAnalytics = void 0;
    Object.defineProperty(exports, "ScomAnalytics", { enumerable: true, get: function () { return index_6.ScomAnalytics; } });
    Object.defineProperty(exports, "ScomPost", { enumerable: true, get: function () { return index_7.ScomPost; } });
    Object.defineProperty(exports, "ScomStatus", { enumerable: true, get: function () { return index_8.ScomStatus; } });
});
define("@scom/scom-thread", ["require", "exports", "@ijstech/components", "@scom/scom-thread/index.css.ts", "@scom/scom-thread/global/index.ts", "@scom/scom-thread/data.json.ts", "@scom/scom-thread/store/index.ts"], function (require, exports, components_9, index_css_4, index_9, data_json_2, index_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_9.Styles.Theme.ThemeVars;
    let ScomThread = class ScomThread extends components_9.Module {
        ;
        constructor(parent, options) {
            super(parent, options);
            if (data_json_2.default)
                (0, index_10.setDataFromJson)(data_json_2.default);
            this.$eventBus = components_9.application.EventBus;
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
            await this.mainStatus.setData(this.cid);
            this.btnReply.enabled;
        }
        onClosedReplyMd() {
            this.mdReply.visible = false;
        }
        async onShowReplyMd(data) {
            await this.mdPost.setData({ cid: data.cid, showAnalytics: false, type: 'reply' });
            this.mdReply.refresh();
            this.mdReply.visible = true;
        }
        initEvents() {
            this.$eventBus.register(this, index_9.EVENTS.SHOW_REPLY_MODAL, this.onShowReplyMd);
        }
        init() {
            super.init();
            const cid = this.getAttribute('cid', true);
            if (cid)
                this.setData({ cid });
            this.initEvents();
        }
        render() {
            return (this.$render("i-vstack", { width: "100%", class: index_css_4.customStyles },
                this.$render("i-panel", { padding: { left: '1rem', right: '1rem' } },
                    this.$render("i-scom-status", { id: "mainStatus" })),
                this.$render("i-modal", { id: "mdReply", maxWidth: 600, class: index_css_4.modalStyle },
                    this.$render("i-vstack", { gap: "1rem" },
                        this.$render("i-hstack", { verticalAlignment: "center", minHeight: 53 },
                            this.$render("i-icon", { name: "times", width: 20, height: 20, onClick: this.onClosedReplyMd }),
                            this.$render("i-button", { caption: 'Drafts', padding: { top: '0.5rem', bottom: '0.5rem', left: '1rem', right: '1rem' }, background: { color: 'transparent' }, visible: false })),
                        this.$render("i-scom-post", { id: "mdPost" }),
                        this.$render("i-hstack", { verticalAlignment: "center", gap: "12px", stack: { grow: '1' }, width: "100%" },
                            this.$render("i-panel", { stack: { basis: '40px', shrink: '0' } },
                                this.$render("i-image", { class: index_css_4.avatarStyle, width: 36, height: 36, display: "block" })),
                            this.$render("i-markdown-editor", { id: "replyEditor", width: "100%", value: "Post your reply", viewer: false, hideModeSwitch: true, mode: 'wysiwyg', toolbarItems: [], font: { size: '1.5rem' }, height: "auto", theme: 'dark', stack: { grow: '1' }, class: index_css_4.editorStyle })),
                        this.$render("i-hstack", { horizontalAlignment: "end", margin: { top: '1.5rem' } },
                            this.$render("i-button", { id: "btnReply", minHeight: 32, padding: { left: '1rem', right: '1rem' }, background: { color: Theme.colors.primary.main }, font: { color: Theme.colors.primary.contrastText }, border: { radius: '30px' }, enabled: false, caption: 'Reply' }))))));
        }
    };
    ScomThread = __decorate([
        (0, components_9.customElements)('i-scom-thread')
    ], ScomThread);
    exports.default = ScomThread;
});
