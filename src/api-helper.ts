/*
  Utility function. Should probably go in an imported helper file.
  Perform JSON.parse within a try/catch block, and return the result.
  If the try fails:
    Output the error message and the attempted string to the console, on separate lines, for increased legibility.
    Return an object containing a "parse failed" message and the original string.
*/
export const  safeJSONParse = (str: any) => {
  let parsed = { msg: 'json parse failed', original: str };
  try {
    parsed = JSON.parse(str);
  } catch(e) {
    console.log('safeJSONParse error', e);
    console.log('safeJSONParse string attempted', str);
  }
  return parsed;
}


export const setRemedial = (tracking_data: any) => {
  for (let key in tracking_data) {
    let { presented, correct } = tracking_data[key];
    let remedial = (presented > 4 && correct / presented < .9)
    tracking_data[key].remedial = remedial;
  }
}

