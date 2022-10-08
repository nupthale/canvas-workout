import { drawRect, drawStrokeRect } from "../utils/draw.js";

import {getIndicatorBoundingRect} from "../selection/util.js";


export default class ExpandIndicator {
    constructor(context) {
        this.context = context;
        this.ctx = context.canvasCtx;
    }

    render({ selection }) {
        const activeCol = selection.activeCol;
        const selectionCol = selection.selectionCol;

        if (activeCol) {
            const indicator = getIndicatorBoundingRect(activeCol, selectionCol);

            drawRect(
                this.ctx,
                indicator.x,
                indicator.y,
                indicator.width,
                indicator.height,
                '#fff',
                2,
            );

            drawStrokeRect(
                this.ctx,
                indicator.x,
                indicator.y,
                indicator.width,
                indicator.height,
                2,
                'rgba(69, 128, 230, 1)',
                2,
            );
        }
    }
}
