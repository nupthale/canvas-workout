import Scrollable from "./Scrollable.js";
import FixedManager from "./fixedManager.js";

import Col from './Col';

export default class WindowManager {
    constructor($canvas, width, height, layout, dataManager, fixedConfig,  onUpdate) {
        this.width = width;
        this.height = height;

        // 左上角是在第几行，第几列
        this.startRowIndex = 0;
        this.endRowIndex = 0;
        this.startColIndex = 0;
        this.endColIndex = 0;

        this.visibleRows = [];

        this.fixedManager = new FixedManager(fixedConfig, layout, this);

        this.onUpdate = onUpdate;

        this.layout = layout;
        this.dataManager = dataManager;
        this.initScroller($canvas);

        this.init();
    }

    init() {
        this.updateVisibleRows();
    }

    initScroller($canvas) {
        this.scroller = new Scrollable({
            dom: $canvas,
            width: this.width,
            height: this.height,
            scrollWidth: this.layout.totalWidth,
            scrollHeight: this.layout.totalHeight,
            onScroll: () => {
                this.moveWindow();
                this.updateVisibleRows();
                this.onUpdate();
            }
        });

    }

    isVisible(x, y, width, height) {
        const { scrollLeft, scrollTop } = this.scroller;

        return ((y + height - scrollTop > 0 && y - scrollTop < this.height) &&
            (x + width - scrollLeft > 0 && x - scrollLeft < this.width))
    }

    isRowBelowStartLine(rowIndex) {
        if (rowIndex >= this.dataManager.rowLen) {
            return true;
        }

        if (rowIndex < 0) {
            return false;
        }

        const x = 0;
        const y = this.layout.getY(rowIndex);
        const height = this.layout.getRowHeight(rowIndex);
        const { scrollTop } = this.scroller;

        return y + height - scrollTop > 0;
    }

    isColAfterStartLine(colIndex) {
        if (colIndex < 0) {
            return false;
        }

        if (colIndex >= this.dataManager.colLen) {
            return true;
        }

        const x = this.layout.getX(colIndex);
        const width = this.layout.getColWidth(colIndex);
        const { scrollLeft } = this.scroller;

        return x + width - scrollLeft > 0;
    }

    // 会有长任务
    // moveWindow() {
    //     const { scrollTop, scrollLeft } = this.scroller;
    //
    //     for (let i = 0; i < this.dataManager.rowLen; i++) {
    //         const y = this.layout.getY(i);
    //
    //         if (y > scrollTop) {
    //             this.startRowIndex = i;
    //             break;
    //         }
    //     }
    //
    //     for (let i = 0; i < this.dataManager.colLen; i++) {
    //         const x = this.layout.getX(i);
    //
    //         if (x > scrollLeft) {
    //             this.startColIndex = i;
    //             break;
    //         }
    //     }
    // }

    moveWindow() {
        // 根据scrollTop 推算startRowIndex
        const { scrollTop, scrollLeft, prevScrollTop, prevScrollLeft } = this.scroller;
        // this.startRowIndex = Math.floor(scrollTop / cellStyle.height);
        // this.startColIndex = Math.floor(scrollLeft / cellStyle.width);

        const vDirection = scrollTop - prevScrollTop > 0 ? 'up' : 'down';
        let i = this.startRowIndex;
        switch(vDirection) {
            case 'up':
                // 从startRowIndex向下找第一个visible的， 包括自己
                while(
                    !this.isRowBelowStartLine(i) && i < this.dataManager.rowLen
                    ) {
                    i++;
                }
                this.startRowIndex = i;

                break;
            case 'down':
                // 从startRowIndex向上找到最后一个visible的， 包括自己；
                while(
                    this.isRowBelowStartLine(i) && i > 0
                    ) {
                    i--;
                }
                this.startRowIndex = i === 0 ? 0 : i + 1;

                break;
            default:
                break;
        }


        const hDirection = scrollLeft - prevScrollLeft > 0 ? 'left' : 'right';
        let j = this.startColIndex;
        switch(hDirection) {
            case 'left':
                // 从startColIndex向后找第一个visible的， 包括自己
                while(
                    !this.isColAfterStartLine(j) && j < this.dataManager.colLen
                    ) {
                    j++;
                }

                this.startColIndex = j;

                break;
            case 'right':
                // 从startColIndex向前找最后一个visible的， 包括自己；
                while(
                    this.isColAfterStartLine(j)
                    ) {
                    j--;
                }
                this.startColIndex = j < 0 ? 0 : j + 1;

                break;
            default:
                break;
        }
        console.info('####moveWindow', scrollLeft, prevScrollLeft, hDirection, this.startColIndex);


    }

    getWindowRowCount() {
        let endIndex = this.dataManager.rowLen - 1;
        const { scrollTop } = this.scroller;

        // 不算startRowIndex， 计算多少个数量， 可以占满屏幕， 多算也没关系
        for (let i = this.startRowIndex; i < this.dataManager.rowLen; i++) {
            if (this.layout.getY(i) - scrollTop > this.height) {
                endIndex = i;
                break;
            }
        }

        return endIndex;
    }

    getWindowColCount() {
        let endIndex = this.dataManager.colLen - 1;
        const { scrollLeft } = this.scroller;

        for (let i = this.startColIndex; i < this.dataManager.colLen; i++) {
            if (this.layout.getX(i) - scrollLeft > this.width) {
                endIndex = i;
                break;
            }
        }

        return endIndex;
    }

    updateVisibleRows() {
        this.visibleRows = [];

        for (let i = this.startRowIndex; i <= this.getWindowRowCount(); i++) {
            const rowY = this.layout.getY(i);
            const rowHeight =  this.layout.getRowHeight(i);

            const row = {
                x: 0,
                y: rowY,
                height: rowHeight,
                cols: [],
            };

            for (let j = this.startColIndex; j <= this.getWindowColCount(); j++) {
                const colX = this.layout.getX(j);

                const col = new Col(i, j, colX, rowY, this.layout.getColWidth(j), rowHeight, this.scroller, this.fixedManager.fixedConfig);

                row.cols.push(col);
                this.endColIndex = j;
            }
            if (!row.cols?.length) {
                debugger;
            }

            this.visibleRows.push(row);
            this.endRowIndex = i;
        }


        if (!this.visibleRows?.length) {
            debugger;
        }
        console.info('####visibleRows', this.visibleRows);

        this.fixedManager.updateFixedRows();
    }


    resize() {
        // todo
    }
}
