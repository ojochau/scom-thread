import { IPost } from "@scom/scom-post";

export interface IThreadPost extends IPost {
	replyToId?: string;
}

export interface IThread {
	ancestorPosts: IThreadPost[];
	focusedPost: IThreadPost;
	replies: IThreadPost[];
}
