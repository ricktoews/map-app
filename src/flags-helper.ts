//import usStates from './us-map-data.js';

function pickRandomFlags(correct: string, tracking: any): string[] {
  var poolItems = Object.keys(tracking);
  // Choose five random items.
  let poolSize = poolItems.length;
  let _ndx: number[] = Array.from(Array(poolSize).keys());
  let ids: string[] = [];
  for (let i = 0; i < 5; i++) {
    let ndxNdx = Math.floor(Math.random() * _ndx.length);
    let itemIndex = _ndx[ndxNdx];
    ids.push(poolItems[itemIndex]);
    _ndx.splice(ndxNdx, 1);
  } 
  if (ids.indexOf(correct) === -1) {
    let correctNdx = Math.floor(Math.random() * 5);
    ids[correctNdx] = correct;
  } 
  return ids;
}   

export { pickRandomFlags };
