import {BehaviorSubject} from "rxjs";

import * as combineRanges from './slices/combineRanges.js';
import * as decorators from "./slices/decorators.js";
import * as fixed from "./slices/fixed.js";
import * as size from "./slices/size.js";

import {enablePatches, applyPatches} from "immer"
enablePatches();

// 不能有大数据， 有大数据，immer会有长任务；
const slices = [
    combineRanges,
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

export let crtState = defaultState;
export const state$ = new BehaviorSubject(defaultState);

state$.subscribe(state => {
    crtState = state;
});

let lastColWidths = ''

export const dispatch = (action) => {
    if (action.type === 'applyPatch') {
        const newState = applyPatches(crtState, action.payload);

        if (newState) {
            state$.next(newState);
        }
    } else if (action.type === 'colResize') {
        // 对列宽变化特殊处理
        const newState = slices[3].reducer(crtState, action);
        if (newState && lastColWidths !== JSON.stringify(newState.colWidths)) {
            state$.next({...newState, shouldLayout: false});
        }
        lastColWidths = JSON.stringify(newState?.colWidths)
    } else {
        slices.forEach(item => {
            const newState = item.reducer(crtState, action);
            if (newState) {
                state$.next(newState);
            }
        })
    }
}
