
import {drawLine, drawText, drawRect, shadowRect, clipRect} from "../utils/draw.js";
import {strokeColor} from "../meta.js";

export default class Grid {
    constructor(context) {
        this.context = context;

        this.ctx = context.canvasCtx;
    }

    renderFixed(fixedRows) {
        const { left, header, leftCorner } = fixedRows;
        const { viewport, layout } = this.context;

        // 1. header
        if (header?.length) {
            shadowRect({
                ctx: this.ctx,
                x: layout.fixedLeftWidth,
                y: 0,
                w: viewport.width - (layout.fixedLeftWidth || 0),
                h: layout.fixedHeaderHeight || 0,
            });

            this.renderRows(header);
        }

        // 2. 左
        if (left?.length) {
            shadowRect({
                ctx: this.ctx,
                x: 0,
                y: layout.fixedHeaderHeight || 0,
                w: layout.fixedLeftWidth,
                h: viewport.height - (layout.fixedHeaderHeight || 0),
            });

            this.renderRows(left);
        }

        // leftCorner
        if (leftCorner) {
            this.renderRows(leftCorner);
        }

        // 3. 右
    }

    renderCol(col) {
        const { config } = this.context;

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
            config.getText(col.rowIndex, col.colIndex),
            col.x + col.width /2,
            col.y + col.height / 2,
            {
                color: '#000',
                textAlign: 'center',
            },
        );
    }

    renderRows(rows) {
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            for (let j = 0; j < row.cols.length; j++) {
                const col = row.cols[j];
                this.renderCol(col);
            }
        }
    }

    render({ rows, fixedRows }) {
        this.renderRows(rows);
        this.renderFixed(fixedRows);
    }
}
