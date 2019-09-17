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

function initScoringPool() {
    let scoring: any = {};
    usStates.forEach((st: any) => {
        scoring[st.id] = { presented: 0, correct: 0 };
    });
    return scoring;
}

export { initPool, updatePool, initScoringPool };
