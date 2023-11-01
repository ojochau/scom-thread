/// <amd-module name="@scom/scom-thread/interface.ts" />
declare module "@scom/scom-thread/interface.ts" {
    import { IAuthor, IPostData, IPostStat } from "@scom/scom-post";
    export interface IThreadPost {
        id: string;
        author: IAuthor;
        replyToId?: string;
        quotedPostIds?: string[];
        publishDate: Date | string;
        stat?: IPostStat;
        data: IPostData[];
    }
    export interface IThread {
        posts: IThreadPost[];
        quotedPosts: IThreadPost[];
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
    import { IAuthor } from "@scom/scom-post";
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
    export const getCurrentUser: () => IAuthor;
}
/// <amd-module name="@scom/scom-thread/global/utils.ts" />
declare module "@scom/scom-thread/global/utils.ts" {
    const getImageIpfsUrl: (url: string) => string;
    const formatNumber: (value: number | string, decimal?: number) => string;
    const getDuration: (date: number) => string;
    export { getImageIpfsUrl, formatNumber, getDuration };
}
/// <amd-module name="@scom/scom-thread/global/API.ts" />
declare module "@scom/scom-thread/global/API.ts" {
    const fetchDataByCid: (cid: string) => Promise<any>;
    export const fetchGifs: (params: any) => Promise<any>;
    export const fetchReactionGifs: () => Promise<any>;
    export interface IEmojiCategory {
        name: string;
        value: string;
        image?: string;
        groups?: string[];
    }
    export interface IEmoji {
        name: string;
        category: string;
        group: string;
        htmlCode: string[];
        unicode: string[];
    }
    export const emojiCategories: {
        name: string;
        value: string;
        image: string;
        groups: string[];
    }[];
    export const colorsMapper: {
        'rgb(255, 220, 93)': {
            htmlCode: string;
            unicode: string;
        };
        'rgb(247, 222, 206)': {
            htmlCode: string;
            unicode: string;
        };
        'rgb(243, 210, 162)': {
            htmlCode: string;
            unicode: string;
        };
        'rgb(213, 171, 136)': {
            htmlCode: string;
            unicode: string;
        };
        'rgb(175, 126, 87)': {
            htmlCode: string;
            unicode: string;
        };
        'rgb(124, 83, 62)': {
            htmlCode: string;
            unicode: string;
        };
    };
    export const fetchEmojis: (params: any) => Promise<any>;
    export const searchEmojis: (q: string, mapper: Map<string, any>) => any;
    export { fetchDataByCid };
}
/// <amd-module name="@scom/scom-thread/global/index.ts" />
declare module "@scom/scom-thread/global/index.ts" {
    export * from "@scom/scom-thread/global/utils.ts";
    export * from "@scom/scom-thread/global/API.ts";
}
/// <amd-module name="@scom/scom-thread/commons/replyInput/index.tsx" />
declare module "@scom/scom-thread/commons/replyInput/index.tsx" {
    import { Module, MarkdownEditor, ControlElement, Container } from '@ijstech/components';
    import { IPost, IPostData } from '@scom/scom-post';
    type IReplyType = 'reply' | 'quote';
    type onChangedCallback = (target: MarkdownEditor) => void;
    type onSubmitCallback = (target: MarkdownEditor, medias: IPostData[]) => void;
    interface IReplyInput {
        replyTo?: IPost;
        isReplyToShown?: boolean;
        type?: IReplyType;
        placeholder?: string;
    }
    interface ReplyInputElement extends ControlElement {
        replyTo?: IPost;
        isReplyToShown?: boolean;
        type?: IReplyType;
        placeholder?: string;
        onChanged?: onChangedCallback;
        onSubmit?: onSubmitCallback;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-thread--reply-input']: ReplyInputElement;
            }
        }
    }
    export class ScomThreadReplyInput extends Module {
        private mdEmoji;
        private mdGif;
        private mdWidgets;
        private lbReplyTo;
        private replyEditor;
        private btnReply;
        private pnlReplyTo;
        private gridReply;
        private imgReplier;
        private pnlBorder;
        private pnlIcons;
        private gridGif;
        private gridGifCate;
        private pnlGif;
        private iconGif;
        private inputGif;
        private bottomElm;
        private gridEmojiCate;
        private groupEmojis;
        private pnlColors;
        private lbEmoji;
        private pnlEmojiResult;
        private inputEmoji;
        private gifLoading;
        private autoPlaySwitch;
        private pnlMedias;
        private selectedColor;
        private recent;
        private _data;
        private extensions;
        private currentGifPage;
        private totalGifPage;
        private renderedMap;
        private bottomObserver;
        private newReply;
        private isEmojiSearching;
        private recentEmojis;
        private emojiCateMapper;
        private emojiGroupsData;
        private searchTimer;
        onChanged: onChangedCallback;
        onSubmit: onSubmitCallback;
        constructor(parent?: Container, options?: any);
        static create(options?: ReplyInputElement, parent?: Container): Promise<ScomThreadReplyInput>;
        get replyTo(): IPost;
        set replyTo(value: IPost);
        get type(): IReplyType;
        set type(value: IReplyType);
        get placeholder(): string;
        set placeholder(value: string);
        get isReplyToShown(): boolean;
        set isReplyToShown(value: boolean);
        private get isQuote();
        private get hasRecentEmojis();
        private get emojiColors();
        private get currentEmojiColor();
        private isRecent;
        setData(value: IReplyInput): void;
        clear(): void;
        private clearObservers;
        private updateGrid;
        private onEditorChanged;
        private onReply;
        private onUpload;
        private onCloseModal;
        private onShowModal;
        private onGifMdOpen;
        private onGifMdClose;
        private renderGifCate;
        private onGifSelected;
        private onGifSearch;
        private onToggleMainGif;
        private renderGifs;
        private onGifPlayChanged;
        private onIconGifClicked;
        private renderEmojis;
        private renderEmojiCate;
        private renderEmojiGroup;
        private updateEmojiGroups;
        private filterGroups;
        private onRecentClear;
        private renderEmojiColors;
        private renderColor;
        private onEmojiColorSelected;
        private onEmojiCateSelected;
        private onEmojiSelected;
        private onEmojiSearch;
        private onEmojiMdOpen;
        protected _handleClick(event: MouseEvent, stopPropagation?: boolean): boolean;
        init(): void;
        render(): any;
    }
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
/// <amd-module name="@scom/scom-thread/commons/index.ts" />
declare module "@scom/scom-thread/commons/index.ts" {
    export { ScomThreadReplyInput } from "@scom/scom-thread/commons/replyInput/index.tsx";
    export { ScomThreadToast } from "@scom/scom-thread/commons/toast/index.tsx";
}
/// <amd-module name="@scom/scom-thread/assets.ts" />
declare module "@scom/scom-thread/assets.ts" {
    function fullPath(path: string): string;
    const _default_1: {
        fullPath: typeof fullPath;
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-thread/index.css.ts" />
declare module "@scom/scom-thread/index.css.ts" {
    export const getHoverStyleClass: (color?: string) => string;
}
/// <amd-module name="@scom/scom-thread" />
declare module "@scom/scom-thread" {
    import { ControlElement, Module, Container, Markdown } from '@ijstech/components';
    import { IThread, IThreadPost } from "@scom/scom-thread/interface.ts";
    import { ScomPost } from '@scom/scom-post';
    export { IThreadPost };
    type callbackType = (target: ScomPost) => {};
    interface ScomThreadElement extends ControlElement {
        data?: IThread;
        theme?: Markdown["theme"];
        onItemClicked?: callbackType;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-thread']: ScomThreadElement;
            }
        }
    }
    export class ScomThread extends Module {
        private pnlMain;
        private mainPost;
        private inputReply;
        private pnlActions;
        private _data;
        private _theme;
        tag: {
            light: {};
            dark: {};
        };
        onItemClicked: callbackType;
        constructor(parent?: Container, options?: any);
        static create(options?: ScomThreadElement, parent?: Container): Promise<ScomThread>;
        get posts(): IThreadPost[];
        set posts(value: IThreadPost[]);
        get quotedPosts(): IThreadPost[];
        set quotedPosts(value: IThreadPost[]);
        set theme(value: Markdown["theme"]);
        get theme(): Markdown["theme"];
        setData(value: IThread): Promise<void>;
        getData(): IThread;
        clear(): void;
        private onViewPost;
        private renderUI;
        private renderFocusedPost;
        private renderReplies;
        private appendReplyInput;
        private renderActions;
        private onCloseModal;
        private onShowModal;
        private removeShow;
        private onReplySubmit;
        init(): void;
        render(): any;
    }
}
