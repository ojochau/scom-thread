import { IAuthor } from "@scom/scom-post";

export type Mode = 'production' | 'development';

const getLocalUser = () => {
  let localData = localStorage.getItem('user');
  try {
    return localData ? JSON.parse(localData) : {};
  } catch {}
  return {};
}

const defaultUserData = {
  actions: {}
}

interface IUserActions {

}
interface IUser {
  actions: {[key: string]: IUserActions};
}

export const state = {
  ipfsGatewayUrl: "",
  mode: 'development' as Mode,
  user: {...getLocalUser()}
}

export const setMode = (mode: Mode) => {
  state.mode = mode;
}

export const getMode = () => {
  return state.mode;
}

export const setDataFromJson = (options: any) => {
  if (options.ipfsGatewayUrl) {
    setIPFSGatewayUrl(options.ipfsGatewayUrl);
  }
}

export const setIPFSGatewayUrl = (url: string) => {
  state.ipfsGatewayUrl = url;
}

export const getIPFSGatewayUrl = () => {
  return state.ipfsGatewayUrl;
}

export const setUser = (data: any) => {
  state.user = {...defaultUserData, ...data};
  localStorage.setItem('user', JSON.stringify(data));
}

export const getUser = () => {
  return state.user;
}

export const getUserActions = (cid: string) => {
  return state.user?.actions?.[cid] || null;
}

export const setUserActions = (cid: string, value: any) => {
  const useActions = state.user?.actions
  if (!useActions) state.user.actions = {};
  state.user.actions[cid] = {...value};
  localStorage.setItem('user', JSON.stringify({...state.user}));
}

export const getCurrentUser = () => {
  const user: IAuthor = {
    id: "",
    username: "",
    internetIdentifier: "",
    pubKey: "",
    displayName: "",
    description: "",
    avatar: undefined
  }
  return user;
}
