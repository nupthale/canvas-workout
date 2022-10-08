import produce from "immer";

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

        default:
            break;
    }
}
