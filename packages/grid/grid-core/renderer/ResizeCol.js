import { drawLine } from '../utils/draw';

// 鼠标移动到列线上的时候激活线条渲染
export default class ResizeCol {
    constructor(context) {
        this.context = context;
    }

    render() {
        const { canvasCtx, stage } = this.context;
        const resize = stage.resize;
        
        // 如果有选中列，渲染选中竖条
        if (resize.selectedCol && resize.isMouseDown) {
            const lineX = resize.lineX;

            const width = lineX - resize.selectedCol.x;
            if (width > 0) {
                drawLine(canvasCtx, lineX, 0, lineX, document.body.clientHeight, 'rgba(69, 128, 230, 1)', 2);
            }
        }
    }
}