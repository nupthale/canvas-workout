import { drawRect, drawStrokeRect } from "../utils/draw.js";

import {getIndicatorBoundingRect} from "../selection/util.js";
import { getLayoutXY } from './utils'


export default class ExpandIndicator {
    constructor(context) {
        this.context = context;
        this.ctx = context.canvasCtx;
    }

    render({ selection }) {
        const { config, layout, viewport } = this.context;
        const activeCol = selection.activeCol;
        const selectionCol = selection.selectionCol;

        if (!activeCol) {
            return;
        }

        if (activeCol) {
            const combineRange = activeCol.combineRange
            let x, y;
            if (combineRange) {
                const { x: _x, y: _y } = getLayoutXY(combineRange.start[0], combineRange.start[1], layout, viewport, config);
                x = _x + activeCol.combineWidth - 5;
                y = _y + activeCol.combineHeight - 5;
            }

            const indicator = getIndicatorBoundingRect(activeCol, selectionCol, x, y);

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
