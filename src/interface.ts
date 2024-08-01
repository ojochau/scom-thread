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
