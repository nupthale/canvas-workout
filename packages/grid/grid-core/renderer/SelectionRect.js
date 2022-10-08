import { drawStrokeRect } from "../utils/draw.js";

export default class SelectionRect {
    constructor(context) {
        this.context = context;
        this.ctx = context.canvasCtx;
    }

    render({ selection }) {
        const activeCol = selection.activeCol;

        if (activeCol) {
            drawStrokeRect(
                this.ctx,
                activeCol.x,
                activeCol.y,
                activeCol.width,
                activeCol.height,
                2,
                'rgba(69, 128, 230, 1)',
                4,
            );
        }
    }
}
