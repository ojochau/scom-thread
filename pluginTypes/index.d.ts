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
/// <amd-module name="@scom/scom-thread" />
declare module "@scom/scom-thread" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    import { IThread, IThreadPost } from "@scom/scom-thread/interface.ts";
    import { IPostData, ScomPost } from '@scom/scom-post';
    export { IThreadPost };
    type clickCallbackType = (target: ScomPost) => void;
    type submitclickCallbackType = (content: string, medias: IPostData[]) => void;
    interface ScomThreadElement extends ControlElement {
        data?: IThread;
        onItemClicked?: clickCallbackType;
        onPostButtonClicked?: submitclickCallbackType;
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
        private pnlAncestors;
        private mainPost;
        private inputReply;
        private pnlActions;
        private _data;
        private _theme;
        tag: {
            light: {};
            dark: {};
        };
        onItemClicked: clickCallbackType;
        onPostButtonClicked: submitclickCallbackType;
        constructor(parent?: Container, options?: any);
        static create(options?: ScomThreadElement, parent?: Container): Promise<ScomThread>;
        get ancestorPosts(): IThreadPost[];
        set ancestorPosts(value: IThreadPost[]);
        get focusedPost(): IThreadPost;
        set focusedPost(value: IThreadPost);
        get replies(): IThreadPost[];
        set replies(value: IThreadPost[]);
        setData(value: IThread): Promise<void>;
        getData(): IThread;
        clear(): void;
        private onViewPost;
        private renderUI;
        private renderFocusedPost;
        private renderAncestorPosts;
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
