import { drawLine } from '../utils/draw';

export default class Resize {
    constructor(context) {
        this.context = context;
        this.isMouseDown = false;
        this.selectedCol = null;
        this.lineX = 0;
        this.initEvt();
    }

    matchCol(e, callback) {
        const { dom, layout, config, stage } = this.context;
        const rows = stage.clippedData.clippedData;

        const {left, top} = dom.getBoundingClientRect();
        const eventX = e.clientX - left;
        const eventY = e.clientY - top;
        const row = rows[0];
        const rowHeight = row.height;

        if (eventX <= 0 || eventY <= 0) {
            return;
        }

        const { scrollLeft = 0 } = this.context.viewport;

        for (let j = 0; j < row.cols.length; j++) {
            const col = row.cols[j];
            const colIndex = col.colIndex;

            // 这里需要以layout的xMap为准
            const colWidth = config?.colWidths?.[colIndex] ?? col.width;
            const lineX = layout.xMap[colIndex] - scrollLeft + colWidth;

            // 判断这一列是否在高亮的范围内
            if (eventX > lineX - 5 && eventX < lineX + 5 && eventY < rowHeight) {
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

    initEvt() {
        const { event$, dom, stage, layout } = this.context;

        event$.on('mousedown', (e) => {
            this.isMouseDown = true;
            this.matchCol(e);
        });

        event$.on('mouseup', () => {
            this.isMouseDown = false;
            this.selectedCol = null;
        });

        event$.on('mousemove', (e) => {
            const {left} = dom.getBoundingClientRect();
            const eventX = e.clientX - left;
            this.lineX = eventX;

            if (this.selectedCol) {
                const colIndex = this.selectedCol.colIndex;
                const { scrollLeft = 0 } = this.context.viewport;
                // 新的rect宽度
                const width = eventX - (layout.xMap[colIndex] - scrollLeft);

                // resize的同时判断，如果滚到了边界，就需要scroll加resize。
                if (this.selectedCol && width > 0) {
                    stage.colResize({
                        colIndex,
                        width,
                    });
                }
            } else {
                this.matchCol(e, () => {
                    dom.style.cursor = 'col-resize'
                })
            }
            // 保证优先级在ExpandableSelection后面，这样才能渲染新的dom cursor
        }, -1)
    }
}