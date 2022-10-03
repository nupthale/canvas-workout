import Col from "./Col.js";

export default class FixedManager {
    constructor(fixedConfig, layout, windowManager) {
        this.fixedLeftRows = [];
        this.fixedRightRows = [];
        this.fixedHeaderRows = [];

        this.fixedConfig = fixedConfig;
        this.layout = layout;
        this.windowManager = windowManager;

        this.initFixedWidth();
    }

    initFixedWidth() {
        let fixedLeftWidth = 0;
        for (let i = 0; i < this.fixedConfig.left; i++) {
            fixedLeftWidth += this.layout.getColWidth(i);
        }
        this.fixedLeftWidth = fixedLeftWidth;

        let fixedHeaderHeight = 0;
        for (let i = 0; i < this.fixedConfig.header; i++) {
            fixedHeaderHeight += this.layout.getRowHeight(i);
        }
        this.fixedHeaderHeight = fixedHeaderHeight;
    }

    updateFixedRows() {
        const { left, right, header } = this.fixedConfig || {};

        const startRowIndex = this.windowManager.startRowIndex;
        const endRowIndex = this.windowManager.endRowIndex;
        const startColIndex = this.windowManager.startColIndex;
        const endColIndex = this.windowManager.endColIndex;

        this.fixedLeftRows = [];
        for (let i = startRowIndex; i <= endRowIndex; i++) {
            const rowY = this.layout.getY(i);
            const rowHeight =  this.layout.getRowHeight(i);

            const row = {
                x: 0,
                y: rowY,
                height: rowHeight,
                cols: [],
            };

            for (let j = 0; j < left; j++) {
                const colX = this.layout.getX(j);

                const col = new Col(i, j, colX, rowY, this.layout.getColWidth(j), rowHeight, this.windowManager.scroller, this.fixedConfig);

                row.cols.push(col);
            }
            this.fixedLeftRows.push(row);
        }

        this.fixedHeaderRows = [];
        for (let i = 0; i < header; i++) {
            const rowY = this.layout.getY(i);
            const rowHeight =  this.layout.getRowHeight(i);

            const row = {
                x: 0,
                y: rowY,
                height: rowHeight,
                cols: [],
            };

            for (let j = startColIndex; j <= endColIndex; j++) {
                const colX = this.layout.getX(j);

                const col = new Col(i, j, colX, rowY, this.layout.getColWidth(j), rowHeight, this.windowManager.scroller, this.fixedConfig);

                row.cols.push(col);
            }
            this.fixedHeaderRows.push(row);
        }

        this.leftCorderRows = [];
        for (let i = 0; i < this.fixedConfig.header; i++) {
            const rowY = this.layout.getY(i);
            const rowHeight =  this.layout.getRowHeight(i);

            const row = {
                x: 0,
                y: rowY,
                height: rowHeight,
                cols: [],
            };

            for (let j = 0; j < this.fixedConfig.left; j++) {
                const colX = this.layout.getX(j);

                const col = new Col(i, j, colX, rowY, this.layout.getColWidth(j), rowHeight, this.windowManager.scroller, this.fixedConfig);

                row.cols.push(col);
            }

            this.leftCorderRows.push(row);
        }
    }
}
