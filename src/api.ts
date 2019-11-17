import { safeJSONParse, setRemedial, undecorate, fillInMissing } from './api-helper';
import svgData from './us/map-data.js';
import { flags } from './us/Flags';
const api_base = '//rest.toewsweb.net/track.php';

export const getTracking = (user_id: number, bank: string) => {
  let url = api_base + '/gettrack';
  let data = {
    user_id,
    bank
  };
  let options: any = {
    headers: {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify(data),
    method: 'POST'
  };

  return fetch(url, options)
    .then((resp: any) => { return resp.json(); })
    .then((resp: any) => {
      // Currently, the server is returning the tracking data as a string. Ideally, it would
      // return JSON, so we wouldn't have to process that here.
      let data = resp.data || {};
      let tracking_data = data.tracking_data || '';
      tracking_data = safeJSONParse(tracking_data);
      fillInMissing(tracking_data);
      setRemedial(tracking_data);
      return tracking_data;
    })
    .then((resp: any) => {
      for (let key in resp) {
        let svg = svgData.find((item: any) => item.id === key);
        resp[key].svg = svg;
        resp[key].img = flags[key];
      }
      return resp;
    })
    ;
};


export const setTracking = (user_id: number, tracking_data: any) => {
  let url = api_base + '/track';
  let clone = JSON.parse(JSON.stringify(tracking_data));
  undecorate(clone);
  let req_payload = {
    user_id: user_id,
    tracking_data: clone
  };
  let options: any = {
    headers: {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify(req_payload),
    method: 'POST'
  };

  return fetch(url, options)
    .then((resp: any) => { return resp.json(); })
    .then((resp: any) => {
      let data = resp.data || {};
      let tracking_data = data.tracking_data || '';
      tracking_data = safeJSONParse(tracking_data);
      data.tracking_data = tracking_data;
      return tracking_data;
    });
};
