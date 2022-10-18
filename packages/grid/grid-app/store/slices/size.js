import produce from "immer";

const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight - 40;

export const initialState = {
    width,
    height,
    colWidths: {
        0: 100,
        1: 60,
        7: 60,
    },
    rowHeights: {
        3: 200,
    },
};

export const reducer = (state, action) => {
    switch(action.type) {
        // 改变列宽
        case 'colResize': 
            return produce(state, draft => {
                const colIndex = action.payload.colIndex;
                const width = action.payload.width;
                // 宽度变化的时候才set
                if (state.colWidths[colIndex] !== width && width > 0) {
                    draft.colWidths[colIndex] = width;
                }
            })
        case 'windowResize':
            return produce(state, draft => {
                draft.width = document.documentElement.clientWidth;
                draft.height = document.documentElement.clientHeight - 40;
            });
        default:
            break;
    }
}
