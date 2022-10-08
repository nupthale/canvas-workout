import {findColByEvent, getIndicatorBoundingRect} from "./util.js";
import {isEventInView} from "../utils/util.js";

export default class Selection {
    constructor(stage) {
        // 当前选中的Cell， 选区的min Cell
        this.activeCol = null;

        // 拖拽时，鼠标所在位置的cell， 选区的max Cell; 目前只支持单列选择
        this.selectionCol = null;

        this.stage = stage;
        this.initEvt();
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

    getClickedCol(eventX, eventY) {
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
            let clickedCol = findColByEvent(data, eventX, eventY);
            if (clickedCol) {
                result = clickedCol;
                break;
            }

        }

        return result;
    }

    isEnterIndicator(x, y) {
        if (!this.activeCol) {
            return false;
        }

        const indicator = getIndicatorBoundingRect(this.activeCol);
        console.info('xy', x, y, indicator);

        return isEventInView(x, y, indicator);
    }

    initEvt() {
        const { context } = this.stage;
        const { event$, dom } = context;

        event$.on('click', (e) => {
            const {left, top} = dom.getBoundingClientRect();
            const eventX = e.clientX - left;
            const eventY = e.clientY - top;

            this.activeCol = this.getClickedCol(eventX, eventY);
            this.stage.render();
        });

        event$.on('mousemove', (e) => {
            debugger
            const {left, top} = dom.getBoundingClientRect();
            const eventX = e.clientX - left;
            const eventY = e.clientY - top;


            if (this.isEnterIndicator(eventX, eventY)) {
                dom.style.cursor = 'crosshair';
            } else {
                dom.style.cursor = 'cell';
            }
        });
    }
}
