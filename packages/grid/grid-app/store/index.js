import {BehaviorSubject} from "rxjs";

import * as combineRanges from './slices/combineRanges.js';
import * as data from "./slices/data.js";
import * as decorators from "./slices/decorators.js";
import * as fixed from "./slices/fixed.js";
import * as size from "./slices/size.js";

const slices = [
    combineRanges,
    data,
    decorators,
    fixed,
    size,
];

const defaultState = slices.reduce((acc, crt) => {
    return {
        ...acc,
        ...(crt.initialState),
    }
}, {});

let crtState = defaultState;
export const state$ = new BehaviorSubject(defaultState);

state$.subscribe(state => {
    crtState = state;
});

export const dispatch = (action) => {
    slices.forEach(item => {
        const newState = item.reducer(crtState, action);
        if (newState) {
            state$.next(newState);
        }
    })
}
