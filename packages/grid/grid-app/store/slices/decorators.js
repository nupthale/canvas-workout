import produce from "immer";

import { sendToServer } from "../../collaboration/firestore.js";

export const initialState = {
    decorators: {
        background: [],
    }
};

export const reducer = (state, action) => {
    switch(action.type) {
        case 'changeBackground':
            return produce(state, draft => {
                draft.decorators.background.push(action.payload);
            });

        case 'changeBackgroundBatch':
            // 没判重复
            return produce(state, draft => {
                action.payload.forEach(item => {
                    draft.decorators.background.push(item);
                });
            }, async (patches, inversePatches) => {
                await sendToServer(patches);
            });

        default:
            break;
    }
}
