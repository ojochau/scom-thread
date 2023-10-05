import { getIPFSGatewayUrl, getMode } from "../store/index";
import { getLocalWidget } from "./localData/comment";
import statusData from './localData/status.json';

const fetchDataByCid = async (cid: string) => {
  try {
    if (getMode() === 'development') {
      return statusData[cid] || null;
    } else {
      const ipfsBaseUrl = getIPFSGatewayUrl();
      const url = `${ipfsBaseUrl}/${cid}`;
      const response = await fetch(url);
      return await response.json();
    }
  } catch {}
  return null;
}

const getDescWidgetData = (content: string) => {
  let widgetData: any = getLocalWidget(content);
  return widgetData;
}

const getWidgetData = async (dataUri: string) => {
  let widgetData: any;
  try {
    const ipfsBaseUrl = getIPFSGatewayUrl();
    const scconfigResponse = await fetch(`${ipfsBaseUrl}${dataUri}/scconfig.json`);
    const scconfigResult = await scconfigResponse.json();
    widgetData = scconfigResult.widgetData;
  } catch (err) {}
  return widgetData
}

export {
  fetchDataByCid,
  getWidgetData,
  getDescWidgetData
}
