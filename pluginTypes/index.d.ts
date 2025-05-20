/// <amd-module name="@scom/scom-thread/interface.ts" />
declare module "@scom/scom-thread/interface.ts" {
    import { IPost } from "@scom/scom-post";
    export interface IThreadPost extends IPost {
        replyToId?: string;
        isPinned?: boolean;
    }
    export interface IThread {
        ancestorPosts: IThreadPost[];
        focusedPost: IThreadPost;
        replies: IThreadPost[];
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
/// <amd-module name="@scom/scom-thread/index.css.ts" />
declare module "@scom/scom-thread/index.css.ts" {
    export const threadPanelStyle: string;
    export const getActionButtonStyle: (hoveredColor: string) => string;
}
/// <amd-module name="@scom/scom-thread/translations.json.ts" />
declare module "@scom/scom-thread/translations.json.ts" {
    const _default_1: {
        en: {
            cancel: string;
            pin_note: string;
            post_your_reply: string;
            reply: string;
            sign_in_to_reply: string;
            unpin_note: string;
        };
        "zh-hant": {
            cancel: string;
            pin_note: string;
            post_your_reply: string;
            reply: string;
            sign_in_to_reply: string;
            unpin_note: string;
        };
        vi: {
            cancel: string;
            pin_note: string;
            post_your_reply: string;
            reply: string;
            sign_in_to_reply: string;
            unpin_note: string;
        };
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-thread" />
declare module "@scom/scom-thread" {
    import { ControlElement, Module, Container, Control } from '@ijstech/components';
    import { IThread, IThreadPost } from "@scom/scom-thread/interface.ts";
    import { IPost, IPostData, ScomPost } from '@scom/scom-post';
    export { IThreadPost };
    type clickCallbackType = (target: ScomPost, event?: MouseEvent) => void;
    type asyncCallbackType = (target: ScomPost, event?: MouseEvent) => Promise<boolean>;
    type submitclickCallbackType = (content: string, medias: IPostData[]) => void;
    type pinCallbackType = (post: any, action: 'pin' | 'unpin', event?: MouseEvent) => Promise<void>;
    type openDesignerCallback = (target: Control, data: any) => Promise<void>;
    interface IPostContextMenuAction {
        caption: string;
        icon?: {
            name: string;
            fill?: string;
        };
        tooltip?: string;
        onClick?: (target: ScomPost, post: IThreadPost, event?: MouseEvent) => Promise<void>;
    }
    interface ScomThreadElement extends ControlElement {
        data?: IThread;
        onItemClicked?: clickCallbackType;
        onLikeButtonClicked?: asyncCallbackType;
        onZapButtonClicked?: clickCallbackType;
        onRepostButtonClicked?: clickCallbackType;
        onPostButtonClicked?: submitclickCallbackType;
        onSignInClick?: () => void;
        onBookmarkButtonClicked?: clickCallbackType;
        onCommunityButtonClicked?: clickCallbackType;
        onPinButtonClicked?: pinCallbackType;
        onUnlockPostButtonClicked?: asyncCallbackType;
        onOpenDesigner?: openDesignerCallback;
        onAvatarClick?: (npub: string) => void;
        env?: string;
        avatar?: string;
        apiBaseUrl?: string;
        allowPin?: boolean;
        postContextMenuActions?: IPostContextMenuAction[];
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-thread']: ScomThreadElement;
            }
        }
    }
    export class ScomThread extends Module {
        private pnlThread;
        private pnlMain;
        private pnlAncestors;
        private mainPost;
        private inputReply;
        private pnlActions;
        private pnlSignIn;
        private mdReplyPost;
        private mdThreadActions;
        onSignInClick: () => void;
        private inputReplyPost;
        private focusedPostReply;
        private currentContent;
        private env;
        private _avatar;
        private _apiBaseUrl;
        private _hasQuota;
        private _allowPin;
        private selectedPost;
        private currentPost;
        private _pinnedNotes;
        private pinnedNoteIds;
        private btnPinAction;
        private _data;
        private checkIsLogin;
        private _theme;
        tag: {
            light: {};
            dark: {};
        };
        onItemClicked: clickCallbackType;
        onLikeButtonClicked: asyncCallbackType;
        onZapButtonClicked: clickCallbackType;
        onRepostButtonClicked: clickCallbackType;
        onPostButtonClicked: submitclickCallbackType;
        onBookmarkButtonClicked: clickCallbackType;
        onCommunityButtonClicked: clickCallbackType;
        onPinButtonClicked: pinCallbackType;
        onUnlockPostButtonClicked: asyncCallbackType;
        onOpenDesigner: openDesignerCallback;
        onAvatarClick: (npub: string) => void;
        private _postContextMenuActions;
        constructor(parent?: Container, options?: any);
        static create(options?: ScomThreadElement, parent?: Container): Promise<ScomThread>;
        get hasQuota(): boolean;
        set hasQuota(value: boolean);
        get ancestorPosts(): IThreadPost[];
        set ancestorPosts(value: IThreadPost[]);
        get focusedPost(): IThreadPost;
        set focusedPost(value: IThreadPost);
        get replies(): IThreadPost[];
        set replies(value: IThreadPost[]);
        get avatar(): string;
        set avatar(value: string);
        get allowPin(): boolean;
        set allowPin(value: boolean);
        get pinnedNotes(): IThreadPost[];
        set pinnedNotes(posts: IThreadPost[]);
        get apiBaseUrl(): string;
        set apiBaseUrl(value: string);
        get postContextMenuActions(): IPostContextMenuAction[];
        set postContextMenuActions(actions: IPostContextMenuAction[]);
        setData(value: IThread): Promise<void>;
        getData(): IThread;
        clear(): void;
        private onViewPost;
        private handleUnlockPostButtonClicked;
        private renderUI;
        private renderFocusedPost;
        private renderAncestorPosts;
        addReply(post: IPost): ScomPost;
        private renderReplies;
        private appendReplyInput;
        private renderActions;
        private onCloseModal;
        private onShowModal;
        private showActionModal;
        onShow(options: any): Promise<void>;
        private removeShow;
        private onReplySubmit;
        init(): void;
        private handleModalClose;
        render(): any;
    }
}
