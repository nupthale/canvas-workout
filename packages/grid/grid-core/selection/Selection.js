import {findColByEvent } from "./util.js";

export default class Selection {
    constructor(stage) {
        // 当前选中的Cell， 选区的min Cell
        this.activeCol = null;

        // 拖拽时，鼠标所在位置的cell， 选区的max Cell; 目前只支持单列选择
        this.selectionCol = null;

        this.stage = stage;
        this.initSelectionEvt();
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

    initSelectionEvt() {
        const { context } = this.stage;
        const { event$, dom, viewport } = context;

        event$.on('mousedown', (e) => {
            const {left, top} = dom.getBoundingClientRect();
            const { scrollTop } = viewport
            const eventX = e.clientX - left;
            const eventY = e.clientY - top;

            this.activeCol = this.getCol(eventX, eventY, scrollTop);
            this.stage.render();
        });
    }
}
