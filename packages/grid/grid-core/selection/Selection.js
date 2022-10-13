import {findColByEvent } from "./util.js";

export default class Selection {
    constructor(stage) {
        // 当前选中的Cell， 选区的min Cell
        this.activeCol = null;

        // 拖拽时，鼠标所在位置的cell， 选区的max Cell; 目前只支持单列选择
        this.selectionCol = null;

        this.stage = stage;
        this.initSelectionEvt();

        // 按住鼠标拖动
        this.isMouseDown = false;
    }

    get selection() {
        if (!this.activeCol || !this.selectionCol) {
            return null;
        }

        return {
            min: {
                row: Math.min(this.activeCol.rowIndex, this.selectionCol.rowIndex),
                col: Math.min(this.activeCol.colIndex, this.selectionCol.colIndex),
            },
            max: {
                row: Math.max(this.activeCol.rowIndex, this.selectionCol.rowIndex),
                col: Math.max(this.activeCol.colIndex, this.selectionCol.colIndex),
            }
        }
    }

    getCol(eventX, eventY, scrollTop) {
        const { clippedData, fixedData } = this.stage;

        const clippedDataProcess = clippedData.clippedData.map(data => {
            return {
                ...data,
                y: data.y - scrollTop
            }
        })

        // 先找fixed， 没找到再找clipped
        const rows = [
            fixedData.fixedHeaderRows,
            fixedData.fixedLeftRows,
            fixedData.leftCornerRows,
            fixedData.fixedRightRows,
            clippedDataProcess,
        ];

        // 先找fixed， 没找到再找clipped
        let result = null;
        for (let i = 0; i < rows.length; i++) {
            const data = rows[i];
            let clickedCol = findColByEvent(data, eventX, eventY);
            if (clickedCol) {
                result = clickedCol;
                break;
            }
        }

        return result;
    }

    getColByIndex(rowIndex, colIndex) {
        const { clippedData, fixedData } = this.stage;

        // 先找fixed， 没找到再找clipped
        const rows = [
            fixedData.fixedHeaderRows,
            fixedData.fixedLeftRows,
            fixedData.leftCornerRows,
            fixedData.fixedRightRows,
            clippedData.clippedData,
        ];

        // 先找fixed， 没找到再找clipped
        let result = null;
        for (let i = 0; i < rows.length; i++) {
            const data = rows[i];

            data.forEach(item => {
                for(let j = 0; j < item.cols.length; j++) {
                    if (item.cols[j].rowIndex === rowIndex && item.cols[j].colIndex === colIndex) {
                        result = item.cols[j]
                        break
                    }
                }
            })
            if (result) {
                break
            }
        }

        return result;
    }

    initSelectionEvt() {
        const { context } = this.stage;
        const { event$, dom, viewport } = context;

        event$.on('mousedown', (e) => {
            this.isMouseDown = true
            const {left, top} = dom.getBoundingClientRect();
            const { scrollTop } = viewport
            const eventX = e.clientX - left;
            const eventY = e.clientY - top;

            this.activeCol = this.getCol(eventX, eventY, scrollTop);
            if (this.activeCol.combineRange) {
                this.activeCol = this.getColByIndex(this.activeCol.combineRange.start[0], this.activeCol.combineRange.start[1])
            }
            this.stage.render();
        });

        event$.on('mousemove', () => {
            if (this.isMouseDown) {
                this.stage.render();
            }
        })

        event$.on('mouseup', () => {
            this.isMouseDown = false
        })
    }
}
