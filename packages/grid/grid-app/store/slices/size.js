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
        case '':
            break;

        default:
            break;
    }
}
