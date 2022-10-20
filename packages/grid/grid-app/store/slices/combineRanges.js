import produce from "immer";
import {handleAddPatch} from "../history.js";

export const initialState = {
    combineRanges: [],
};

export const reducer = (state, action) => {
    switch(action.type) {
        case 'mergeCells':
            return produce(state, draft => {
                draft.combineRanges.push(action.payload);
            }, async (patches, inversePatches) => {
                await handleAddPatch(patches, inversePatches, true);
            });
        case 'replaceMergeCells':
            return produce(state, draft => {
                const newPayload = action.payload;
                const combineRanges = state.combineRanges;
                let indexes = []
                combineRanges.forEach((item, idx) => {
                    if (item.start[0] >= newPayload.start[0] && item.end[0] <= newPayload.end[0] && item.start[1] >= newPayload.start[1] && item.end[1] <= newPayload.end[1]) {
                        indexes.push(idx);
                    }
                })

                // 从大到小splice，这样不会漏
                indexes = indexes.reverse()
                indexes.forEach(idx => {
                    draft.combineRanges.splice(idx, 1)
                })

                draft.combineRanges.push(newPayload)
            }, async (patches, inversePatches) => {
                await handleAddPatch(patches, inversePatches, true);
            });
        default:
            break;
    }
}
