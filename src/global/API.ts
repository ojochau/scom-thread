import { getIPFSGatewayUrl } from "../store/index";
import mockupData from './localData/data.json';
import viewerData from './localData/scconfig.json';

const fetchDataByCid = async (cid: string) => {
  return {...mockupData};
  try {
    const ipfsBaseUrl = getIPFSGatewayUrl();
    const url = `${ipfsBaseUrl}/${cid}`;
    const response = await fetch(url);
    return await response.json();
  } catch {}
  return null;
}

const getWidgetData = async (dataUri: string) => {
  return {...viewerData};
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
  getWidgetData
}
