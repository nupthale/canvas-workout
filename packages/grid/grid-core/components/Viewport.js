import Scrollable from "./Scrollable.js";

export default class Viewport extends Scrollable {
    constructor({ context, onUpdate }) {
        const { dom, config, layout } = context;
        const { width, height } = config || {};
        const { totalWidth, totalHeight } = layout;

        super({
            dom,
            context,
            width,
            height,
            scrollWidth: totalWidth,
            scrollHeight: totalHeight,
            onScroll: () => {
                this.moveWindow();

                onUpdate?.();
            },
        });

        this.layout = layout;

        // 左上角是在第几行，第几列
        this.startRowIndex = 0;
        this.endRowIndex = 0;
        this.startColIndex = 0;
        this.endColIndex = 0;
    }

    updateEndRowIndex() {
        let endIndex = this.layout.rowCount - 1;
        const { scrollTop } = this;

        // 不算startRowIndex， 计算多少个数量， 可以占满屏幕， 多算也没关系
        for (let i = this.startRowIndex; i < this.layout.rowCount; i++) {
            if (this.layout.getY(i) - scrollTop > this.height) {
                endIndex = i;
                break;
            }
        }

        this.endRowIndex = endIndex;
    }

    updateEndColIndex() {
        let endIndex = this.layout.colCount - 1;
        const { scrollLeft } = this;

        for (let i = this.startColIndex; i < this.layout.colCount; i++) {
            if (this.layout.getX(i) - scrollLeft > this.width) {
                endIndex = i;
                break;
            }
        }

        this.endColIndex = endIndex;
    }

    isRowBelowStartLine(rowIndex) {
        if (rowIndex >= this.layout.rowCount) {
            return true;
        }

        if (rowIndex < 0) {
            return false;
        }

        const y = this.layout.getY(rowIndex);
        const height = this.layout.getRowHeight(rowIndex);
        const { scrollTop } = this;

        return y + height - scrollTop > 0;
    }

    isColAfterStartLine(colIndex) {
        if (colIndex < 0) {
            return false;
        }

        if (colIndex >= this.layout.colCount) {
            return true;
        }

        const x = this.layout.getX(colIndex);
        const width = this.layout.getColWidth(colIndex);
        const { scrollLeft } = this;

        return x + width - scrollLeft > 0;
    }

    updateStartColIndex(direction) {
        let j = this.startColIndex;

        switch(direction) {
            case 'left':
                // 从startColIndex向后找第一个visible的， 包括自己
                while(
                    !this.isColAfterStartLine(j) && j < this.layout.colCount
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
    }

    updateStartRowIndex(direction) {
        let i = this.startRowIndex;

        switch(direction) {
            case 'up':
                // 从startRowIndex向下找第一个visible的， 包括自己
                while(
                    !this.isRowBelowStartLine(i) && i < this.layout.rowCount
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
    }

    moveWindow() {
        // 根据scrollTop 推算startRowIndex
        const { scrollTop, scrollLeft, prevScrollTop, prevScrollLeft } = this;
        // this.startRowIndex = Math.floor(scrollTop / cellStyle.height);
        // this.startColIndex = Math.floor(scrollLeft / cellStyle.width);

        const hDirection = scrollLeft - prevScrollLeft > 0 ? 'left' : 'right';
        this.updateStartColIndex(hDirection)

        const vDirection = scrollTop - prevScrollTop > 0 ? 'up' : 'down';
        this.updateStartRowIndex(vDirection);

        this.updateEndRowIndex();
        this.updateEndColIndex();
    }
}
