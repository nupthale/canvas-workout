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

        $container.innerHTML = '<svg t="1666101131550" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2099" width="18" height="18"><path d="M482.2 508.4L331.3 389c-3-2.4-7.3-0.2-7.3 3.6V478H184V184h204v128c0 2.2 1.8 4 4 4h60c2.2 0 4-1.8 4-4V144c0-15.5-12.5-28-28-28H144c-15.5 0-28 12.5-28 28v736c0 15.5 12.5 28 28 28h284c15.5 0 28-12.5 28-28V712c0-2.2-1.8-4-4-4h-60c-2.2 0-4 1.8-4 4v128H184V546h140v85.4c0 3.8 4.4 6 7.3 3.6l150.9-119.4c2.4-1.8 2.4-5.4 0-7.2zM880 116H596c-15.5 0-28 12.5-28 28v168c0 2.2 1.8 4 4 4h60c2.2 0 4-1.8 4-4V184h204v294H700v-85.4c0-3.8-4.3-6-7.3-3.6l-151 119.4c-2.3 1.8-2.3 5.3 0 7.1l151 119.5c2.9 2.3 7.3 0.2 7.3-3.6V546h140v294H636V712c0-2.2-1.8-4-4-4h-60c-2.2 0-4 1.8-4 4v168c0 15.5 12.5 28 28 28h284c15.5 0 28-12.5 28-28V144c0-15.5-12.5-28-28-28z" p-id="2100"></path></svg>';

        const $text = document.createElement('div');
        $text.style.marginLeft = '6px';
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
