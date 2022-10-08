import {isEventInView} from "../utils/util.js";

export const findColByEvent = (data, eventX, eventY) => {
    let result = null;
    data?.forEach(row => {
        if (eventY > row.y && eventY < row.y + row.height) {
            row.cols.forEach(col => {
                if (isEventInView(eventX, eventY, col)) {
                    result = col;
                }
            });
        }
    });

    return result;
}
