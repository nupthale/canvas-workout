import GridApp from "../grid-app/index";

import {columns, dataSource} from "./mock.js";

export default function gridExample(canvasId, toolbarId) {
    const $canvas = document.getElementById(canvasId);
    const $toolbar = document.getElementById(toolbarId);

    const width = document.documentElement.clientWidth - 40;
    const height = document.documentElement.clientHeight - 120;

    const grid = new GridApp({
        $toolbar,
        $canvas,
        width,
        height,
        columns,
        dataSource,
    });
}
