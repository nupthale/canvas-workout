import {cellStyle} from "../meta.js";

export default class Layout {
    constructor(rowCount, colCount, rowHeights, colWidths, fixedConfig) {
        this.rowCount = rowCount;
        this.colCount = colCount;

        this.rowHeights = rowHeights || {};
        this.colWidths = colWidths || {};

        this.fixedConfig = fixedConfig;

        this.xMap = {
            0: 0,
        };
        this.yMap = {
            0: 0,
        };

        this.totalWidth = this._getTotalWidth();
        this.totalHeight = this._getTotalHeight();

        this.init();
        this.initFixedWidth();
    }

    initFixedWidth() {
        let fixedLeftWidth = 0;
        for (let i = 0; i < this.fixedConfig.left; i++) {
            fixedLeftWidth += this.getColWidth(i);
        }
        this.fixedLeftWidth = fixedLeftWidth;

        let fixedHeaderHeight = 0;
        for (let i = 0; i < this.fixedConfig.header; i++) {
            fixedHeaderHeight += this.getRowHeight(i);
        }
        this.fixedHeaderHeight = fixedHeaderHeight;
    }

    _getTotalWidth() {
        let totalWidth = 0;
        for (let i = 0; i < this.colCount; i++) {
            totalWidth += this.getColWidth(i);
        }

        return totalWidth;
    }

    _getTotalHeight() {
        let totalHeight = 0;
        for (let i = 0; i < this.rowCount; i++) {
            totalHeight += this.getRowHeight(i);
        }

        return totalHeight;
    }

    getColWidth(colIndex) {
        return this.colWidths[colIndex] === undefined ? cellStyle.width : this.colWidths[colIndex];
    }

    getRowHeight(rowIndex) {
        return this.rowHeights[rowIndex] === undefined ? cellStyle.height : this.rowHeights[rowIndex];
    }

    // 如果优化，可以做成cache，用到的时候计算， 不用第一次全部计算；目前100w条 ，耗时80+ms，虽然长任务，但是可以接受；
    init() {
        this.update();
    }

    update() {
        for (let i = 1; i < this.rowCount; i++) {
            this.yMap[i] = this.yMap[i - 1] + this.getRowHeight(i - 1);
        }

        for (let i = 1; i < this.colCount; i++) {
            this.xMap[i] = this.xMap[i - 1] + this.getColWidth(i - 1);
        }
    }

    getX(colIndex) {
        return this.xMap[colIndex];
    }

    getY(rowIndex) {
        return this.yMap[rowIndex];
    }
}
