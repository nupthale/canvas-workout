import { drawRect } from "../utils/draw.js";

export default class Scrollbar {
    constructor(context) {
        this.context = context;
        this.ctx = context.canvasCtx;
    }

    prepare() {
        this.ctx.save();
    }

    render({ scrollbar }) {
        this.prepare();

        const { viewport } = this.context;
        const {
            isHorizontalScrollable,
            isVerticalScrollable,
        } = viewport;

        const {
            vScrollbar,
            hScrollbar,
        } = scrollbar;

        // 画横向的滚动handler
        if (isHorizontalScrollable) {
            drawRect(
                this.ctx,
                hScrollbar.x,
                hScrollbar.y,
                hScrollbar.width,
                hScrollbar.height,
                hScrollbar.isHover ? '#6B6B6B' : 'rgba(193, 193, 193, 0.7)',
                4,
            );
        }

        // 画纵向的滚动条handler
        if (isVerticalScrollable) {
            drawRect(
                this.ctx,
                vScrollbar.x,
                vScrollbar.y,
                vScrollbar.width,
                vScrollbar.height,
                vScrollbar.isHover ? '#6B6B6B' : 'rgba(193, 193, 193, 0.7)',
                4,
            );
        }

        this.ctx.restore();
    }
}
