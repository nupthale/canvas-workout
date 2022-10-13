import {dispatch} from "../../store/index.js";

import { getIsCross } from '../../../grid-core/renderer/utils'

export default class MergeCells {
    constructor(grid) {
        this.dom = this.initDom();
        this.grid = grid;

        this.initEvt();
    }

    initDom() {
        const $container = document.createElement('div');
        $container.classList.add('command');

        const $text = document.createElement('div');
        $text.innerText = 'Merge cells';

        $container.appendChild($text);

        return $container;
    }

    initEvt() {
        this.dom.addEventListener('click', () => {
            const { selection, context } = this.grid;
            const { activeCol, selectionCol } = selection;
            const { combineRanges = [] } = context.config || {}

            if (activeCol && selectionCol) {

                let startRowIndex = activeCol.rowIndex;
                let startColIndex = activeCol.colIndex;
                let endRowIndex = activeCol.rowIndex;
                let endColIndex = activeCol.colIndex;

                if (selectionCol) {
                    endRowIndex = selectionCol.rowIndex;
                    endColIndex = selectionCol.colIndex;
                }

                // 获得开始 - 结束的行、列
                const payload = {
                    start: [startRowIndex, startColIndex],
                    end: [endRowIndex, endColIndex]
                };

                const combineRange = activeCol.combineRange;

                // 看是否和现有的combineRanges有相交
                const selectRange = {
                    start: [activeCol.rowIndex, activeCol.colIndex],
                    end: [selectionCol.rowIndex, selectionCol.colIndex]
                }
                const hasCross = getIsCross(combineRanges, selectRange)

                if (!combineRange && !hasCross) {
                    dispatch({
                        type: 'mergeCells',
                        payload,
                    })
                } else {
                    const newPayload = hasCross ? {
                        start: [Math.min(startRowIndex, selectRange.start[0]), Math.min(startColIndex, selectRange.start[1])],
                        end: [Math.max(endRowIndex, selectRange.end[0]), Math.max(endColIndex, selectRange.end[1])]
                    } : {
                        start: [Math.min(startRowIndex, combineRange.start[0]), Math.min(startColIndex, combineRange.start[1])],
                        end: [Math.max(endRowIndex, combineRange.end[0]), Math.max(endColIndex, combineRange.end[1])]
                    }

                    dispatch({
                        type: 'replaceMergeCells',
                        payload: {
                            origin: combineRange,
                            newPayload,
                        }
                    })
                }
            }
        });
    }
}
