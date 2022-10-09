
import {drawLine, drawText, drawRect, shadowRect, clipRect} from "../utils/draw.js";
import {strokeColor, borderWidth} from "../meta.js";

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
        // 不使用封装方法原因， 尽量减少ctx操作， 优化性能
        // 可优化，合并；
        this.ctx.beginPath();
        this.ctx.strokeStyle = strokeColor;
        this.ctx.lineWidth = borderWidth;

        // 画内容
        if (!col.isCombined || col.isCombinedStart) {
            this.ctx.beginPath();
            // 画底层白色, 防止透明
            this.ctx.fillStyle = '#fff';
            this.ctx.fillRect(col.x, col.y, col.combineWidth, col.combineHeight);

            // 画上层背景
            this.ctx.fillStyle = col.background;
            this.ctx.fillRect(col.x, col.y, col.combineWidth, col.combineHeight);

            this.ctx.fillStyle = col.colIndex === 0 ? '#999' : '#333';
            this.ctx.fillText(config.getText(col.rowIndex, col.colIndex), col.x + col.combineWidth / 2, col.y + col.combineHeight / 2);
        }

        // 画横线
        if (!col.isCombined || col.isCombinedLastRow) {
            this.ctx.moveTo(col.x, col.y + col.height);
            this.ctx.lineTo(col.x + col.width, col.y + col.height);
        }

        // 画竖线
        if (!col.isCombined || col.isCombinedLastCol) {
            this.ctx.moveTo(col.x + col.width, col.y + col.height);
            this.ctx.lineTo(col.x + col.width, col.y);
        }

        this.ctx.stroke();
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

    renderCenterRows(rows) {
        // 先clip
        const { viewport, layout } = this.context;

        clipRect(
            this.ctx,
            layout.fixedLeftWidth,
            layout.fixedHeaderHeight,
            viewport.width - layout.fixedLeftWidth,
            viewport.height - layout.fixedHeaderHeight,
            () => {
                this.renderRows(rows);
            }
        );
    }

    getFontArr() {
        const fontSize = '12px';
        const fontFamily = 'SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace';
        const fontWeight = 'normal';

        return [fontWeight, fontSize, fontFamily];
    }

    prepare() {
        this.ctx.save();

        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = '#000';
        // this.ctx.textBaseline = style.textBaseline;
        this.ctx.font = this.getFontArr().join(' ');
    }

    render({ rows, fixedRows }) {
        this.prepare();

        this.renderCenterRows(rows);
        this.renderFixed(fixedRows);

        this.ctx.restore();
    }
}
