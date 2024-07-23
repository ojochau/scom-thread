/// <amd-module name="@scom/scom-thread/interface.ts" />
declare module "@scom/scom-thread/interface.ts" {
    import { IPost } from "@scom/scom-post";
    export interface IThreadPost extends IPost {
        replyToId?: string;
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
}
/// <amd-module name="@scom/scom-thread" />
declare module "@scom/scom-thread" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    import { IThread, IThreadPost } from "@scom/scom-thread/interface.ts";
    import { IPost, IPostData, ScomPost } from '@scom/scom-post';
    export { IThreadPost };
    type clickCallbackType = (target: ScomPost, event?: MouseEvent) => void;
    type asyncCallbackType = (target: ScomPost, event?: MouseEvent) => Promise<boolean>;
    type submitclickCallbackType = (content: string, medias: IPostData[]) => void;
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
        env?: string;
        avatar?: string;
        apiBaseUrl?: string;
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
        constructor(parent?: Container, options?: any);
        static create(options?: ScomThreadElement, parent?: Container): Promise<ScomThread>;
        get ancestorPosts(): IThreadPost[];
        set ancestorPosts(value: IThreadPost[]);
        get focusedPost(): IThreadPost;
        set focusedPost(value: IThreadPost);
        get replies(): IThreadPost[];
        set replies(value: IThreadPost[]);
        get avatar(): string;
        set avatar(value: string);
        get apiBaseUrl(): string;
        set apiBaseUrl(value: string);
        setData(value: IThread): Promise<void>;
        getData(): IThread;
        clear(): void;
        private onViewPost;
        private renderUI;
        private renderFocusedPost;
        private renderAncestorPosts;
        addReply(post: IPost): void;
        private renderReplies;
        private appendReplyInput;
        private renderActions;
        private onCloseModal;
        private onShowModal;
        onShow(options: any): Promise<void>;
        private removeShow;
        private onReplySubmit;
        init(): void;
        private handleModalClose;
        render(): any;
    }
}
