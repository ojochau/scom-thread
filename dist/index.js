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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
define("@scom/scom-thread/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.modalStyle = exports.customStyles = exports.containerStyles = exports.multiLineTextStyle = exports.labelStyle = exports.spinnerStyle = void 0;
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
    exports.containerStyles = components_1.Styles.style({});
    exports.customStyles = components_1.Styles.style({
        $nest: {
            '.hovered-icon': {
                transition: 'background 0.3s ease-in'
            },
            '.hovered-icon:hover': {
                borderRadius: '50%',
                background: Theme.colors.primary.light,
                $nest: {
                    'svg': {
                        fill: `${Theme.colors.primary.main} !important`
                    }
                }
            },
            '.avatar img': {
                objectFit: 'cover'
            },
            'i-button:hover': {
                opacity: 0.9
            }
        }
    });
    exports.modalStyle = components_1.Styles.style({
        $nest: {
            '.modal': {
                padding: '0 1rem 1rem'
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
    exports.ReplyType = void 0;
    var ReplyType;
    (function (ReplyType) {
        ReplyType["REPLY"] = "reply";
        ReplyType["QUOTE"] = "quote";
    })(ReplyType = exports.ReplyType || (exports.ReplyType = {}));
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
    exports.setUserActions = exports.getUserActions = exports.getUser = exports.setUser = exports.getIPFSGatewayUrl = exports.setIPFSGatewayUrl = exports.setDataFromJson = exports.getMode = exports.setMode = exports.state = void 0;
    const getLocalUser = () => {
        let localData = localStorage.getItem('user');
        try {
            return localData ? JSON.parse(localData) : {};
        }
        catch (_a) { }
        return {};
    };
    const defaultUserData = {
        actions: {}
    };
    exports.state = {
        ipfsGatewayUrl: "",
        mode: 'development',
        user: Object.assign({}, getLocalUser())
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
        exports.state.user = Object.assign(Object.assign({}, defaultUserData), data);
        localStorage.setItem('user', JSON.stringify(data));
    };
    exports.setUser = setUser;
    const getUser = () => {
        return exports.state.user;
    };
    exports.getUser = getUser;
    const getUserActions = (cid) => {
        var _a, _b;
        return ((_b = (_a = exports.state.user) === null || _a === void 0 ? void 0 : _a.actions) === null || _b === void 0 ? void 0 : _b[cid]) || null;
    };
    exports.getUserActions = getUserActions;
    const setUserActions = (cid, value) => {
        var _a;
        const useActions = (_a = exports.state.user) === null || _a === void 0 ? void 0 : _a.actions;
        if (!useActions)
            exports.state.user.actions = {};
        exports.state.user.actions[cid] = Object.assign({}, value);
        localStorage.setItem('user', JSON.stringify(Object.assign({}, exports.state.user)));
    };
    exports.setUserActions = setUserActions;
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
define("@scom/scom-thread/global/localData/comment.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLocalWidget = void 0;
    ///<amd-module name='@scom/scom-thread/global/localData/comment.ts'/> 
    const getLocalWidget = (description) => {
        return {
            "sections": [
                {
                    "id": "6876b0ab-a29c-4ed8-905e-51cd515fa26c",
                    "row": 0,
                    "elements": [
                        {
                            "id": "916919ec-42ca-4c01-9b1d-ac43ef3b1857",
                            "column": 1,
                            "columnSpan": 12,
                            "properties": {
                                "content": `<span class=\"p5\">${description}</span>`
                            },
                            "module": {
                                "name": "Text box",
                                "path": "scom-markdown-editor",
                                "category": "widgets",
                                "imgUrl": "https://ipfs.scom.dev/ipfs/bafybeicn7huboxcg5aiietevo2dwdmigsnpfokg7erxhaysbqdezz4p2qq/composables/textbox.png"
                            },
                            "tag": {
                                "width": "100%",
                                "height": 200,
                                "pt": 0,
                                "pb": 0,
                                "pl": 0,
                                "pr": 0
                            }
                        }
                    ],
                    "config": {
                        "backgroundColor": "#fff",
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
            "footer": {
                "image": "",
                "elements": []
            },
            "config": {
                "sectionWidth": 1000,
                "margin": {
                    "x": "auto",
                    "y": "0"
                }
            }
        };
    };
    exports.getLocalWidget = getLocalWidget;
});
define("@scom/scom-thread/global/localData/status.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-thread/global/localData/status.json.ts'/> 
    exports.default = {
        1: {
            "username": "OpenSwap",
            "description": "We are thrilled to announce that the OpenSwap Bridge has officially launched its pilot phase! This means that you can now transfer your $OSWAP tokens between the BNB Smart Chain and Avalanche.",
            "owner": "0xaA530FC26ee1Be26a27ca2CC001e74b972563a22",
            "avatar": "https://placehold.co/50",
            "publishDate": 1695876446.837,
            "analytics": {
                reply: 2,
                repost: 1,
                vote: 5,
                bookmark: 1,
                view: 10
            },
            replies: [
                {
                    cid: 2
                },
                {
                    cid: 4
                }
            ]
        },
        2: {
            "username": "cryptogems555",
            "owner": "0xaA530FC26ee1Be26a27ca2CC001e74b972563a21",
            "description": 'Always in the #MUSK team',
            "avatar": "https://pbs.twimg.com/profile_images/1579373773567959043/cL1O2SlB_400x400.jpg",
            "publishDate": 1695876446.837,
            "analytics": {
                reply: 1,
                repost: 1,
                vote: 1,
                bookmark: 1,
                view: 1
            },
            replies: [
                {
                    cid: 3
                }
            ]
        },
        3: {
            "username": "_Crypto_Colonel",
            "description": "Bitcoin = Freedom 🫡",
            "owner": "0xaA530FC26ee1Be26a27ca2CC001e74b972563a20",
            "avatar": "https://placehold.co/50",
            "publishDate": 1695876446.837,
            "analytics": {
                reply: 0,
                repost: 0,
                vote: 1,
                bookmark: 0,
                view: 0
            },
            replies: []
        },
        4: {
            "username": "ClinqGold",
            "description": "true. only digital currency",
            "owner": "0xaA530FC26ee1Be26a27ca2CC001e74b972563a19",
            "avatar": "https://pbs.twimg.com/profile_images/1684498058908782592/Qwg434qj_400x400.png",
            "publishDate": 1695876446.837,
            "analytics": {
                reply: 0,
                repost: 0,
                vote: 0,
                bookmark: 0,
                view: 0
            },
            replies: []
        }
    };
});
define("@scom/scom-thread/global/API.ts", ["require", "exports", "@scom/scom-thread/store/index.ts", "@scom/scom-thread/global/localData/comment.ts", "@scom/scom-thread/global/localData/status.json.ts"], function (require, exports, index_2, comment_1, status_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getDescWidgetData = exports.getWidgetData = exports.fetchDataByCid = void 0;
    const fetchDataByCid = async (cid) => {
        try {
            if ((0, index_2.getMode)() === 'development') {
                return status_json_1.default[cid] || null;
            }
            else {
                const ipfsBaseUrl = (0, index_2.getIPFSGatewayUrl)();
                const url = `${ipfsBaseUrl}/${cid}`;
                const response = await fetch(url);
                return await response.json();
            }
        }
        catch (_a) { }
        return null;
    };
    exports.fetchDataByCid = fetchDataByCid;
    const getDescWidgetData = (content) => {
        let widgetData = (0, comment_1.getLocalWidget)(content);
        return widgetData;
    };
    exports.getDescWidgetData = getDescWidgetData;
    const getWidgetData = async (dataUri) => {
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
define("@scom/scom-thread/global/schemas.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getEmbedderSchema = exports.getBuilderSchema = void 0;
    ///<amd-module name='@scom/scom-thread/global/schemas.ts'/> 
    const theme = {
        type: 'object',
        properties: {
            backgroundColor: {
                type: 'string',
                format: 'color'
            },
            fontColor: {
                type: 'string',
                format: 'color'
            },
            inputBackgroundColor: {
                type: 'string',
                format: 'color'
            },
            inputFontColor: {
                type: 'string',
                format: 'color'
            },
            primaryColor: {
                type: 'string',
                format: 'color'
            },
            primaryBackground: {
                type: 'string',
                format: 'color'
            },
            successColor: {
                type: 'string',
                format: 'color'
            },
            successBackground: {
                type: 'string',
                format: 'color'
            },
            errorColor: {
                type: 'string',
                format: 'color'
            },
            errorBackground: {
                type: 'string',
                format: 'color'
            },
            subcribeButtonBackground: {
                type: 'string',
                format: 'color'
            },
            placeholderColor: {
                type: 'string',
                format: 'color'
            },
            hoverBackgroundColor: {
                type: 'string',
                format: 'color'
            },
            groupBorderColor: {
                type: 'string',
                format: 'color'
            },
            borderColor: {
                type: 'string',
                format: 'color'
            },
            secondaryColor: {
                type: 'string',
                format: 'color'
            },
        }
    };
    const themeUISchema = {
        type: 'Category',
        label: 'Theme',
        elements: [
            {
                type: 'VerticalLayout',
                elements: [
                    {
                        type: 'Group',
                        label: 'Dark',
                        elements: [
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/backgroundColor'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/fontColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/inputBackgroundColor'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/inputFontColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/primaryBackground'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/primaryColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/successBackground'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/successColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/errorBackground'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/errorColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/subcribeButtonBackground'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/placeholderColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/groupBorderColor'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/borderColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/secondaryColor'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        type: 'Group',
                        label: 'Light',
                        elements: [
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/backgroundColor'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/fontColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/inputBackgroundColor'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/inputFontColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/primaryBackground'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/primaryColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/successBackground'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/successColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/errorBackground'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/errorColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/subcribeButtonBackground'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/placeholderColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/groupBorderColor'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/borderColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/secondaryColor'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
    function getBuilderSchema() {
        return {
            dataSchema: {
                type: 'object',
                required: ['cid'],
                properties: {
                    cid: {
                        type: 'string'
                    },
                    theme: {
                        type: 'string',
                        default: 'light',
                        enum: ['dark', 'light']
                    },
                    dark: theme,
                    light: theme
                }
            },
            uiSchema: {
                type: 'Categorization',
                elements: [
                    {
                        type: 'Category',
                        label: 'General',
                        elements: [
                            {
                                type: 'VerticalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/cid'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/theme'
                                    }
                                ]
                            }
                        ]
                    },
                    themeUISchema
                ]
            }
        };
    }
    exports.getBuilderSchema = getBuilderSchema;
    function getEmbedderSchema() {
        return {
            dataSchema: {
                type: 'object',
                properties: {
                    cid: {
                        type: 'string',
                        required: true
                    },
                    dark: theme,
                    light: theme
                }
            },
            uiSchema: {
                type: 'Categorization',
                elements: [
                    {
                        type: 'Category',
                        label: 'General',
                        elements: [
                            {
                                type: 'VerticalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/cid'
                                    }
                                ]
                            }
                        ]
                    },
                    themeUISchema
                ]
            }
        };
    }
    exports.getEmbedderSchema = getEmbedderSchema;
});
define("@scom/scom-thread/global/index.ts", ["require", "exports", "@scom/scom-thread/global/utils.ts", "@scom/scom-thread/global/API.ts", "@scom/scom-thread/global/schemas.ts"], function (require, exports, utils_1, API_1, schemas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-thread/global/index.ts'/> 
    __exportStar(utils_1, exports);
    __exportStar(API_1, exports);
    __exportStar(schemas_1, exports);
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
                    '> i-icon': {
                        background: Theme.colors.primary.light,
                        borderRadius: '50%'
                    },
                    '> i-icon svg': {
                        fill: `${Theme.colors.primary.main}!important`
                    },
                    '> i-label': {
                        color: `${Theme.colors.primary.main}!important`
                    }
                }
            },
            '.green-icon:hover': {
                $nest: {
                    '> i-icon': {
                        background: Theme.colors.success.light,
                        borderRadius: '50%'
                    },
                    '> i-icon svg': {
                        fill: `${Theme.colors.success.main}!important`
                    },
                    '> i-label': {
                        color: `${Theme.colors.success.main}!important`
                    }
                }
            },
            '.red-icon:hover': {
                $nest: {
                    '> i-icon': {
                        background: Theme.colors.error.light,
                        borderRadius: '50%',
                    },
                    '> i-icon svg': {
                        fill: `${Theme.colors.error.main}!important`
                    },
                    '> i-label': {
                        color: `${Theme.colors.error.main}!important`
                    }
                }
            },
            '.custom-modal': {
                $nest: {
                    '.modal': {
                        padding: '0',
                        background: 'transparent'
                    }
                }
            },
            '.share-modal': {
                $nest: {
                    '.modal-wrapper': {
                        boxShadow: 'rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px'
                    },
                    '.modal': {
                        padding: '0'
                    },
                    'i-button': {
                        boxShadow: 'none',
                        background: 'transparent',
                        gap: 12,
                        $nest: {
                            '&:hover': {
                                background: `${Theme.action.hover}`
                            }
                        }
                    }
                }
            }
        }
    });
});
define("@scom/scom-thread/commons/toast/index.tsx", ["require", "exports", "@ijstech/components"], function (require, exports, components_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomThreadToast = void 0;
    const Theme = components_4.Styles.Theme.ThemeVars;
    let ScomThreadToast = class ScomThreadToast extends components_4.Module {
        set message(value) {
            this._data.message = value;
        }
        get message() {
            var _a;
            return (_a = this._data.message) !== null && _a !== void 0 ? _a : '';
        }
        set buttons(value) {
            this._data.buttons = value;
        }
        get buttons() {
            var _a;
            return (_a = this._data.buttons) !== null && _a !== void 0 ? _a : [];
        }
        async setData(value) {
            var _a;
            this._data = value;
            this.lbAlert.caption = this.message;
            this.pnlButtons.clearInnerHTML();
            if ((_a = this.buttons) === null || _a === void 0 ? void 0 : _a.length) {
                for (let item of this.buttons) {
                    const btn = await components_4.Button.create(Object.assign({}, item));
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
            return (this.$render("i-modal", { id: "mdAlert", position: "fixed", maxWidth: '100%', width: '50%', popupPlacement: 'bottom', bottom: '10px', class: "custom-modal" },
                this.$render("i-hstack", { verticalAlignment: "center", horizontalAlignment: "space-between", padding: { top: 12, bottom: 12, left: 16, right: 16 }, border: { radius: 5, style: 'none' }, background: { color: Theme.colors.primary.main } },
                    this.$render("i-label", { id: "lbAlert", caption: "", font: { color: Theme.colors.primary.contrastText } }),
                    this.$render("i-hstack", { id: "pnlButtons", verticalAlignment: "center", gap: "0.5rem" }))));
        }
    };
    ScomThreadToast = __decorate([
        (0, components_4.customElements)('i-scom-thread-toast')
    ], ScomThreadToast);
    exports.ScomThreadToast = ScomThreadToast;
});
define("@scom/scom-thread/commons/analytics/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-thread/interface.ts", "@scom/scom-thread/global/index.ts", "@scom/scom-thread/commons/analytics/index.css.ts", "@scom/scom-thread/store/index.ts"], function (require, exports, components_5, interface_1, index_3, index_css_1, index_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomThreadAnalytics = void 0;
    const Theme = components_5.Styles.Theme.ThemeVars;
    let ScomThreadAnalytics = class ScomThreadAnalytics extends components_5.Module {
        constructor() {
            super(...arguments);
            this.userActions = {
                bookmarked: false,
                voted: 0
            };
        }
        setData(value) {
            this._data = value;
            this.renderUI();
        }
        getData() {
            var _a;
            return (_a = this._data) !== null && _a !== void 0 ? _a : [];
        }
        renderUI() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            this.lbReply.caption = ((_a = this._data) === null || _a === void 0 ? void 0 : _a.reply) ? (0, index_3.formatNumber)((_b = this._data) === null || _b === void 0 ? void 0 : _b.reply, 0) : '';
            this.lbRepost.caption = ((_c = this._data) === null || _c === void 0 ? void 0 : _c.repost) ? (0, index_3.formatNumber)((_d = this._data) === null || _d === void 0 ? void 0 : _d.repost, 0) : '';
            this.lbVote.caption = ((_e = this._data) === null || _e === void 0 ? void 0 : _e.vote) ? (0, index_3.formatNumber)((_f = this._data) === null || _f === void 0 ? void 0 : _f.vote, 0) : '';
            if (this._data.isBookmarkShown) {
                const storedData = (0, index_4.getUserActions)(this._data.cid);
                if (storedData)
                    this.userActions = Object.assign({}, storedData);
                if (this.userActions['bookmarked']) {
                    this.iconBookmark.fill = Theme.colors.primary.main;
                }
                else {
                    this.iconBookmark.fill = Theme.text.secondary;
                }
                const bookmark = this.userActions['bookmarked'] ? Number((_h = (_g = this._data) === null || _g === void 0 ? void 0 : _g.bookmark) !== null && _h !== void 0 ? _h : 0) + 1 : (_j = this._data) === null || _j === void 0 ? void 0 : _j.bookmark;
                this.lbBookmark.caption = bookmark ? (0, index_3.formatNumber)(bookmark, 0) : '';
                this.pnlBookmark.visible = true;
                this.pnlView.visible = false;
            }
            else {
                this.lbView.caption = ((_k = this._data) === null || _k === void 0 ? void 0 : _k.view) ? (0, index_3.formatNumber)((_l = this._data) === null || _l === void 0 ? void 0 : _l.view, 0) : '';
                this.pnlBookmark.visible = false;
                this.pnlView.visible = true;
            }
        }
        onShowModal(name) {
            this[name].visible = !this[name].visible;
            if (this[name].visible)
                this[name].classList.add('show');
            else
                this[name].classList.remove('show');
        }
        onCloseModal(name) {
            this[name].visible = false;
            this.removeShow(name);
        }
        removeShow(name) {
            this[name].classList.remove('show');
        }
        onHandleReply(type) {
            if (this.onReplyClicked)
                this.onReplyClicked(type);
        }
        onHandleVote(num) {
            var _a;
            let voteQty = Number(((_a = this._data) === null || _a === void 0 ? void 0 : _a.vote) || 0);
            this._data.vote = Number(voteQty) + num;
            this.lbVote.caption = (0, index_3.formatNumber)(this._data.vote, 0);
            this.userActions['voted'] = num;
            (0, index_4.setUserActions)(this._data.cid, Object.assign({}, this.userActions));
        }
        onHandleBookmark() {
            var _a, _b;
            const bookmarked = (_a = this.userActions['bookmarked']) !== null && _a !== void 0 ? _a : false;
            this.userActions['bookmarked'] = !bookmarked;
            let bookmarkedQty = Number(((_b = this._data) === null || _b === void 0 ? void 0 : _b.bookmark) || 0);
            if (this.userActions['bookmarked']) {
                this.toastElm.setData({
                    message: 'Added to your Bookmarks',
                    buttons: [
                        {
                            caption: 'View',
                            font: { color: Theme.colors.primary.contrastText, weight: 600 },
                            onClick: () => { }
                        }
                    ]
                });
                this.iconBookmark.fill = Theme.colors.primary.main;
                this._data.bookmark = bookmarkedQty + 1;
            }
            else {
                this.toastElm.setData({
                    message: 'Removed from your Bookmarks'
                });
                this.iconBookmark.fill = Theme.text.secondary;
                this._data.bookmark = bookmarkedQty <= 0 ? 0 : bookmarkedQty - 1;
            }
            this.lbBookmark.caption = (0, index_3.formatNumber)(this._data.bookmark, 0);
            this.toastElm.toast();
            (0, index_4.setUserActions)(this._data.cid, Object.assign({}, this.userActions));
        }
        async onCopyLink() {
            await components_5.application.copyToClipboard(`/${this._data.cid}`);
            this.toastElm.setData({
                message: 'Copied to clipboard'
            });
            this.toastElm.toast();
        }
        init() {
            super.init();
            const data = this.getAttribute('data', true);
            if (data)
                this.setData(data);
        }
        render() {
            return (this.$render("i-panel", { class: index_css_1.analyticStyle },
                this.$render("i-hstack", { id: "groupAnalysis", horizontalAlignment: "space-between", padding: { top: '0.4rem', bottom: '0.4rem' }, width: '100%' },
                    this.$render("i-hstack", { id: "pnlReply", verticalAlignment: "center", tooltip: { content: 'Reply', placement: 'bottomLeft' }, class: "analytic", onClick: () => this.onHandleReply(interface_1.ReplyType.REPLY) },
                        this.$render("i-icon", { name: 'comment', width: 34, height: 34, fill: Theme.text.secondary, border: { radius: '50%' }, padding: { top: 8, bottom: 8, left: 8, right: 8 } }),
                        this.$render("i-label", { id: "lbReply", caption: '', font: { color: Theme.text.secondary, size: '0.813rem' } })),
                    this.$render("i-hstack", { id: "pnlRepost", verticalAlignment: "center", tooltip: { content: 'Repost', placement: 'bottomLeft' }, class: "analytic green-icon", position: "relative", onClick: () => this.onShowModal('mdRepost') },
                        this.$render("i-icon", { name: 'retweet', width: 34, height: 34, fill: Theme.text.secondary, border: { radius: '50%' }, padding: { top: 8, bottom: 8, left: 8, right: 8 } }),
                        this.$render("i-label", { id: "lbRepost", caption: '', font: { color: Theme.text.secondary, size: '0.813rem' } }),
                        this.$render("i-modal", { id: "mdRepost", maxWidth: 200, minWidth: 150, popupPlacement: 'bottomRight', showBackdrop: false, border: { radius: 12 }, padding: { top: '0px', left: '0px', right: '0px', bottom: '0px' }, class: 'share-modal', mediaQueries: [
                                {
                                    maxWidth: '767px',
                                    properties: {
                                        showBackdrop: true,
                                        popupPlacement: 'bottom',
                                        position: 'fixed',
                                        maxWidth: '100%',
                                        width: '100%',
                                        border: { radius: '16px 16px 0 0' }
                                    }
                                }
                            ], onClose: () => this.removeShow('mdRepost') },
                            this.$render("i-vstack", { minWidth: 0 },
                                this.$render("i-button", { caption: 'Repost', width: "100%", padding: { top: 12, bottom: 12, left: 16, right: 16 }, font: { color: Theme.text.primary, weight: 600 }, icon: { name: 'retweet', width: 16, height: 16, fill: Theme.text.primary }, grid: { horizontalAlignment: 'start' }, onClick: () => { } }),
                                this.$render("i-button", { caption: 'Quote', width: "100%", padding: { top: 12, bottom: 12, left: 16, right: 16 }, font: { color: Theme.text.primary, weight: 600 }, icon: { name: 'edit', width: 16, height: 16, fill: Theme.text.primary }, grid: { horizontalAlignment: 'start' }, onClick: () => this.onHandleReply(interface_1.ReplyType.QUOTE) }),
                                this.$render("i-hstack", { width: "100%", horizontalAlignment: "center", padding: { top: 12, bottom: 12, left: 16, right: 16 }, visible: false, mediaQueries: [
                                        {
                                            maxWidth: '767px',
                                            properties: { visible: true }
                                        }
                                    ] },
                                    this.$render("i-button", { caption: 'Cancel', width: "100%", minHeight: 44, padding: { left: 16, right: 16 }, font: { color: Theme.text.primary, weight: 600 }, border: { radius: '30px', width: '1px', style: 'solid', color: Theme.colors.secondary.light }, grid: { horizontalAlignment: 'center' }, onClick: () => this.onCloseModal('mdRepost') }))))),
                    this.$render("i-hstack", { verticalAlignment: "center", tooltip: { content: 'Upvote/downvote', placement: 'bottomLeft' }, class: "analytic red-icon" },
                        this.$render("i-icon", { name: 'arrow-up', width: 34, height: 34, fill: Theme.text.secondary, border: { radius: '50%' }, padding: { top: 8, bottom: 8, left: 8, right: 8 }, onClick: () => this.onHandleVote(1) }),
                        this.$render("i-label", { id: "lbVote", caption: '', font: { color: Theme.text.secondary, size: '0.813rem' } }),
                        this.$render("i-icon", { name: 'arrow-down', width: 34, height: 34, fill: Theme.text.secondary, border: { radius: '50%' }, padding: { top: 8, bottom: 8, left: 8, right: 8 }, onClick: () => this.onHandleVote(-1) })),
                    this.$render("i-hstack", { id: "pnlBookmark", verticalAlignment: "center", tooltip: { content: 'Bookmark', placement: 'bottomLeft' }, class: "analytic", onClick: this.onHandleBookmark, visible: false },
                        this.$render("i-icon", { id: "iconBookmark", name: 'bookmark', width: 34, height: 34, fill: Theme.text.secondary, border: { radius: '50%' }, padding: { top: 8, bottom: 8, left: 8, right: 8 } }),
                        this.$render("i-label", { id: "lbBookmark", caption: '', font: { color: Theme.text.secondary, size: '0.813rem' } })),
                    this.$render("i-hstack", { id: "pnlView", verticalAlignment: "center", tooltip: { content: 'View', placement: 'bottomLeft' }, class: "analytic", visible: false },
                        this.$render("i-icon", { name: 'chart-bar', width: 34, height: 34, fill: Theme.text.secondary, border: { radius: '50%' }, padding: { top: 8, bottom: 8, left: 8, right: 8 } }),
                        this.$render("i-label", { id: "lbView", caption: '', font: { color: Theme.text.secondary, size: '0.813rem' } })),
                    this.$render("i-hstack", { id: "pnlShare", class: "analytic", position: "relative" },
                        this.$render("i-icon", { name: 'share-square', width: 34, height: 34, fill: Theme.text.secondary, border: { radius: '50%' }, padding: { top: 8, bottom: 8, left: 8, right: 8 }, onClick: () => this.onShowModal('mdShare') }),
                        this.$render("i-modal", { id: "mdShare", maxWidth: 384, minWidth: 300, popupPlacement: 'bottomRight', showBackdrop: false, border: { radius: 12 }, padding: { top: '0px', left: '0px', right: '0px', bottom: '0px' }, class: 'share-modal', mediaQueries: [
                                {
                                    maxWidth: '767px',
                                    properties: {
                                        showBackdrop: true,
                                        popupPlacement: 'bottom',
                                        position: 'fixed',
                                        maxWidth: '100%',
                                        width: '100%',
                                        maxHeight: '50vh',
                                        border: { radius: '16px 16px 0 0' }
                                    }
                                }
                            ], onClose: () => this.removeShow('mdShare') },
                            this.$render("i-vstack", { minWidth: 0 },
                                this.$render("i-button", { caption: 'Copy link', width: "100%", padding: { top: 12, bottom: 12, left: 16, right: 16 }, font: { color: Theme.text.primary, weight: 600 }, icon: { name: 'link', width: 16, height: 16, fill: Theme.text.primary }, grid: { horizontalAlignment: 'start' }, onClick: this.onCopyLink }),
                                this.$render("i-button", { caption: 'Share post via...', width: "100%", padding: { top: 12, bottom: 12, left: 16, right: 16 }, font: { color: Theme.text.primary, weight: 600 }, icon: { name: 'share', width: 16, height: 16, fill: Theme.text.primary }, grid: { horizontalAlignment: 'start' }, onClick: () => { } }),
                                this.$render("i-button", { caption: 'Send via Direct Message', width: "100%", padding: { top: 12, bottom: 12, left: 16, right: 16 }, font: { color: Theme.text.primary, weight: 600 }, icon: { name: 'envelope', width: 16, height: 16, fill: Theme.text.primary }, grid: { horizontalAlignment: 'start' }, onClick: () => { } }),
                                this.$render("i-button", { caption: 'Bookmark', width: "100%", padding: { top: 12, bottom: 12, left: 16, right: 16 }, font: { color: Theme.text.primary, weight: 600 }, icon: { name: 'bookmark', width: 16, height: 16, fill: Theme.text.primary }, grid: { horizontalAlignment: 'start' }, onClick: () => { } }),
                                this.$render("i-hstack", { width: "100%", horizontalAlignment: "center", padding: { top: 12, bottom: 12, left: 16, right: 16 }, visible: false, mediaQueries: [
                                        {
                                            maxWidth: '767px',
                                            properties: { visible: true }
                                        }
                                    ] },
                                    this.$render("i-button", { caption: 'Cancel', width: "100%", minHeight: 44, padding: { left: 16, right: 16 }, font: { color: Theme.text.primary, weight: 600 }, border: { radius: '30px', width: '1px', style: 'solid', color: Theme.colors.secondary.light }, grid: { horizontalAlignment: 'center' }, onClick: () => this.onCloseModal('mdShare') })))))),
                this.$render("i-scom-thread-toast", { id: "toastElm" })));
        }
    };
    ScomThreadAnalytics = __decorate([
        (0, components_5.customElements)('i-scom-thread-analytics')
    ], ScomThreadAnalytics);
    exports.ScomThreadAnalytics = ScomThreadAnalytics;
});
define("@scom/scom-thread/commons/post/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.customStyles = void 0;
    const Theme = components_6.Styles.Theme.ThemeVars;
    exports.customStyles = components_6.Styles.style({
        cursor: 'pointer',
        $nest: {
            '.has-border:after': {
                content: "''",
                position: 'absolute',
                width: 2,
                height: 'calc(100% - 2.5rem)',
                display: 'block',
                backgroundColor: Theme.colors.secondary.light,
                transform: 'translateX(-50%)',
                left: '1.25rem',
                top: '2.5rem'
            },
            '#pnlMore:hover > .more-block': {
                background: Theme.action.hover
            }
        }
    });
});
define("@scom/scom-thread/commons/post/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-thread/commons/post/index.css.ts", "@scom/scom-thread/global/index.ts", "@scom/scom-thread/index.css.ts"], function (require, exports, components_7, index_css_2, index_5, index_css_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomThreadPost = void 0;
    const Theme = components_7.Styles.Theme.ThemeVars;
    const MAX_HEIGHT = 352;
    let ScomThreadPost = class ScomThreadPost extends components_7.Module {
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
            this._theme = value;
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
        get isReply() {
            return this.type === 'reply';
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
            this.lblUsername.caption = "";
            this.lblDate.caption = "";
            this.pageViewer.setData({});
            this.pnlAvatar.classList.remove('has-border');
            this.pnlMore.visible = false;
            this.analyticEl.visible = false;
            this.pnlOverlay.visible = false;
            this.btnViewMore.visible = false;
            this.gridPost.padding = { top: '0px', left: '0px', right: '0px' };
        }
        async renderUI() {
            var _a, _b;
            this.clear();
            const { analytics, owner = '', publishDate, dataUri, username, avatar, description } = this._data || {};
            this.lblOwner.caption = components_7.FormatUtils.truncateWalletAddress(owner);
            this.lblUsername.caption = `@${username}`;
            this.lblUsername.link.href = '';
            this.analyticEl.visible = this.showAnalytics;
            this.lblDate.caption = `. ${(0, index_5.getDuration)(publishDate)}`;
            this.imgAvatar.url = avatar !== null && avatar !== void 0 ? avatar : '';
            try {
                this.pnlLoader.visible = true;
                if (dataUri) {
                    await this.pageViewer.setData({ cid: dataUri + "/scconfig.json" });
                }
                else if (description) {
                    const data = (0, index_5.getDescWidgetData)(description);
                    await this.pageViewer.setData(data);
                }
            }
            catch (_c) { }
            this.pnlLoader.visible = false;
            this.pageViewer.style.setProperty('--custom-background-color', 'transparent');
            if (((_b = (_a = this._data) === null || _a === void 0 ? void 0 : _a.replies) === null || _b === void 0 ? void 0 : _b.length) || this.isReply) {
                this.pnlMore.visible = !this.isReply;
                this.pnlAvatar.classList.add('has-border');
            }
            const parentAttr = this.getAttribute('parent');
            if (parentAttr) {
                this.gridPost.padding = { top: '0.75rem', left: '1rem', right: '1rem' };
            }
            if (this.pnlStatusDetail.scrollHeight > MAX_HEIGHT) {
                this.pnlOverlay.visible = true;
                this.btnViewMore.visible = true;
            }
            const self = this;
            this.analyticEl.onReplyClicked = (type) => {
                if (self.onReplyClicked)
                    self.onReplyClicked({ cid: self.cid, type, postData: Object.assign({}, self._data) });
            };
            this.analyticEl.setData(Object.assign(Object.assign({}, analytics), { cid: this.cid, isBookmarkShown: false }));
        }
        onShowMore() {
            this.renderReplies();
        }
        renderReplies() {
            var _a, _b;
            this.pnlMore.clearInnerHTML();
            this.pnlMore.templateColumns = ['auto'];
            this.pnlMore.padding = { top: '0px', left: '0px', right: '0px' };
            if ((_b = (_a = this._data) === null || _a === void 0 ? void 0 : _a.replies) === null || _b === void 0 ? void 0 : _b.length) {
                for (let reply of this._data.replies) {
                    const childElm = this.$render("i-scom-thread-post", { id: reply.cid });
                    childElm.onReplyClicked = this.onReplyClicked;
                    childElm.theme = this._theme;
                    childElm.parent = this.pnlMore;
                    childElm.setAttribute('parent', 'true');
                    this.pnlMore.appendChild(childElm);
                    childElm.setData({ cid: reply.cid });
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
                        this.$render("i-image", { id: "imgAvatar", width: 40, height: 40, display: "block", background: { color: Theme.background.gradient }, border: { radius: '50%' }, overflow: 'hidden', stack: { basis: '40px' }, class: 'avatar' })),
                    this.$render("i-vstack", { width: '100%', padding: { left: '12px' } },
                        this.$render("i-hstack", { verticalAlignment: "center", horizontalAlignment: "space-between", gap: "0.5rem", width: "100%" },
                            this.$render("i-hstack", { stack: { basis: '70%' }, gap: '0.5rem', verticalAlignment: "center", wrap: "wrap" },
                                this.$render("i-label", { id: "lblOwner", class: index_css_3.labelStyle, font: { size: '17px', weight: 500 } }),
                                this.$render("i-label", { id: "lblUsername", class: index_css_3.labelStyle, font: { color: Theme.text.secondary } }),
                                this.$render("i-label", { id: "lblDate", font: { size: '0.875rem', color: Theme.text.secondary } })),
                            this.$render("i-hstack", { id: "pnlSubscribe", stack: { basis: '30%' }, verticalAlignment: "center", horizontalAlignment: "end", gap: "0.5rem" },
                                this.$render("i-button", { id: "btnSubscribe", minHeight: 32, padding: { left: '1rem', right: '1rem' }, background: { color: Theme.colors.primary.main }, font: { color: Theme.colors.primary.contrastText }, border: { radius: '30px' }, visible: false, caption: 'Subscribe' }),
                                this.$render("i-icon", { name: "ellipsis-h", width: 34, height: 34, fill: Theme.text.secondary, padding: { top: 8, bottom: 8, left: 8, right: 8 }, border: { radius: '50%' }, class: "hovered-icon" }))),
                        this.$render("i-panel", { id: "pnlStatusDetail", maxHeight: MAX_HEIGHT, overflow: 'hidden' },
                            this.$render("i-vstack", { id: "pnlLoader", width: "100%", height: "100%", minHeight: 300, horizontalAlignment: "center", verticalAlignment: "center", padding: { top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }, visible: false },
                                this.$render("i-panel", { class: index_css_3.spinnerStyle })),
                            this.$render("i-scom-page-viewer", { id: "pageViewer" }),
                            this.$render("i-panel", { id: "pnlOverlay", visible: false, height: '5rem', width: '100%', position: 'absolute', bottom: "0px", background: { color: `linear-gradient(0, var(--card-bg-color) 0%, transparent 100%)` } })),
                        this.$render("i-hstack", { id: "btnViewMore", verticalAlignment: "center", padding: { top: '1rem' }, gap: '0.5rem', visible: false, onClick: this.onViewMore },
                            this.$render("i-label", { caption: 'Read more', font: { size: '1rem', color: Theme.colors.primary.main } }),
                            this.$render("i-icon", { name: "angle-down", width: 16, height: 16, fill: Theme.colors.primary.main })),
                        this.$render("i-scom-thread-analytics", { id: "analyticEl", margin: { left: '-8px' }, visible: false }))),
                this.$render("i-grid-layout", { id: "pnlMore", visible: false, templateColumns: ['40px', 'auto'], gap: { column: 12 }, padding: { top: '0.5rem', bottom: '0.5rem', left: '1rem', right: '1rem' }, class: "more-block", onClick: this.onShowMore },
                    this.$render("i-vstack", { height: '1rem', justifyContent: "space-between", alignItems: "center" },
                        this.$render("i-panel", { width: 2, height: 2, background: { color: Theme.colors.secondary.light } }),
                        this.$render("i-panel", { width: 2, height: 2, background: { color: Theme.colors.secondary.light } }),
                        this.$render("i-panel", { width: 2, height: 2, background: { color: Theme.colors.secondary.light } })),
                    this.$render("i-label", { caption: 'Show replies', font: { color: Theme.colors.primary.main, size: '0.9rem' } }))));
        }
    };
    ScomThreadPost = __decorate([
        (0, components_7.customElements)('i-scom-thread-post')
    ], ScomThreadPost);
    exports.ScomThreadPost = ScomThreadPost;
});
define("@scom/scom-thread/commons/status/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.customStyles = void 0;
    const Theme = components_8.Styles.Theme.ThemeVars;
    exports.customStyles = components_8.Styles.style({
        cursor: 'pointer',
        $nest: {
            '.post-body:hover': {
                background: Theme.action.hover
            }
        }
    });
});
define("@scom/scom-thread/commons/status/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-thread/commons/status/index.css.ts", "@scom/scom-thread/index.css.ts", "@scom/scom-thread/global/index.ts"], function (require, exports, components_9, index_css_4, index_css_5, index_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomThreadStatus = void 0;
    const Theme = components_9.Styles.Theme.ThemeVars;
    const MAX_HEIGHT = 352;
    const numsPerPage = 10;
    let ScomThreadStatus = class ScomThreadStatus extends components_9.Module {
        constructor(parent, options) {
            super(parent, options);
            this.currentPage = 1;
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
            this._theme = value;
            // if (this.pageViewer) this.pageViewer.theme = value;
            if (this.inputReply)
                this.inputReply.theme = value;
        }
        get replies() {
            var _a;
            return ((_a = this._data) === null || _a === void 0 ? void 0 : _a.replies) || [];
        }
        get maxPage() {
            return Math.ceil(this.replies.length / numsPerPage);
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
                this._data = await (0, index_6.fetchDataByCid)(this.cid);
            }
            catch (_a) {
                this._data = null;
            }
        }
        clear() {
            this.imgAvatar.url = '';
            this.lblOwner.caption = '';
            this.lblDate.caption = '';
            this.lbViews.caption = '';
            this.lblUsername.caption = '';
            // this.pageViewer.setData({} as any);
            this.btnViewMore.visible = false;
            this.pnlOverlay.visible = false;
            this.pnlReplies.clearInnerHTML();
        }
        async renderUI() {
            this.clear();
            const { analytics, owner, username, publishDate, dataUri, avatar } = this._data || {};
            let self = this;
            // this.lblOwner.caption = FormatUtils.truncateWalletAddress(owner);
            // this.lblUsername.caption = `@${username}`;
            // this.lblUsername.link.href = '';
            // this.lblDate.caption = publishDate ? FormatUtils.unixToFormattedDate(publishDate) : '';
            // this.lbViews.caption = formatNumber(analytics?.view || 0, 0);
            // this.imgAvatar.url = avatar ?? '';
            // if (dataUri) {
            //   this.pnlViewerLoader.visible = true;
            //   await this.pageViewer.setData(await getWidgetData(dataUri));
            //   this.pnlViewerLoader.visible = false;
            // }
            // if (this.pnlStatusDetail.scrollHeight > MAX_HEIGHT) {
            //   this.pnlOverlay.visible = true;
            //   this.btnViewMore.visible = true;
            // }
            // this.renderPostFrom();
            this.analyticEl.onReplyClicked = (type) => {
                if (self.onReplyClicked)
                    self.onReplyClicked({ cid: self.cid, type, postData: Object.assign({}, self._data) });
            };
            this.analyticEl.setData(Object.assign(Object.assign({}, analytics), { cid: this.cid, isBookmarkShown: true }));
            this.inputReply.onSubmit = (target) => {
                if (self.onReplyHandler)
                    self.onReplyHandler({ cid: self.cid, content: target.getMarkdownValue() });
            };
            this.inputReply.setData({ replyTo: Object.assign({}, this._data) });
            this.bottomElm.visible = this.maxPage > 1;
            this.initScroll();
            this.pnlReplies.clearInnerHTML();
            this.renderReplies();
        }
        initScroll() {
            let renderedMap = {};
            const clearObservers = () => {
                this.bottomElm.visible = false;
                renderedMap = {};
                bottomObserver.unobserve(this.bottomElm);
            };
            const bottomObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting)
                        return;
                    if (this.currentPage < this.maxPage) {
                        ++this.currentPage;
                        if (!renderedMap[this.currentPage])
                            this.renderReplies();
                        renderedMap[this.currentPage] = true;
                    }
                    else {
                        clearObservers();
                    }
                });
            }, {
                root: null,
                rootMargin: "0px",
                threshold: 0.75
            });
            bottomObserver.observe(this.bottomElm);
        }
        // private renderPostFrom() {
        //   this.pnlPostFrom.clearInnerHTML();
        //   this.pnlPostFrom.visible = true;
        //   this.pnlPostFrom.appendChild(
        //     <i-hstack
        //       verticalAlignment="center"
        //       gap="12px"
        //       margin={{ bottom: '0.5rem', top: '1rem' }}
        //       width="100%"
        //     >
        //       <i-hstack stack={{ basis: '40px', shrink: '0' }} horizontalAlignment="end">
        //         <i-icon name="retweet" width={14} height={14} fill={Theme.text.primary}></i-icon>
        //       </i-hstack>
        //       <i-label
        //         font={{ size: '0.813rem', weight: 600, color: Theme.text.secondary }}
        //         caption={`${this.lblOwner.caption} reposted`}
        //         link={{ href: '#' }}
        //       ></i-label>
        //     </i-hstack>
        //   );
        // }
        paginatedList() {
            var _a;
            const replies = ((_a = this._data) === null || _a === void 0 ? void 0 : _a.replies) || [];
            return [...replies].slice((this.currentPage - 1) * numsPerPage, this.currentPage * numsPerPage);
        }
        renderReplies(data) {
            const list = data || this.paginatedList();
            const length = list.length;
            if (!length)
                return;
            this.pnlMoreLoader.visible = true;
            for (let i = 0; i < length; i++) {
                const reply = list[i];
                const replyElm = (this.$render("i-scom-thread-post", { id: reply.cid, border: {
                        bottom: {
                            width: '1px',
                            style: 'solid',
                            color: Theme.divider
                        }
                    } }));
                replyElm.onReplyClicked = this.onReplyClicked;
                if (this._theme)
                    replyElm.theme = this._theme;
                replyElm.parent = this.pnlReplies;
                replyElm.setAttribute('parent', 'true');
                this.pnlReplies.appendChild(replyElm);
                replyElm.setData({ cid: reply.cid });
            }
            this.pnlMoreLoader.visible = false;
        }
        onViewMore() {
            this.pnlStatusDetail.style.maxHeight = '';
            this.pnlStatusDetail.style.overflow = '';
            this.pnlOverlay.visible = false;
            this.btnViewMore.visible = false;
        }
        init() {
            super.init();
            this.onReplyClicked = this.getAttribute('onReplyClicked', true) || this.onReplyClicked;
            this.onReplyHandler = this.getAttribute('onReplyHandler', true) || this.onReplyHandler;
            const cid = this.getAttribute('cid', true);
            if (cid)
                this.setData(cid);
            const theme = this.getAttribute('theme', true);
            if (theme)
                this.theme = theme;
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlWrap", width: "100%", class: index_css_4.customStyles },
                this.$render("i-panel", { padding: { left: '1rem', right: '1rem' } },
                    this.$render("i-panel", { id: "pnlPostFrom", visible: false }),
                    this.$render("i-panel", { visible: false },
                        this.$render("i-hstack", { verticalAlignment: "center", gap: "12px", stack: { grow: '1' }, width: "100%" },
                            this.$render("i-panel", { stack: { basis: '40px', shrink: '0' } },
                                this.$render("i-image", { id: "imgAvatar", width: 36, height: 36, display: "block", background: { color: Theme.background.gradient }, border: { radius: '50%' }, overflow: 'hidden', stack: { shrink: '0' }, class: 'avatar' })),
                            this.$render("i-hstack", { verticalAlignment: "center", horizontalAlignment: "space-between", gap: "0.5rem", width: "100%" },
                                this.$render("i-hstack", { stack: { basis: '50%' }, verticalAlignment: "center", wrap: "wrap" },
                                    this.$render("i-label", { id: "lblOwner", class: index_css_5.labelStyle, font: { size: '1rem', weight: 700 }, margin: { right: '0.5rem' } }),
                                    this.$render("i-label", { id: "lblUsername", class: index_css_5.labelStyle, font: { size: '1rem', color: Theme.text.secondary } })),
                                this.$render("i-hstack", { stack: { basis: '50%' }, verticalAlignment: "center", horizontalAlignment: "end", gap: "0.5rem" },
                                    this.$render("i-button", { id: "btnSubcribe", minHeight: 32, padding: { left: '1rem', right: '1rem' }, background: { color: Theme.colors.secondary.main }, font: { color: Theme.colors.primary.contrastText, weight: 700, size: '0.875rem' }, border: { radius: '30px' }, caption: "Subscribe" }),
                                    this.$render("i-icon", { name: "ellipsis-h", width: 34, height: 34, fill: Theme.text.secondary, padding: { top: 8, bottom: 8, left: 8, right: 8 }, border: { radius: '50%' }, class: "hovered-icon" })))),
                        this.$render("i-panel", { id: "pnlStatusDetail", maxHeight: MAX_HEIGHT, overflow: 'hidden' },
                            this.$render("i-vstack", { id: "pnlViewerLoader", width: "100%", height: "100%", minHeight: 300, horizontalAlignment: "center", verticalAlignment: "center", padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }, visible: false },
                                this.$render("i-panel", { class: index_css_5.spinnerStyle })),
                            this.$render("i-scom-page-viewer", { id: "pageViewer" }),
                            this.$render("i-panel", { id: "pnlOverlay", visible: false, height: "5rem", width: "100%", position: "absolute", bottom: "0px", background: {
                                    color: `linear-gradient(0, var(--card-bg-color) 0%, transparent 100%)`,
                                } })),
                        this.$render("i-hstack", { id: "btnViewMore", verticalAlignment: "center", padding: { top: '1rem' }, gap: "0.5rem", visible: false, onClick: this.onViewMore },
                            this.$render("i-label", { caption: 'Read more', font: { size: '1rem', color: Theme.colors.primary.main } }),
                            this.$render("i-icon", { name: 'angle-down', width: 16, height: 16, fill: Theme.colors.primary.main })),
                        this.$render("i-hstack", { verticalAlignment: "center", gap: "4px", padding: { top: '1rem', bottom: '1rem' } },
                            this.$render("i-label", { id: "lblDate", font: { size: '1rem', color: Theme.text.secondary } }),
                            this.$render("i-label", { id: "lbViews", caption: "0", font: { size: '1rem', weight: 700 } }),
                            this.$render("i-label", { caption: "Views", font: { size: '1rem', color: Theme.text.secondary } }))),
                    this.$render("i-scom-thread-analytics", { id: "analyticEl", display: "block", border: {
                            top: { width: '1px', style: 'solid', color: Theme.divider },
                            bottom: { width: '1px', style: 'solid', color: Theme.divider },
                        } }),
                    this.$render("i-scom-thread-reply-input", { id: "inputReply" })),
                this.$render("i-panel", null,
                    this.$render("i-vstack", { id: "pnlReplies", border: { top: { width: '1px', style: 'solid', color: Theme.divider } } }),
                    this.$render("i-hstack", { id: "bottomElm", minHeight: 48, verticalAlignment: "center", horizontalAlignment: "center", border: {
                            top: { width: '1px', style: 'solid', color: Theme.divider },
                            bottom: { width: '1px', style: 'solid', color: Theme.divider },
                        } },
                        this.$render("i-label", { caption: 'Show more replies', font: { color: Theme.colors.primary.main, size: '1rem' } })),
                    this.$render("i-vstack", { id: "pnlMoreLoader", width: "100%", minHeight: 300, horizontalAlignment: "center", verticalAlignment: "center", padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }, visible: false },
                        this.$render("i-panel", { class: index_css_5.spinnerStyle })))));
        }
    };
    ScomThreadStatus = __decorate([
        (0, components_9.customElements)('i-scom-thread-status')
    ], ScomThreadStatus);
    exports.ScomThreadStatus = ScomThreadStatus;
});
define("@scom/scom-thread/commons/replyInput/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.editorStyle = void 0;
    const Theme = components_10.Styles.Theme.ThemeVars;
    exports.editorStyle = components_10.Styles.style({
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
                color: `${Theme.text.primary} !important`,
                padding: '0 0 12px !important'
            },
            '.toastui-editor-contents p': {
                color: `${Theme.text.primary} !important`
            },
            '.toastui-editor-contents .placeholder': {
                color: `${Theme.text.disabled} !important`,
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
define("@scom/scom-thread/commons/comment/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-thread/index.css.ts", "@scom/scom-thread/global/index.ts"], function (require, exports, components_11, index_css_6, index_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomThreadComment = void 0;
    const Theme = components_11.Styles.Theme.ThemeVars;
    let ScomThreadComment = class ScomThreadComment extends components_11.Module {
        constructor(parent, options) {
            super(parent, options);
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        set theme(value) {
            if (this.pageViewer)
                this.pageViewer.theme = value;
        }
        async setData(data) {
            this._data = data;
            await this.renderUI();
        }
        getData() {
            return this._data;
        }
        clear() {
            this.imgAvatar.url = '';
            this.lblOwner.caption = '';
            this.lblDate.caption = '';
            this.lblUsername.caption = '';
            this.pageViewer.setData({});
            this.lbReplyTo.caption = '';
            this.pnlReplyTo.visible = false;
        }
        async renderUI() {
            this.clear();
            const { owner = '', username, publishDate, dataUri, avatar, description } = this._data || {};
            this.lblOwner.caption = components_11.FormatUtils.truncateWalletAddress(owner);
            this.lblUsername.caption = `@${username}`;
            this.lblUsername.link.href = '';
            this.lbReplyTo.caption = `@${username}`;
            this.pnlReplyTo.visible = true;
            this.lblDate.caption = `. ${(0, index_7.getDuration)(publishDate)}`;
            this.imgAvatar.url = avatar !== null && avatar !== void 0 ? avatar : '';
            try {
                this.pnlLoader.visible = true;
                if (dataUri) {
                    await this.pageViewer.setData({ cid: dataUri + "/scconfig.json" });
                }
                else if (description) {
                    await this.pageViewer.setData((0, index_7.getDescWidgetData)(description));
                }
            }
            catch (_a) { }
            this.pnlLoader.visible = false;
            this.pageViewer.style.setProperty('--custom-background-color', 'transparent');
        }
        init() {
            super.init();
            const data = this.getAttribute('data', true);
            if (data)
                this.setData(data);
            const theme = this.getAttribute('theme', true);
            if (theme)
                this.theme = theme;
        }
        render() {
            return (this.$render("i-vstack", { width: "100%" },
                this.$render("i-hstack", { verticalAlignment: "center", wrap: "wrap", gap: "4px", width: "100%" },
                    this.$render("i-image", { id: "imgAvatar", width: 20, height: 20, display: "block", background: { color: Theme.background.gradient }, border: { radius: '50%' }, overflow: 'hidden', stack: { basis: '20px' }, class: 'avatar' }),
                    this.$render("i-label", { id: "lblOwner", class: index_css_6.labelStyle, font: { size: '1rem', weight: 700 } }),
                    this.$render("i-label", { id: "lblUsername", class: index_css_6.labelStyle, font: { size: '1rem', color: Theme.text.secondary } }),
                    this.$render("i-label", { id: "lblDate", font: { size: '0.875rem', color: Theme.text.secondary } })),
                this.$render("i-hstack", { id: "pnlReplyTo", gap: "0.5rem", verticalAlignment: "center", padding: { top: 4 } },
                    this.$render("i-label", { caption: 'Replying to', font: { size: '1rem', color: Theme.text.secondary } }),
                    this.$render("i-label", { id: "lbReplyTo", link: { href: '' }, font: { size: '1rem', color: Theme.colors.primary.main } })),
                this.$render("i-panel", { class: index_css_6.multiLineTextStyle },
                    this.$render("i-vstack", { id: "pnlLoader", width: "100%", height: "100%", minHeight: 300, horizontalAlignment: "center", verticalAlignment: "center", padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }, visible: false },
                        this.$render("i-panel", { class: index_css_6.spinnerStyle })),
                    this.$render("i-scom-page-viewer", { id: "pageViewer" }))));
        }
    };
    ScomThreadComment = __decorate([
        (0, components_11.customElements)('i-scom-thread-comment')
    ], ScomThreadComment);
    exports.ScomThreadComment = ScomThreadComment;
});
define("@scom/scom-thread/commons/replyInput/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-thread/commons/replyInput/index.css.ts"], function (require, exports, components_12, index_css_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomThreadReplyInput = void 0;
    const Theme = components_12.Styles.Theme.ThemeVars;
    let ScomThreadReplyInput = class ScomThreadReplyInput extends components_12.Module {
        get replyTo() {
            return this._data.replyTo;
        }
        set replyTo(value) {
            this._data.replyTo = value;
        }
        get type() {
            var _a;
            return (_a = this._data.type) !== null && _a !== void 0 ? _a : 'reply';
        }
        set type(value) {
            this._data.type = value !== null && value !== void 0 ? value : 'reply';
        }
        get placeholder() {
            var _a;
            return (_a = this._data.placeholder) !== null && _a !== void 0 ? _a : '';
        }
        set placeholder(value) {
            this._data.placeholder = value !== null && value !== void 0 ? value : '';
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
            if (this.quotedComment)
                this.quotedComment.theme = value;
        }
        get isQuote() {
            return this.type === 'quote';
        }
        setData(value) {
            var _a;
            this.clear();
            this._data = value;
            this.lbReplyTo.caption = `@${((_a = this.replyTo) === null || _a === void 0 ? void 0 : _a.username) || ''}`;
            this.pnlReplyTo.visible = this.isReplyToShown;
            this.imgReplier.url = ''; // TODO: user avatar
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
            this.quotedComment.visible = false;
            this.pnlBorder.border = {
                top: {
                    width: '1px',
                    style: 'none',
                    color: Theme.divider,
                }
            };
            this.btnReply.caption = 'Reply';
        }
        updateGrid() {
            if (this.isQuote) {
                this.gridReply.templateColumns = ['40px', 'auto'];
                this.gridReply.templateAreas = [
                    ['avatar', 'editor'],
                    ['avatar', 'quoted'],
                    ['avatar', 'reply'],
                ];
                this.quotedComment.visible = true;
                if (this.replyTo)
                    this.quotedComment.setData(Object.assign({}, this.replyTo));
                this.isReplyToShown = false;
            }
            else {
                if (this.isReplyToShown) {
                    this.gridReply.templateColumns = ['40px', 'auto'];
                    this.gridReply.templateAreas = [
                        ['avatar', 'editor'],
                        ['avatar', 'reply'],
                    ];
                }
                else {
                    this.gridReply.templateAreas = [['avatar', 'editor', 'reply']];
                    this.gridReply.templateColumns = ['40px', 'auto', '80px'];
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
                this.onSubmit(this.replyEditor);
        }
        _handleClick(event, stopPropagation) {
            if (this.type !== 'quote') {
                this.isReplyToShown = true;
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
            const isReplyToShown = this.getAttribute('isReplyToShown', true, false);
            this.setData({ isReplyToShown, replyTo, type });
            const theme = this.getAttribute('theme', true);
            if (theme)
                this.theme = theme;
        }
        render() {
            return (this.$render("i-panel", { padding: { bottom: 12, top: 12 } },
                this.$render("i-hstack", { id: "pnlReplyTo", visible: false, gap: "0.5rem", verticalAlignment: "center", padding: { top: 4, bottom: 12, left: 52 } },
                    this.$render("i-label", { caption: "Replying to", font: { size: '1rem', color: Theme.text.secondary } }),
                    this.$render("i-label", { id: "lbReplyTo", link: { href: '' }, font: { size: '1rem', color: Theme.colors.primary.main } })),
                this.$render("i-grid-layout", { id: "gridReply", gap: { column: 12 }, templateRows: ['auto'] },
                    this.$render("i-image", { id: "imgReplier", grid: { area: 'avatar' }, width: 40, height: 40, display: "block", background: { color: Theme.background.gradient }, border: { radius: '50%' }, overflow: 'hidden', stack: { basis: '40px' }, class: 'avatar' }),
                    this.$render("i-markdown-editor", { id: "replyEditor", width: "100%", viewer: false, hideModeSwitch: true, mode: "wysiwyg", toolbarItems: [], font: { size: '1.25rem', color: Theme.text.primary }, background: { color: 'transparent' }, height: "auto", theme: "dark", onChanged: this.onEditorChanged, class: index_css_7.editorStyle, grid: { area: 'editor' } }),
                    this.$render("i-scom-thread-comment", { id: "quotedComment", width: "100%", display: "block", border: {
                            width: '1px',
                            style: 'solid',
                            color: Theme.colors.secondary.light,
                            radius: 16,
                        }, padding: { left: '12px', right: '12px', top: '12px', bottom: '12px' }, visible: false, margin: { top: '1rem' }, grid: { area: 'quoted' } }),
                    this.$render("i-hstack", { id: "pnlBorder", horizontalAlignment: "end", grid: { area: 'reply' }, padding: { top: '12px' }, margin: { top: '1rem' } },
                        this.$render("i-button", { id: "btnReply", height: 36, padding: { left: '1rem', right: '1rem' }, background: { color: Theme.colors.primary.main }, font: { color: Theme.colors.primary.contrastText, bold: true }, border: { radius: '30px' }, enabled: false, caption: "Reply", onClick: this.onReply })))));
        }
    };
    ScomThreadReplyInput = __decorate([
        (0, components_12.customElements)('i-scom-thread-reply-input')
    ], ScomThreadReplyInput);
    exports.ScomThreadReplyInput = ScomThreadReplyInput;
});
define("@scom/scom-thread/commons/index.ts", ["require", "exports", "@scom/scom-thread/commons/analytics/index.tsx", "@scom/scom-thread/commons/post/index.tsx", "@scom/scom-thread/commons/status/index.tsx", "@scom/scom-thread/commons/replyInput/index.tsx", "@scom/scom-thread/commons/comment/index.tsx", "@scom/scom-thread/commons/toast/index.tsx"], function (require, exports, index_8, index_9, index_10, index_11, index_12, index_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScomThreadToast = exports.ScomThreadComment = exports.ScomThreadReplyInput = exports.ScomThreadStatus = exports.ScomThreadPost = exports.ScomThreadAnalytics = void 0;
    Object.defineProperty(exports, "ScomThreadAnalytics", { enumerable: true, get: function () { return index_8.ScomThreadAnalytics; } });
    Object.defineProperty(exports, "ScomThreadPost", { enumerable: true, get: function () { return index_9.ScomThreadPost; } });
    Object.defineProperty(exports, "ScomThreadStatus", { enumerable: true, get: function () { return index_10.ScomThreadStatus; } });
    Object.defineProperty(exports, "ScomThreadReplyInput", { enumerable: true, get: function () { return index_11.ScomThreadReplyInput; } });
    Object.defineProperty(exports, "ScomThreadComment", { enumerable: true, get: function () { return index_12.ScomThreadComment; } });
    Object.defineProperty(exports, "ScomThreadToast", { enumerable: true, get: function () { return index_13.ScomThreadToast; } });
});
define("@scom/scom-thread", ["require", "exports", "@ijstech/components", "@scom/scom-thread/index.css.ts", "@scom/scom-thread/data.json.ts", "@scom/scom-thread/store/index.ts", "@scom/scom-thread/global/index.ts"], function (require, exports, components_13, index_css_8, data_json_1, index_14, index_15) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_13.Styles.Theme.ThemeVars;
    const defaultColors = {
        light: {
            fontColor: 'rgba(15,20,25,1.00)',
            secondaryColor: 'rgb(83, 100, 113)',
            backgroundColor: '#fff',
            inputFontColor: 'rgba(15,20,25,1.00)',
            inputBackgroundColor: '#fff',
            primaryColor: 'rgb(29, 155, 240)',
            primaryBackground: 'rgba(29, 155, 240, 0.1)',
            successColor: 'rgb(0, 186, 124)',
            successBackground: 'rgba(0, 186, 124, 0.1)',
            errorColor: 'rgb(249, 24, 128)',
            errorBackground: 'rgba(249, 24, 128, 0.1)',
            subcribeButtonBackground: 'rgb(15, 20, 25)',
            placeholderColor: '#536471',
            hoverBackgroundColor: 'rgba(0, 0, 0, 0.03)',
            groupBorderColor: 'rgb(207, 217, 222)',
            borderColor: 'rgb(239, 243, 244)'
        },
        dark: {}
    };
    let ScomThread = class ScomThread extends components_13.Module {
        ;
        constructor(parent, options) {
            super(parent, options);
            this.tag = {
                light: {},
                dark: {}
            };
            if (data_json_1.default)
                (0, index_14.setDataFromJson)(data_json_1.default);
            this.onShowReplyMd = this.onShowReplyMd.bind(this);
            this.onPost = this.onPost.bind(this);
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
            this._data.theme = value !== null && value !== void 0 ? value : 'light';
        }
        get theme() {
            var _a;
            return (_a = this._data.theme) !== null && _a !== void 0 ? _a : 'light';
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
            this.threadPost.clear();
            this.inputPost.clear();
        }
        async renderUI() {
            this.clear();
            this.threadPost.theme = this.theme;
            this.mainStatus.theme = this.theme;
            this.inputPost.theme = this.theme;
            this.threadPost.onReplyClicked = this.onShowReplyMd;
            this.mainStatus.onReplyClicked = this.onShowReplyMd;
            this.mainStatus.onReplyHandler = this.onPost;
            await this.mainStatus.setData(this.cid);
        }
        onClosedReplyMd() {
            this.mdReply.visible = false;
        }
        async onShowReplyMd(data) {
            const { cid, type, postData } = data;
            const isQuote = type === 'quote';
            if (isQuote) {
                this.threadPost.visible = false;
                this.inputPost.setData({ replyTo: postData, isReplyToShown: false, placeholder: 'Add a comment', type });
            }
            else {
                await this.threadPost.setData({ showAnalytics: false, cid, type });
                const replyTo = this.threadPost.getData();
                this.threadPost.visible = true;
                this.inputPost.setData({ replyTo, isReplyToShown: true, placeholder: 'Post your reply', type });
            }
            this.mdReply.refresh();
            this.mdReply.visible = true;
        }
        onReplySubmit(target) {
            this.onPost({ cid: this.threadPost.cid, content: target.getMarkdownValue() });
        }
        onPost(data) {
            console.log('Reply: ', data.cid, ', ', data.content);
        }
        getConfigurators() {
            const self = this;
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: () => {
                        const builderSchema = (0, index_15.getBuilderSchema)();
                        const dataSchema = builderSchema.dataSchema;
                        const uiSchema = builderSchema.uiSchema;
                        return this._getActions(dataSchema, uiSchema);
                    },
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                },
                {
                    name: 'Emdedder Configurator',
                    target: 'Embedders',
                    getActions: () => {
                        const embedderSchema = (0, index_15.getEmbedderSchema)();
                        const dataSchema = embedderSchema.dataSchema;
                        const uiSchema = embedderSchema.uiSchema;
                        return this._getActions(dataSchema, uiSchema);
                    },
                    getLinkParams: () => {
                        const data = this._data || {};
                        return {
                            data: window.btoa(JSON.stringify(data))
                        };
                    },
                    setLinkParams: async (params) => {
                        if (params.data) {
                            const utf8String = decodeURIComponent(params.data);
                            const decodedString = window.atob(utf8String);
                            const newData = JSON.parse(decodedString);
                            let resultingData = Object.assign(Object.assign({}, self._data), newData);
                            await this.setData(resultingData);
                        }
                    },
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                }
            ];
        }
        _getActions(dataSchema, uiSchema) {
            const actions = [
                {
                    name: 'Edit',
                    icon: 'edit',
                    command: (builder, userInputData) => {
                        let oldData = { cid: '' };
                        let oldTag = {};
                        return {
                            execute: async () => {
                                oldData = JSON.parse(JSON.stringify(this._data));
                                const { cid, theme } = userInputData, themeSettings = __rest(userInputData, ["cid", "theme"]);
                                const newData = { cid, theme };
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(newData);
                                this.setData(newData);
                                oldTag = JSON.parse(JSON.stringify(this.tag));
                                if (builder === null || builder === void 0 ? void 0 : builder.setTag)
                                    builder.setTag(themeSettings);
                                else
                                    this.setTag(themeSettings);
                            },
                            undo: () => {
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(oldData);
                                this.setData(oldData);
                                this.tag = JSON.parse(JSON.stringify(oldTag));
                                if (builder === null || builder === void 0 ? void 0 : builder.setTag)
                                    builder.setTag(this.tag);
                                else
                                    this.setTag(this.tag);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: dataSchema,
                    userInputUISchema: uiSchema
                }
            ];
            return actions;
        }
        async getTag() {
            return this.tag;
        }
        updateTag(type, value) {
            var _a;
            this.tag[type] = (_a = this.tag[type]) !== null && _a !== void 0 ? _a : {};
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    this.tag[type][prop] = value[prop];
            }
        }
        async setTag(value) {
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    if (prop === 'light' || prop === 'dark')
                        this.updateTag(prop, newValue[prop]);
                    else
                        this.tag[prop] = newValue[prop];
                }
            }
            this.updateTheme();
        }
        updateStyle(name, value) {
            value ?
                this.style.setProperty(name, value) :
                this.style.removeProperty(name);
        }
        updateTheme() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
            const themeVar = this.theme || document.body.style.getPropertyValue('--theme');
            this.updateStyle('--text-primary', (_a = this.tag[themeVar]) === null || _a === void 0 ? void 0 : _a.fontColor);
            this.updateStyle('--text-secondary', (_b = this.tag[themeVar]) === null || _b === void 0 ? void 0 : _b.secondaryColor);
            this.updateStyle('--background-main', (_c = this.tag[themeVar]) === null || _c === void 0 ? void 0 : _c.backgroundColor);
            this.updateStyle('--background-modal', (_d = this.tag[themeVar]) === null || _d === void 0 ? void 0 : _d.backgroundColor);
            this.updateStyle('--input-font_color', (_e = this.tag[themeVar]) === null || _e === void 0 ? void 0 : _e.inputFontColor);
            this.updateStyle('--input-background', (_f = this.tag[themeVar]) === null || _f === void 0 ? void 0 : _f.inputBackgroundColor);
            this.updateStyle('--colors-primary-main', (_g = this.tag[themeVar]) === null || _g === void 0 ? void 0 : _g.primaryColor);
            this.updateStyle('--colors-primary-light', (_h = this.tag[themeVar]) === null || _h === void 0 ? void 0 : _h.primaryBackground);
            this.updateStyle('--colors-success-main', (_j = this.tag[themeVar]) === null || _j === void 0 ? void 0 : _j.successColor);
            this.updateStyle('--colors-success-light', (_k = this.tag[themeVar]) === null || _k === void 0 ? void 0 : _k.successBackground);
            this.updateStyle('--colors-error-main', (_l = this.tag[themeVar]) === null || _l === void 0 ? void 0 : _l.errorColor);
            this.updateStyle('--colors-error-light', (_m = this.tag[themeVar]) === null || _m === void 0 ? void 0 : _m.errorBackground);
            this.updateStyle('--colors-secondary-main', (_o = this.tag[themeVar]) === null || _o === void 0 ? void 0 : _o.subcribeButtonBackground);
            this.updateStyle('--action-hover', (_p = this.tag[themeVar]) === null || _p === void 0 ? void 0 : _p.hoverBackgroundColor);
            this.updateStyle('--divider', (_q = this.tag[themeVar]) === null || _q === void 0 ? void 0 : _q.borderColor);
            this.updateStyle('--colors-secondary-light', (_r = this.tag[themeVar]) === null || _r === void 0 ? void 0 : _r.groupBorderColor);
            this.updateStyle('--text-disabled', (_s = this.tag[themeVar]) === null || _s === void 0 ? void 0 : _s.placeholderColor);
        }
        init() {
            super.init();
            const cid = this.getAttribute('cid', true);
            const theme = this.getAttribute('theme', true);
            this.setData({ cid, theme });
            this.style.setProperty('--card-bg-color', `color-mix(in srgb, ${Theme.background.main}, #fff 3%)`);
            this.setTag(JSON.parse(JSON.stringify(defaultColors)));
        }
        render() {
            return (this.$render("i-vstack", { width: "100%", maxWidth: 600, margin: { left: 'auto', right: 'auto' }, background: { color: Theme.background.main }, border: { width: '1px', style: 'solid', color: Theme.divider }, padding: { bottom: '1rem' }, class: index_css_8.customStyles },
                this.$render("i-panel", null,
                    this.$render("i-scom-thread-status", { id: "mainStatus" })),
                this.$render("i-modal", { id: "mdReply", border: { radius: '1rem' }, maxWidth: '600px', class: index_css_8.modalStyle, mediaQueries: [
                        {
                            maxWidth: '767px',
                            properties: {
                                showBackdrop: true,
                                popupPlacement: 'top',
                                position: 'fixed',
                                maxWidth: '100%',
                                height: '100%',
                                width: '100%',
                                border: { radius: '0px' }
                            }
                        }
                    ] },
                    this.$render("i-vstack", null,
                        this.$render("i-hstack", { verticalAlignment: "center", minHeight: 53 },
                            this.$render("i-icon", { name: "times", width: 20, height: 20, class: "pointer", onClick: this.onClosedReplyMd })),
                        this.$render("i-grid-layout", { id: "gridReply", width: "100%", templateColumns: ['auto'] },
                            this.$render("i-scom-thread-post", { id: "threadPost", display: 'block' }),
                            this.$render("i-scom-thread-reply-input", { id: "inputPost", onSubmit: this.onReplySubmit }))))));
        }
    };
    ScomThread = __decorate([
        (0, components_13.customElements)('i-scom-thread')
    ], ScomThread);
    exports.default = ScomThread;
});
