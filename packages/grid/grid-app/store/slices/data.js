import produce from "immer";
import {columns, dataSource} from "../../../examples/mock.js";

export const initialState = {
    columns,
    dataSource,
};

export const reducer = (state, action) => {
    const payload = action.payload || {};

    switch(action.type) {
        case 'layout':
            return produce(state, draft => {
                state.layout.rowCount = payload.rowCount;
                state.layout.colCount = payload.colCount;

                state.layout.xMap = payload.xMap;
                state.layout.yMap = payload.yMap;

                state.layout.rowHeights = payload.rowHeights;
                state.layout.colWidths = payload.colWidths;

                state.layout.totalWidth = payload.totalWidth;
                state.layout.totalHeight = payload.totalHeight;
            });
        default:
            break;
    }
}
