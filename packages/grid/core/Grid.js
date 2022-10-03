
import {drawLine, drawText, drawRect, shadowRect, clipRect} from "./utils/draw.js";
import {strokeColor} from "./meta.js";

export default class Grid {
    constructor(ctx, scroller, dataManager, windowManager) {
        this.ctx = ctx;
        this.scroller = scroller;
        this.windowManager = windowManager;
        this.dataManager = dataManager;
    }

    renderFixed(fixedRows) {
        const { left, header, leftCorner } = fixedRows;
        const { scrollLeft = 0, scrollTop = 0 } = this.scroller;

        // 1. header
        if (header?.length) {
            shadowRect({
                ctx: this.ctx,
                x: this.windowManager.fixedManager.fixedLeftWidth,
                y: 0,
                w: this.windowManager.width - (this.windowManager.fixedManager.fixedLeftWidth || 0),
                h: this.windowManager.fixedManager.fixedHeaderHeight || 0,
            });

            this.renderRows(header, scrollLeft, 0);
        }

        // 2. 左
        if (left?.length) {
            shadowRect({
                ctx: this.ctx,
                x: 0,
                y: this.windowManager.fixedManager.fixedHeaderHeight || 0,
                w: this.windowManager.fixedManager.fixedLeftWidth,
                h: this.windowManager.height - (this.windowManager.fixedManager.fixedHeaderHeight || 0),
            });

            this.renderRows(left, 0, scrollTop);
        }

        // leftCorner
        if (leftCorner) {
            this.renderRows(leftCorner, 0, 0);
        }







        // 3. 右
    }


    renderCol(col, scrollLeft, scrollTop) {

        // 可优化，合并；
        // 画背景
        drawRect(
            this.ctx,
            col.x,
            col.y,
            col.width,
            col.height,
            '#fff',
        );

        // 画横线
        drawLine(
            this.ctx,
            col.x,
            col.y + col.height,
            col.x + col.width,
            col.y + col.height,
            strokeColor,
            2,
        );

        // 画竖线
        drawLine(
            this.ctx,
            col.x + col.width,
            col.y,
            col.x + col.width,
            col.y + col.height,
            strokeColor,
            2,
        );

        // 画内容
        drawText(
            this.ctx,
            this.dataManager.getText(col.rowIndex, col.colIndex),
            col.x + col.width /2,
            col.y + col.height / 2,
            {
                color: '#666',
                textAlign: 'center',
            },
        );
    }

    renderRows(rows, scrollLeft, scrollTop) {
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            for (let j = 0; j < row.cols.length; j++) {
                const col = row.cols[j];
                this.renderCol(col, scrollLeft, scrollTop);
            }
        }
    }

    render({ rows, fixedRows }) {
        const { scrollLeft = 0, scrollTop = 0 } = this.scroller;
        this.renderRows(rows, scrollLeft, scrollTop);

        console.info('##fixedrows', fixedRows);
        this.renderFixed(fixedRows);
    }
}
