import {columns, dataSource} from "../../examples/mock.js";

// data 单独处理，数据非常大时， 不能和immer混一起， 否则卡死；
export const initialState = {
    columns,
    dataSource,
};

export const reducer = (state, action) => {
    const payload = action.payload || {};

    switch(action.type) {
        case '':
            break;
        default:
            break;
    }
}
