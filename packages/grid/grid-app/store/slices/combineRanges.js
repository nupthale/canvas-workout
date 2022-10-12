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
        case 'replaceMergeCells':
            return produce(state, draft => {
                const { origin, newPayload } = action.payload;
                const index = draft.combineRanges.findIndex(item => JSON.stringify(item) === JSON.stringify(origin));
                draft.combineRanges.splice(index, 1, newPayload)
            });
        default:
            break;
    }
}
