import Grid from "../core/index";

import {columns, dataSource} from "./mock.js";

const width = document.documentElement.clientWidth - 40;
const height = document.documentElement.clientHeight - 40;


export default function gridExample(canvasId) {
    const $canvas = document.getElementById(canvasId);

    const grid = new Grid({
        $canvas,
        width,
        height,
        columns,
        dataSource,
        fixedConfig: {
            left: 2,
            header: 2,
        }
    });
}
