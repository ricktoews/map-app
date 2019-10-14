import usStates from './us/map-data.js';

/*
  initPool. Set pool size for each round.
  This needs to be not just the complete list of items but filtered by focus level.
  We need access to the tracking data.
*/
function initPool(values: any[], tracking: any) {
    usStates.forEach((st: any) => {
        if (tracking[st.id].attend !== -1) {
          values.push(st.id);
        }
    });
}

function updatePool(valueToRemove: string, values: string[]): string[] {
    let ndx = values.indexOf(valueToRemove);
    values.splice(ndx, 1);
    return values.slice(0);
}

export { initPool, updatePool };
