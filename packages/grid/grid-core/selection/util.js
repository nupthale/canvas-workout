import {isEventInView} from "../utils/util.js";

export const findColByEvent = (data, eventX, eventY) => {
    let result = null;
    data?.forEach(row => {
        if (eventY >= row.y && eventY <= row.y + row.height) {
            row.cols.forEach(col => {
                if (isEventInView(eventX, eventY, col)) {
                    result = col;
                }
            });
        }
    });

    return result;
}

export const getIndicatorBoundingRect = (activeCol, selectionCol, x, y, selectionX, selectionY) => {
    const rect = {
        x: activeCol.x + activeCol.width - 5,
        y: activeCol.y + activeCol.height - 5,
        width: 10,
        height: 10,
    }

    if (x) {
        rect.x = x;        
    }

    if (y) {
        rect.y = y;
    }

    if (selectionCol) {
        if (selectionCol.combineRange) {
            rect.x = selectionX;
            rect.y = selectionY;
        } else {
            rect.x = selectionCol.x + selectionCol.width - 5;
            rect.y = selectionCol.y + selectionCol.height - 5;
        }
    }

    return rect;
}
