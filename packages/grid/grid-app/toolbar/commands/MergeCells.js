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

                const hasCross = getIsCross(combineRanges, payload)

                if (!hasCross) {
                    dispatch({
                        type: 'mergeCells',
                        payload,
                    })
                } else {
                    dispatch({
                        type: 'replaceMergeCells',
                        payload: payload,
                    })
                }
            }
        });
    }
}
