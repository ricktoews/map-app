import usStates from './us-map-data.js';

function initPool(values: any[]) {
    usStates.forEach((st: any) => {
        values.push(st.id);
    });
}

function updatePool(valueToRemove: string, values: any[]) {
    let ndx = values.indexOf(valueToRemove);
    values.splice(ndx, 1);
}
export { initPool, updatePool };