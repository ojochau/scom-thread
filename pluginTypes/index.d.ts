/// <amd-module name="@scom/scom-thread/index.css.ts" />
declare module "@scom/scom-thread/index.css.ts" {
    export const spinnerStyle: string;
    export const labelStyle: string;
    export const multiLineTextStyle: string;
    export const customStyles: string;
    export const modalStyle: string;
}
/// <amd-module name="@scom/scom-thread/interface.ts" />
declare module "@scom/scom-thread/interface.ts" {
    import { Control, IconName } from "@ijstech/components";
    export interface IThread {
        cid: string;
    }
    interface IPostAnalytics {
        reply: string | number;
        repost: string | number;
        like: string | number;
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
    export const state: {
        ipfsGatewayUrl: string;
    };
    export const setDataFromJson: (options: any) => void;
    export const setIPFSGatewayUrl: (url: string) => void;
    export const getIPFSGatewayUrl: () => string;
}
/// <amd-module name="@scom/scom-thread/global/utils.ts" />
declare module "@scom/scom-thread/global/utils.ts" {
    const getImageIpfsUrl: (url: string) => string;
    const formatNumber: (value: number | string, decimal?: number) => string;
    const getDuration: (date: number) => string;
    export { getImageIpfsUrl, formatNumber, getDuration };
}
/// <amd-module name="@scom/scom-thread/global/localData/data.json.ts" />
declare module "@scom/scom-thread/global/localData/data.json.ts" {
    const _default_1: {
        username: string;
        description: string;
        dataUri: string;
        owner: string;
        avatar: string;
        publishDate: number;
        analytics: {
            reply: number;
            repost: number;
            like: number;
            bookmark: number;
            view: number;
        };
        replies: {
            cid: string;
        }[];
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-thread/global/localData/scconfig.json.ts" />
declare module "@scom/scom-thread/global/localData/scconfig.json.ts" {
    const _default_2: {
        sections: {
            id: string;
            row: number;
            name: string;
            elements: {
                id: string;
                column: number;
                columnSpan: number;
                properties: {
                    content: string;
                };
                module: {};
                tag: {
                    pt: string;
                    pb: string;
                };
                elements: ({
                    id: string;
                    column: number;
                    columnSpan: number;
                    properties: {
                        content: string;
                        title?: undefined;
                        description?: undefined;
                        linkUrl?: undefined;
                        isExternal?: undefined;
                        backgroundImageUrl?: undefined;
                        userName?: undefined;
                        avatar?: undefined;
                    };
                    module: {
                        name: string;
                        path: string;
                        category: string;
                        imgUrl: string;
                        disableClicked?: undefined;
                    };
                    tag: {
                        width: string;
                        height: number;
                        pt: string;
                        pb: string;
                        titleFontColor?: undefined;
                        descriptionFontColor?: undefined;
                        linkTextColor?: undefined;
                        dateColor?: undefined;
                        userNameColor?: undefined;
                        backgroundColor?: undefined;
                    };
                } | {
                    id: string;
                    column: number;
                    columnSpan: number;
                    properties: {
                        title: string;
                        description: string;
                        linkUrl: string;
                        isExternal: boolean;
                        backgroundImageUrl: string;
                        userName: string;
                        avatar: string;
                        content?: undefined;
                    };
                    module: {
                        name: string;
                        path: string;
                        category: string;
                        disableClicked: boolean;
                        imgUrl: string;
                    };
                    tag: {
                        titleFontColor: string;
                        descriptionFontColor: string;
                        linkTextColor: string;
                        dateColor: string;
                        userNameColor: string;
                        backgroundColor: string;
                        pt: string;
                        pb: string;
                        width?: undefined;
                        height?: undefined;
                    };
                })[];
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
        }[];
    };
    export default _default_2;
}
/// <amd-module name="@scom/scom-thread/global/API.ts" />
declare module "@scom/scom-thread/global/API.ts" {
    const fetchDataByCid: (cid: string) => Promise<any>;
    const getWidgetData: (dataUri: string) => Promise<any>;
    export { fetchDataByCid, getWidgetData };
}
/// <amd-module name="@scom/scom-thread/global/index.ts" />
declare module "@scom/scom-thread/global/index.ts" {
    export * from "@scom/scom-thread/global/utils.ts";
    export * from "@scom/scom-thread/global/API.ts";
}
/// <amd-module name="@scom/scom-thread/commons/analytics/index.css.ts" />
declare module "@scom/scom-thread/commons/analytics/index.css.ts" {
    export const analyticStyle: string;
}
/// <amd-module name="@scom/scom-thread/commons/analytics/index.tsx" />
declare module "@scom/scom-thread/commons/analytics/index.tsx" {
    import { ControlElement, Module } from '@ijstech/components';
    import { IAnalytic } from "@scom/scom-thread/interface.ts";
    interface ScomThreadAnalyticsElement extends ControlElement {
        data?: IAnalytic[];
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-thread-analytics']: ScomThreadAnalyticsElement;
            }
        }
    }
    export class ScomThreadAnalytics extends Module {
        private gridAnalysis;
        private _data;
        setData(value: IAnalytic[]): void;
        getData(): IAnalytic[];
        private renderUI;
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
    import { IPostData } from "@scom/scom-thread/interface.ts";
    type IPostType = 'reply' | 'post';
    interface ScomThreadPostElement extends ControlElement {
        cid?: string;
        type?: IPostType;
        showAnalytics?: boolean;
        theme?: Markdown["theme"];
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
        private inputReply;
        private btnViewMore;
        private pnlStatusDetail;
        private pnlOverlay;
        private _data;
        private _config;
        onReplyClicked: (data: {
            cid: string;
        }) => void;
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
        private fetchData;
        clear(): void;
        private renderUI;
        private onReplySubmit;
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
    import { IPostData } from "@scom/scom-thread/interface.ts";
    interface ScomThreadStatusElement extends ControlElement {
        cid?: string;
        theme?: Markdown["theme"];
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
        private pnlPostFrom;
        private pnlLoader;
        private pageViewer;
        private analyticEl;
        private pnlStatusReplies;
        private inputReply;
        private btnViewMore;
        private pnlStatusDetail;
        private pnlOverlay;
        private _data;
        private _cid;
        onReplyClicked: (data: {
            cid: string;
        }) => void;
        constructor(parent?: Container, options?: any);
        static create(options?: ScomThreadStatusElement, parent?: Container): Promise<ScomThreadStatus>;
        get cid(): string;
        set cid(value: string);
        set theme(value: Markdown["theme"]);
        setData(cid: string): Promise<void>;
        getData(): IPostData;
        private fetchData;
        clear(): void;
        private renderUI;
        private renderPostFrom;
        private renderReplies;
        private onViewMore;
        private onReplySubmit;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-thread/commons/replyInput/index.css.ts" />
declare module "@scom/scom-thread/commons/replyInput/index.css.ts" {
    export const editorStyle: string;
}
/// <amd-module name="@scom/scom-thread/commons/replyInput/index.tsx" />
declare module "@scom/scom-thread/commons/replyInput/index.tsx" {
    import { ControlElement, Module, Markdown, MarkdownEditor } from '@ijstech/components';
    interface ScomThreadReplyInputElement extends ControlElement {
        replyTo?: string;
        avatar?: string;
        isReplyToShown?: boolean;
        theme?: Markdown["theme"];
        onChanged?: (target: MarkdownEditor) => void;
        onSubmit?: (target: MarkdownEditor) => void;
    }
    interface IReplyInput {
        replyTo?: string;
        isReplyToShown?: boolean;
        avatar?: string;
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
        private _data;
        onChanged: (target: MarkdownEditor) => void;
        onSubmit: (target: MarkdownEditor) => void;
        get replyTo(): string;
        set replyTo(value: string);
        get avatar(): string;
        set avatar(value: string);
        get isReplyToShown(): boolean;
        set isReplyToShown(value: boolean);
        set theme(value: Markdown["theme"]);
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
}
/// <amd-module name="@scom/scom-thread" />
declare module "@scom/scom-thread" {
    import { ControlElement, Module, Container, Markdown } from '@ijstech/components';
    import { IThread } from "@scom/scom-thread/interface.ts";
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
        private mdPost;
        private mainStatus;
        private _data;
        constructor(parent?: Container, options?: any);
        static create(options?: ScomThreadElement, parent?: Container): Promise<ScomThread>;
        get cid(): string;
        set cid(value: string);
        set theme(value: Markdown["theme"]);
        setData(value: IThread): Promise<void>;
        getData(): IThread;
        clear(): void;
        private renderUI;
        private onClosedReplyMd;
        private onShowReplyMd;
        private initEvents;
        init(): void;
        render(): any;
    }
}
