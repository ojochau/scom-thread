import { Control, IconName } from "@ijstech/components";

export interface IThread {
  cid: string;
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

export type onReplyClickedCallback = (data: { cid: string, type: 'quote'|'reply' }) => void;

export type onReplyHandlerCallback = (data: { cid: string, content: string }) => void;
