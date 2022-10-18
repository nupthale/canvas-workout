import {minScrollbarSize, scrollbarSize} from "../../meta.js";
import produce from "immer";

export const state = {
    hScrollbar: {
        x: 0,
        y: 0,
        width: minScrollbarSize,
        height: scrollbarSize,
        isHover: false,
        isScroll: false,
    },
    vScrollbar: {
        x: 0,
        y: 0,
        width: scrollbarSize,
        height: minScrollbarSize,
        isHover: false,
        isScroll: false,
    }
};

export const reducer = (state, action) => {
    switch(action.type) {
        case '':
            return produce(state, draft => {

            });
        default:
            break;
    }
}
