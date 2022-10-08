import {BehaviorSubject} from "rxjs";

import * as clippedData from './slices/clippedData.js';
import * as fixedData from "./slices/fixedData.js";
import * as fixedInfo from "./slices/fixedInfo.js";
import * as layout from "./slices/layout.js";
import * as scrollbar from "./slices/scrollbar.js";

const slices = [
    layout,
    fixedData,
    clippedData,
    fixedData,
    fixedInfo,
    scrollbar,
];

const defaultState = slices.reduce((acc, crt) => {
    return {
        ...acc,
        ...(crt.state),
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
        state$.next(newState);
    })
}
