import { safeJSONParse, setRemedial } from './api-helper';
const api_base = '//rest.toewsweb.net/track.php';

export const getTracking = (user_id: number) => {
  let url = api_base + '/gettrack';
  let data = {
    user_id: user_id
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
      setRemedial(tracking_data);
//      let keys = Object.keys(tracking_data);
//      keys.forEach((k: string) => { tracking_data[k].desc = 'lorem ipsum etcetera, the time has come, the walrus said, to talk of many things: of shoes and ships and sealing wax, of cabbages and kings--and why the sea is boiling hot, and whether pigs have wings.'; });
      return tracking_data; 
    })
    ;
};


export const setTracking = (user_id: number, tracking_data: any) => {
  let url = api_base + '/track';
  let req_payload = {
    user_id: user_id,
    tracking_data: tracking_data
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

