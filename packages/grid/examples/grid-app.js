import GridApp from "../grid-app/index";

import {columns, dataSource} from "./mock.js";

export default function gridExample(canvasId, toolbarId) {
    const $canvas = document.getElementById(canvasId);
    const $toolbar = document.getElementById(toolbarId);

    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight - 40;

    const grid = new GridApp({
        $toolbar,
        $canvas,
        width,
        height,
        columns,
        dataSource,
    });
}
