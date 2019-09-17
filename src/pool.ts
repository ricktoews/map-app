import usStates from './us-map-data.js';

function initPool(values: any[]) {
    usStates.forEach((st: any) => {
        values.push(st.id);
    });
}

function updatePool(valueToRemove: string, values: string[]): string[] {
    let ndx = values.indexOf(valueToRemove);
    values.splice(ndx, 1);
    return values.slice(0);
}
export { initPool, updatePool };