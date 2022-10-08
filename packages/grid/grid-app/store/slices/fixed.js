import produce from "immer";

export const initialState = {
    fixedConfig: {
        left: 2,
        header: 1,
    },
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
