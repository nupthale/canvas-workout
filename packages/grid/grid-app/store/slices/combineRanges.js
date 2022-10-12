import produce from "immer";

export const initialState = {
    combineRanges: [],
};

export const reducer = (state, action) => {
    switch(action.type) {
        case 'mergeCells':
            return produce(state, draft => {
                draft.combineRanges.push(action.payload);
            });

        default:
            break;
    }
}
