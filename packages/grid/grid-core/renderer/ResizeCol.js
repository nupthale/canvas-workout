import { drawLine } from '../utils/draw';

// 鼠标移动到列线上的时候激活线条渲染
export default class ResizeCol {
    constructor(context) {
        this.context = context;
        this.isMouseDown = false;
        this.selectedCol = null;
    }

    matchCol(e, rows, callback) {
        const { dom, layout, canvasCtx } = this.context;
        const {left, top} = dom.getBoundingClientRect();
        const eventX = e.clientX - left;
        const eventY = e.clientY - top;
        const row = rows[0];
        const rowHeight = row.height;

        for (let j = 0; j < row.cols.length; j++) {
            const col = row.cols[j];
            // 这里需要以layout的xMap为准
            const lineX = layout.xMap[j] + col.combineWidth

            // 判断这一列是否在高亮的范围内
            if (lineX <= eventX + 5 && lineX > eventX - 5 && eventY < rowHeight) {
                if (callback) {
                    // 高亮
                    callback();
                } else {
                    // 选中
                    this.selectedCol = col;
                }
            }
        }
    }

    render({ rows }) {
        const { event$, dom, canvasCtx, stage } = this.context;

        event$.on('mousedown', (e) => {
            this.isMouseDown = true;
            this.matchCol(e, rows);
        });

        event$.on('mouseup', () => {
            this.isMouseDown = false;
            this.selectedCol = null;
        });

        event$.on('mousemove', (e) => {
            if (this.isMouseDown) {
                // 拖动resize
                const {left} = dom.getBoundingClientRect();
                const eventX = e.clientX - left;
                const colIndex = this.selectedCol.colIndex;
                // 新的rect宽度
                const width = eventX - this.selectedCol.x;
                drawLine(canvasCtx, eventX - 1, 0, eventX - 1, document.body.clientHeight, 'red', 3);

                if (this.selectedCol && width) {
                    stage.colResize({
                        colIndex,
                        width,
                    })
                }
            } else {
                this.matchCol(e, rows, () => {
                    dom.style.cursor = 'col-resize'
                })
            }
            // 保证优先级在ExpandableSelection后面，这样才能渲染新的dom cursor
        }, -1)
    }
}