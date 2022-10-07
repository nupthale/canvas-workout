import Grid from "../core/index";

import {columns, dataSource} from "./mock.js";

export default function gridExample(canvasId) {
    const $canvas = document.getElementById(canvasId);

    const width = document.documentElement.clientWidth - 40;
    const height = document.documentElement.clientHeight - 40;

    const grid = new Grid({
        $canvas,
        width,
        height,
        columns,
        dataSource,
        fixedConfig: {
            left: 2,
            header: 2,
        },
        colWidths: {
            0: 100,
            1: 60,
            7: 60,
        },
        combineRanges: [
            { start: [3, 3], end: [3, 5] }
        ],
        decorators: {
            background: [{
                rowIndex: 6,
                colIndex: 6,
                color: '#F59571',
            }, {
                rowIndex: 7,
                colIndex: 6,
                color: '#F59571',
            }, {
                rowIndex: 8,
                colIndex: 6,
                color: '#F59571',
            }]
        }
    });
}
