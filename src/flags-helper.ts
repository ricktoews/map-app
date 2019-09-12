import usStates from './us-map-data.js';

function pickRandomFlags(correct: string): string[] {
  // Choose five random states.
  let _ndx: number[] = Array.from(Array(50).keys());
  let ids: string[] = [];
  for (let i = 0; i < 5; i++) {
    let ndxNdx = Math.floor(Math.random() * _ndx.length);
    let stateIndex = _ndx[ndxNdx];
    ids.push(usStates[stateIndex].id.toLowerCase());
    _ndx.splice(ndxNdx, 1);
  } 
  if (ids.indexOf(correct.toLowerCase()) === -1) {
    let correctNdx = Math.floor(Math.random() * 5);
    ids[correctNdx] = correct.toLowerCase();
  } 
  return ids;
}   

export { pickRandomFlags };
