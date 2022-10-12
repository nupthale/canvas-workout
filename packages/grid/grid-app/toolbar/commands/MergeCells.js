import {dispatch} from "../../store/index.js";

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
            const { selection } = this.grid;
            const { activeCol, selectionCol } = selection;

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

                if (!combineRange) {
                    dispatch({
                        type: 'mergeCells',
                        payload,
                    })
                } else {
                    const newPayload = {
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
