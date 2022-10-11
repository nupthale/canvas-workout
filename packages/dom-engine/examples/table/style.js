import {cellStyle, containerPadding, height, strokeColor, width} from "./meta.js";

import {dataSource, columns} from "./mock.js";

export const tableWidth = columns.reduce((acc, crt) => {
    return acc + (crt.width || cellStyle.width);
}, 0);

export const tableHeight = (1 + dataSource.length) * cellStyle.height;

const border = [
    { color: strokeColor, width: 1 },
    { color: strokeColor, width: 1 },
    { color: strokeColor, width: 1 },
    { color: strokeColor, width: 1 },
];

export const style = {
    container: {
        width,
        height,
        border: [],
        padding: [containerPadding, containerPadding, containerPadding, containerPadding],
        backgroundColor: '#eee',
    },
    table: {
        position: 'relative',
        zIndex: 1,
        width: tableWidth,
        height: tableHeight,
        padding: [0, 0, 0, 0],
        border: [],
        backgroundColor: '#fff',
    },
    thead: {
        position: 'sticky',
        top: 0,
        width: tableWidth,
        height: cellStyle.height,
        padding: [0, 0, 0, 0],
        border: [],
        boxShadow: [0, 8, 8, '#eee'],
        zIndex: 3,
    },
    tbody: {
        width: tableWidth,
        height: dataSource.length * cellStyle.height,
        padding: [0, 0, 0, 0],
        border: [],
    },
    row: {
        width: tableWidth,
        height: cellStyle.height,
        padding: [0, 0, 0, 0],
        border: [],
    },
    col: {
        display: 'inline-block',
        width: cellStyle.width,
        height: cellStyle.height,
        border,
        padding: [4, 8, 4, 8],
        color: "#666",
        backgroundColor: "#fff",
        verticalAlign: 'middle',
    }
};
