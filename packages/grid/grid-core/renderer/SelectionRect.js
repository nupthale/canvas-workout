import { drawStrokeRect } from "../utils/draw.js";

export default class SelectionRect {
    constructor(context) {
        this.context = context;
        this.ctx = context.canvasCtx;
    }

    render({ selection }) {
        const activeCol = selection.activeCol;
        const selectionCol = selection.selectionCol;

        const rect = {
            x: activeCol.x,
            y: activeCol.y,
            width: activeCol.width,
            height: activeCol.height,
        };

        if (selectionCol) {
            rect.width = selectionCol.x + selectionCol.width - activeCol.x;
            rect.height = selectionCol.y + selectionCol.height - activeCol.y;
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
