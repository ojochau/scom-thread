/// <amd-module name="@scom/scom-thread/index.css.ts" />
declare module "@scom/scom-thread/index.css.ts" {
    export const spinnerStyle: string;
    export const multiLineTextStyle: string;
    export const containerStyles: string;
    export const customStyles: string;
}
/// <amd-module name="@scom/scom-thread/interface.ts" />
declare module "@scom/scom-thread/interface.ts" {
    import { Control, IconName, Markdown } from "@ijstech/components";
    export interface IThread {
        cid: string;
        theme?: Markdown['theme'];
    }
    export interface IPostAnalytics {
        reply: string | number;
        repost: string | number;
        vote: string | number;
        bookmark: string | number;
        view: string | number;
    }
    export interface IPostData {
        username: string;
        owner?: string;
        description?: string;
        dataUri?: string;
        publishDate?: number;
        avatar?: string;
        replies?: IReply[];
        analytics?: IPostAnalytics;
    }
    export interface IReply {
        cid: string;
    }
    export interface IAnalytic {
        name: string;
        value?: number | string;
        icon?: IconName;
        class?: string;
        onRender?: () => Control;
        onClick?: () => void;
    }
    export enum ReplyType {
        REPLY = "reply",
        QUOTE = "quote"
    }
    export type onReplyClickedCallback = (data: {
        cid: string;
        type: ReplyType;
        postData?: IPostData;
    }) => void;
    export type onReplyHandlerCallback = (data: {
        cid: string;
        content: string;
    }) => void;
}
/// <amd-module name="@scom/scom-thread/data.json.ts" />
declare module "@scom/scom-thread/data.json.ts" {
    const _default: {
        ipfsGatewayUrl: string;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-thread/store/index.ts" />
declare module "@scom/scom-thread/store/index.ts" {
    export type Mode = 'production' | 'development';
    export const state: {
        ipfsGatewayUrl: string;
        mode: Mode;
        user: any;
    };
    export const setMode: (mode: Mode) => void;
    export const getMode: () => Mode;
    export const setDataFromJson: (options: any) => void;
    export const setIPFSGatewayUrl: (url: string) => void;
    export const getIPFSGatewayUrl: () => string;
    export const setUser: (data: any) => void;
    export const getUser: () => any;
    export const getUserActions: (cid: string) => any;
    export const setUserActions: (cid: string, value: any) => void;
}
/// <amd-module name="@scom/scom-thread/global/utils.ts" />
declare module "@scom/scom-thread/global/utils.ts" {
    const getImageIpfsUrl: (url: string) => string;
    const formatNumber: (value: number | string, decimal?: number) => string;
    const getDuration: (date: number) => string;
    export { getImageIpfsUrl, formatNumber, getDuration };
}
/// <amd-module name="@scom/scom-thread/global/localData/comment.ts" />
declare module "@scom/scom-thread/global/localData/comment.ts" {
    export const getLocalWidget: (description: string) => {
        sections: {
            id: string;
            row: number;
            elements: {
                id: string;
                column: number;
                columnSpan: number;
                properties: {
                    content: string;
                };
                module: {
                    name: string;
                    path: string;
                    category: string;
                    imgUrl: string;
                };
                tag: {
                    width: string;
                    height: number;
                    pt: number;
                    pb: number;
                    pl: number;
                    pr: number;
                };
            }[];
            config: {
                backgroundColor: string;
                margin: {
                    x: string;
                    y: string;
                };
                sectionWidth: number;
                textColor: string;
                customBackdrop: boolean;
                backdropColor: string;
                padding: {
                    bottom: number;
                    left: number;
                    right: number;
                    top: number;
                };
                fullWidth: boolean;
                customBackgroundColor: boolean;
                customTextColor: boolean;
                customTextSize: boolean;
                textSize: string;
                border: boolean;
                borderColor: string;
            };
        }[];
        footer: {
            image: string;
            elements: any[];
        };
        config: {
            sectionWidth: number;
            margin: {
                x: string;
                y: string;
            };
        };
    };
}
/// <amd-module name="@scom/scom-thread/global/localData/status.json.ts" />
declare module "@scom/scom-thread/global/localData/status.json.ts" {
    const _default_1: {
        1: {
            username: string;
            description: string;
            owner: string;
            avatar: string;
            publishDate: number;
            analytics: {
                reply: number;
                repost: number;
                vote: number;
                bookmark: number;
                view: number;
            };
            replies: {
                cid: number;
            }[];
        };
        2: {
            username: string;
            owner: string;
            description: string;
            avatar: string;
            publishDate: number;
            analytics: {
                reply: number;
                repost: number;
                vote: number;
                bookmark: number;
                view: number;
            };
            replies: {
                cid: number;
            }[];
        };
        3: {
            username: string;
            description: string;
            owner: string;
            avatar: string;
            publishDate: number;
            analytics: {
                reply: number;
                repost: number;
                vote: number;
                bookmark: number;
                view: number;
            };
            replies: {
                cid: number;
            }[];
        };
        4: {
            username: string;
            description: string;
            owner: string;
            avatar: string;
            publishDate: number;
            analytics: {
                reply: number;
                repost: number;
                vote: number;
                bookmark: number;
                view: number;
            };
        };
        5: {
            username: string;
            description: string;
            owner: string;
            avatar: string;
            publishDate: number;
            analytics: {
                reply: number;
                repost: number;
                vote: number;
                bookmark: number;
                view: number;
            };
            replies: any[];
        };
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-thread/global/API.ts" />
declare module "@scom/scom-thread/global/API.ts" {
    const fetchDataByCid: (cid: string) => Promise<any>;
    const getDescWidgetData: (content: string) => any;
    const getWidgetData: (dataUri: string) => Promise<any>;
    export { fetchDataByCid, getWidgetData, getDescWidgetData };
}
/// <amd-module name="@scom/scom-thread/global/schemas.ts" />
declare module "@scom/scom-thread/global/schemas.ts" {
    export function getBuilderSchema(): {
        dataSchema: {
            type: string;
            required: string[];
            properties: {
                cid: {
                    type: string;
                };
                theme: {
                    type: string;
                    default: string;
                    enum: string[];
                };
                dark: {
                    type: string;
                    properties: {
                        backgroundColor: {
                            type: string;
                            format: string;
                        };
                        fontColor: {
                            type: string;
                            format: string;
                        };
                        inputBackgroundColor: {
                            type: string;
                            format: string;
                        };
                        inputFontColor: {
                            type: string;
                            format: string;
                        };
                        infoColor: {
                            type: string;
                            format: string;
                        };
                        infoBackground: {
                            type: string;
                            format: string;
                        };
                        successColor: {
                            type: string;
                            format: string;
                        };
                        successBackground: {
                            type: string;
                            format: string;
                        };
                        errorColor: {
                            type: string;
                            format: string;
                        };
                        errorBackground: {
                            type: string;
                            format: string;
                        };
                        subcribeButtonBackground: {
                            type: string;
                            format: string;
                        };
                        placeholderColor: {
                            type: string;
                            format: string;
                        };
                        hoverBackgroundColor: {
                            type: string;
                            format: string;
                        };
                        groupBorderColor: {
                            type: string;
                            format: string;
                        };
                        borderColor: {
                            type: string;
                            format: string;
                        };
                        secondaryColor: {
                            type: string;
                            format: string;
                        };
                    };
                };
                light: {
                    type: string;
                    properties: {
                        backgroundColor: {
                            type: string;
                            format: string;
                        };
                        fontColor: {
                            type: string;
                            format: string;
                        };
                        inputBackgroundColor: {
                            type: string;
                            format: string;
                        };
                        inputFontColor: {
                            type: string;
                            format: string;
                        };
                        infoColor: {
                            type: string;
                            format: string;
                        };
                        infoBackground: {
                            type: string;
                            format: string;
                        };
                        successColor: {
                            type: string;
                            format: string;
                        };
                        successBackground: {
                            type: string;
                            format: string;
                        };
                        errorColor: {
                            type: string;
                            format: string;
                        };
                        errorBackground: {
                            type: string;
                            format: string;
                        };
                        subcribeButtonBackground: {
                            type: string;
                            format: string;
                        };
                        placeholderColor: {
                            type: string;
                            format: string;
                        };
                        hoverBackgroundColor: {
                            type: string;
                            format: string;
                        };
                        groupBorderColor: {
                            type: string;
                            format: string;
                        };
                        borderColor: {
                            type: string;
                            format: string;
                        };
                        secondaryColor: {
                            type: string;
                            format: string;
                        };
                    };
                };
            };
        };
        uiSchema: {
            type: string;
            elements: ({
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        label: string;
                        elements: {
                            type: string;
                            elements: {
                                type: string;
                                scope: string;
                            }[];
                        }[];
                    }[];
                }[];
            } | {
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                    }[];
                }[];
            })[];
        };
    };
    export function getEmbedderSchema(): {
        dataSchema: {
            type: string;
            properties: {
                cid: {
                    type: string;
                    required: boolean;
                };
                dark: {
                    type: string;
                    properties: {
                        backgroundColor: {
                            type: string;
                            format: string;
                        };
                        fontColor: {
                            type: string;
                            format: string;
                        };
                        inputBackgroundColor: {
                            type: string;
                            format: string;
                        };
                        inputFontColor: {
                            type: string;
                            format: string;
                        };
                        infoColor: {
                            type: string;
                            format: string;
                        };
                        infoBackground: {
                            type: string;
                            format: string;
                        };
                        successColor: {
                            type: string;
                            format: string;
                        };
                        successBackground: {
                            type: string;
                            format: string;
                        };
                        errorColor: {
                            type: string;
                            format: string;
                        };
                        errorBackground: {
                            type: string;
                            format: string;
                        };
                        subcribeButtonBackground: {
                            type: string;
                            format: string;
                        };
                        placeholderColor: {
                            type: string;
                            format: string;
                        };
                        hoverBackgroundColor: {
                            type: string;
                            format: string;
                        };
                        groupBorderColor: {
                            type: string;
                            format: string;
                        };
                        borderColor: {
                            type: string;
                            format: string;
                        };
                        secondaryColor: {
                            type: string;
                            format: string;
                        };
                    };
                };
                light: {
                    type: string;
                    properties: {
                        backgroundColor: {
                            type: string;
                            format: string;
                        };
                        fontColor: {
                            type: string;
                            format: string;
                        };
                        inputBackgroundColor: {
                            type: string;
                            format: string;
                        };
                        inputFontColor: {
                            type: string;
                            format: string;
                        };
                        infoColor: {
                            type: string;
                            format: string;
                        };
                        infoBackground: {
                            type: string;
                            format: string;
                        };
                        successColor: {
                            type: string;
                            format: string;
                        };
                        successBackground: {
                            type: string;
                            format: string;
                        };
                        errorColor: {
                            type: string;
                            format: string;
                        };
                        errorBackground: {
                            type: string;
                            format: string;
                        };
                        subcribeButtonBackground: {
                            type: string;
                            format: string;
                        };
                        placeholderColor: {
                            type: string;
                            format: string;
                        };
                        hoverBackgroundColor: {
                            type: string;
                            format: string;
                        };
                        groupBorderColor: {
                            type: string;
                            format: string;
                        };
                        borderColor: {
                            type: string;
                            format: string;
                        };
                        secondaryColor: {
                            type: string;
                            format: string;
                        };
                    };
                };
            };
        };
        uiSchema: {
            type: string;
            elements: ({
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        label: string;
                        elements: {
                            type: string;
                            elements: {
                                type: string;
                                scope: string;
                            }[];
                        }[];
                    }[];
                }[];
            } | {
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                    }[];
                }[];
            })[];
        };
    };
}
/// <amd-module name="@scom/scom-thread/global/index.ts" />
declare module "@scom/scom-thread/global/index.ts" {
    export * from "@scom/scom-thread/global/utils.ts";
    export * from "@scom/scom-thread/global/API.ts";
    export * from "@scom/scom-thread/global/schemas.ts";
}
/// <amd-module name="@scom/scom-thread/commons/analytics/index.css.ts" />
declare module "@scom/scom-thread/commons/analytics/index.css.ts" {
    export const analyticStyle: string;
}
/// <amd-module name="@scom/scom-thread/commons/toast/index.tsx" />
declare module "@scom/scom-thread/commons/toast/index.tsx" {
    import { ControlElement, Module } from '@ijstech/components';
    interface IButtonElement extends ControlElement {
        caption: string;
    }
    interface IToast {
        message: string;
        buttons?: IButtonElement[];
    }
    interface ScomThreadToastElement extends ControlElement {
        message?: string;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-thread-toast']: ScomThreadToastElement;
            }
        }
    }
    export class ScomThreadToast extends Module {
        private mdAlert;
        private lbAlert;
        private btnAlert;
        private pnlButtons;
        private _data;
        private timer;
        set message(value: string);
        get message(): string;
        set buttons(value: IButtonElement[]);
        get buttons(): IButtonElement[];
        setData(value: IToast): Promise<void>;
        getData(): IToast;
        toast(): void;
        disconnectedCallback(): void;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-thread/commons/analytics/index.tsx" />
declare module "@scom/scom-thread/commons/analytics/index.tsx" {
    import { ControlElement, Module } from '@ijstech/components';
    import { IPostAnalytics, ReplyType } from "@scom/scom-thread/interface.ts";
    interface IAnalyticsConfig extends IPostAnalytics {
        cid: string;
        isBookmarkShown?: boolean;
    }
    interface ScomThreadAnalyticsElement extends ControlElement {
        data?: IAnalyticsConfig;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-thread-analytics']: ScomThreadAnalyticsElement;
            }
        }
    }
    export class ScomThreadAnalytics extends Module {
        private mdShare;
        private mdRepost;
        private toastElm;
        private lbReply;
        private lbRepost;
        private lbVote;
        private lbView;
        private lbBookmark;
        private iconBookmark;
        private pnlView;
        private pnlBookmark;
        private _data;
        private userActions;
        onReplyClicked: (type: ReplyType) => void;
        setData(value: IAnalyticsConfig): void;
        getData(): any[] | IAnalyticsConfig;
        private renderUI;
        private onShowModal;
        private onCloseModal;
        private removeShow;
        private onHandleReply;
        private onHandleVote;
        private onHandleBookmark;
        private onCopyLink;
        init(): void;
        render(): void;
    }
}
/// <amd-module name="@scom/scom-thread/commons/post/index.css.ts" />
declare module "@scom/scom-thread/commons/post/index.css.ts" {
    export const customStyles: string;
}
/// <amd-module name="@scom/scom-thread/commons/post/index.tsx" />
declare module "@scom/scom-thread/commons/post/index.tsx" {
    import { ControlElement, Module, Container, Markdown } from '@ijstech/components';
    import { IPostData, onReplyClickedCallback, onReplyHandlerCallback } from "@scom/scom-thread/interface.ts";
    type IPostType = 'reply' | 'post';
    interface ScomThreadPostElement extends ControlElement {
        cid?: string;
        type?: IPostType;
        showAnalytics?: boolean;
        theme?: Markdown["theme"];
        onReplyClicked?: onReplyClickedCallback;
        onReplyHandler?: onReplyHandlerCallback;
    }
    interface IPostConfig {
        cid: string;
        type?: IPostType;
        showAnalytics?: boolean;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-thread-post']: ScomThreadPostElement;
            }
        }
    }
    export class ScomThreadPost extends Module {
        private imgAvatar;
        private lblOwner;
        private lblUsername;
        private pnlLoader;
        private lblDate;
        private pageViewer;
        private analyticEl;
        private pnlAvatar;
        private pnlMore;
        private gridPost;
        private btnViewMore;
        private pnlStatusDetail;
        private pnlOverlay;
        private pnlAvatarBd;
        private _data;
        private _theme;
        private _config;
        onReplyClicked: onReplyClickedCallback;
        constructor(parent?: Container, options?: any);
        static create(options?: ScomThreadPostElement, parent?: Container): Promise<ScomThreadPost>;
        get cid(): string;
        set cid(value: string);
        get type(): IPostType;
        set type(value: IPostType);
        get showAnalytics(): boolean;
        set showAnalytics(value: boolean);
        set theme(value: Markdown["theme"]);
        setData(data: IPostConfig): Promise<void>;
        getData(): IPostData;
        private get isReply();
        private fetchData;
        clear(): void;
        private renderUI;
        private onShowMore;
        private renderReplies;
        private onViewMore;
        init(): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-thread/commons/status/index.css.ts" />
declare module "@scom/scom-thread/commons/status/index.css.ts" {
    export const customStyles: string;
}
/// <amd-module name="@scom/scom-thread/commons/status/index.tsx" />
declare module "@scom/scom-thread/commons/status/index.tsx" {
    import { ControlElement, Module, Container, Markdown } from '@ijstech/components';
    import { IPostData, onReplyClickedCallback, onReplyHandlerCallback } from "@scom/scom-thread/interface.ts";
    interface ScomThreadStatusElement extends ControlElement {
        cid?: string;
        theme?: Markdown["theme"];
        onReplyClicked?: onReplyClickedCallback;
        onReplyHandler?: onReplyHandlerCallback;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-thread-status']: ScomThreadStatusElement;
            }
        }
    }
    export class ScomThreadStatus extends Module {
        private imgAvatar;
        private lblOwner;
        private lblDate;
        private lblUsername;
        private lbViews;
        private bottomElm;
        private analyticEl;
        private pnlReplies;
        private pnlMoreLoader;
        private inputReply;
        private btnViewMore;
        private pnlStatusDetail;
        private pnlOverlay;
        private _data;
        private _cid;
        private _theme;
        private currentPage;
        onReplyClicked: onReplyClickedCallback;
        onReplyHandler: onReplyHandlerCallback;
        constructor(parent?: Container, options?: any);
        static create(options?: ScomThreadStatusElement, parent?: Container): Promise<ScomThreadStatus>;
        get cid(): string;
        set cid(value: string);
        set theme(value: Markdown['theme']);
        private get replies();
        private get maxPage();
        setData(cid: string): Promise<void>;
        getData(): IPostData;
        private fetchData;
        clear(): void;
        private renderUI;
        private initScroll;
        private paginatedList;
        private renderReplies;
        private onViewMore;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-thread/commons/comment/index.tsx" />
declare module "@scom/scom-thread/commons/comment/index.tsx" {
    import { ControlElement, Module, Container, Markdown } from '@ijstech/components';
    import { IPostData } from "@scom/scom-thread/interface.ts";
    interface ScomThreadCommentElement extends ControlElement {
        data?: IPostData;
        theme?: Markdown["theme"];
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-thread-comment']: ScomThreadCommentElement;
            }
        }
    }
    export class ScomThreadComment extends Module {
        private imgAvatar;
        private lblOwner;
        private lblDate;
        private lblUsername;
        private pnlLoader;
        private pageViewer;
        private lbReplyTo;
        private pnlReplyTo;
        private _data;
        constructor(parent?: Container, options?: any);
        static create(options?: ScomThreadCommentElement, parent?: Container): Promise<ScomThreadComment>;
        set theme(value: Markdown['theme']);
        setData(data: IPostData): Promise<void>;
        getData(): IPostData;
        clear(): void;
        private renderUI;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-thread/commons/replyInput/index.tsx" />
declare module "@scom/scom-thread/commons/replyInput/index.tsx" {
    import { ControlElement, Module, Markdown, MarkdownEditor } from '@ijstech/components';
    import { IPostData } from "@scom/scom-thread/interface.ts";
    type IReplyType = 'reply' | 'quote';
    interface ScomThreadReplyInputElement extends ControlElement {
        replyTo?: IPostData;
        isReplyToShown?: boolean;
        type?: IReplyType;
        theme?: Markdown['theme'];
        placeholder?: string;
        onChanged?: (target: MarkdownEditor) => void;
        onSubmit?: (target: MarkdownEditor) => void;
    }
    interface IReplyInput {
        replyTo?: IPostData;
        isReplyToShown?: boolean;
        type?: IReplyType;
        placeholder?: string;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-thread-reply-input']: ScomThreadReplyInputElement;
            }
        }
    }
    export class ScomThreadReplyInput extends Module {
        private lbReplyTo;
        private replyEditor;
        private btnReply;
        private pnlReplyTo;
        private gridReply;
        private imgReplier;
        private pnlBorder;
        private quotedComment;
        private _data;
        onChanged: (target: MarkdownEditor) => void;
        onSubmit: (target: MarkdownEditor) => void;
        get replyTo(): IPostData;
        set replyTo(value: IPostData);
        get type(): IReplyType;
        set type(value: IReplyType);
        get placeholder(): string;
        set placeholder(value: string);
        get isReplyToShown(): boolean;
        set isReplyToShown(value: boolean);
        set theme(value: Markdown['theme']);
        private get isQuote();
        setData(value: IReplyInput): void;
        clear(): void;
        private updateGrid;
        private onEditorChanged;
        private onReply;
        protected _handleClick(event: MouseEvent, stopPropagation?: boolean): boolean;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-thread/commons/index.ts" />
declare module "@scom/scom-thread/commons/index.ts" {
    export { ScomThreadAnalytics } from "@scom/scom-thread/commons/analytics/index.tsx";
    export { ScomThreadPost } from "@scom/scom-thread/commons/post/index.tsx";
    export { ScomThreadStatus } from "@scom/scom-thread/commons/status/index.tsx";
    export { ScomThreadReplyInput } from "@scom/scom-thread/commons/replyInput/index.tsx";
    export { ScomThreadComment } from "@scom/scom-thread/commons/comment/index.tsx";
    export { ScomThreadToast } from "@scom/scom-thread/commons/toast/index.tsx";
}
/// <amd-module name="@scom/scom-thread" />
declare module "@scom/scom-thread" {
    import { ControlElement, Module, Container, Markdown, IDataSchema, IUISchema } from '@ijstech/components';
    interface ScomThreadElement extends ControlElement {
        cid?: string;
        theme?: Markdown["theme"];
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-thread']: ScomThreadElement;
            }
        }
    }
    export default class ScomThread extends Module {
        private mdReply;
        private threadPost;
        private mainStatus;
        private inputPost;
        private _data;
        tag: {
            light: {};
            dark: {};
        };
        constructor(parent?: Container, options?: any);
        static create(options?: ScomThreadElement, parent?: Container): Promise<ScomThread>;
        get cid(): string;
        set cid(value: string);
        set theme(value: Markdown["theme"]);
        get theme(): Markdown["theme"];
        private setData;
        private getData;
        private clear;
        private renderUI;
        private onClosedReplyMd;
        private onShowReplyMd;
        private onReplySubmit;
        private onPost;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema: IUISchema;
            }[];
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
            getLinkParams?: undefined;
            setLinkParams?: undefined;
        } | {
            name: string;
            target: string;
            getActions: () => {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema: IUISchema;
            }[];
            getLinkParams: () => {
                data: string;
            };
            setLinkParams: (params: any) => Promise<void>;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        })[];
        private _getActions;
        private getTag;
        private updateTag;
        private setTag;
        private updateStyle;
        private updateTheme;
        init(): void;
        render(): any;
    }
}
