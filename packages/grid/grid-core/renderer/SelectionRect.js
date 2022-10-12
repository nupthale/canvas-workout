import { drawStrokeRect } from "../utils/draw.js";
import { getLayoutXY } from './utils'

export default class SelectionRect {
    constructor(context) {
        this.context = context;
        this.ctx = context.canvasCtx;
    }

    render({ selection }) {
        const { layout, viewport, config } = this.context
        const activeCol = selection.activeCol;
        const selectionCol = selection.selectionCol;

        if (!activeCol) {
            return;
        }

        const rect = {
            x: activeCol.x,
            y: activeCol.y,
            width: activeCol.width,
            height: activeCol.height,
        };

        const combineRange = activeCol.combineRange
        if (combineRange) {
            const { x: _x, y: _y } = getLayoutXY(combineRange.start[0], combineRange.start[1], layout, viewport, config)
            rect.x = _x;
            rect.y = _y;
            rect.width = activeCol.combineWidth;
            rect.height = activeCol.combineHeight;
        }

        if (selectionCol) {
            rect.width = selectionCol.x + selectionCol.width - rect.x;
            rect.height = selectionCol.y + selectionCol.height - rect.y;
        }

        if (activeCol) {
            drawStrokeRect(
                this.ctx,
                rect.x,
                rect.y,
                rect.width,
                rect.height,
                2,
                'rgba(69, 128, 230, 1)',
                4,
            );
        }
    }
}
