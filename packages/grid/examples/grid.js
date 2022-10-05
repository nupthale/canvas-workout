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
            0: 60,
            1: 60,
        }
    });
}
