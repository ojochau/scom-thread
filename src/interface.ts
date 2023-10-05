import { Control, IconName, Markdown } from "@ijstech/components";

export interface IThread {
  cid: string;
  theme?: Markdown['theme']
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
  value?: number|string;
  icon?: IconName;
  class?: string;
  onRender?: () => Control;
  onClick?: () => void
}

export enum ReplyType {
  REPLY = 'reply',
  QUOTE = 'quote'
}

export type onReplyClickedCallback = (data: { cid: string, type: ReplyType, postData?: IPostData }) => void;

export type onReplyHandlerCallback = (data: { cid: string, content: string }) => void;

