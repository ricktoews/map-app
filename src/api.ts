const api_base = '//rest.toewsweb.net/track.php';

/*
  Utility function. Should probably go in an imported helper file.
  Perform JSON.parse within a try/catch block, and return the result.
  If the try fails:
    Output the error message and the attempted string to the console, on separate lines, for increased legibility.
    Return an object containing a "parse failed" message and the original string.
*/
function safeJSONParse(str: any) {
  let parsed = { msg: 'json parse failed', original: str };
  try {
    parsed = JSON.parse(str);
  } catch(e) {
    console.log('safeJSONParse error', e);
    console.log('safeJSONParse string attempted', str);
  }
  return parsed;
}


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
      data.tracking_data = tracking_data;
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

