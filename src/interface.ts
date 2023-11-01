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
