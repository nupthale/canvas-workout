import produce from "immer";

export const state = {
    layout: {
        rowCount: 0,
        colCount: 0,
        xMap: {
            0: 0,
        },
        yMap: {
            0: 0,
        },
        rowHeights: {},
        colWidths: {},
        totalWidth: 0,
        totalHeight: 0,
    }
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
