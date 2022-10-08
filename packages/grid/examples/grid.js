import Grid from "../grid-core/index";

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
        rowHeights: {
            3: 200,
        },
        combineRanges: [
            { start: [3, 3], end: [3, 5] }
        ],
        decorators: {
            background: [{
                rowIndex: 3,
                colIndex: 3,
                color: 'rgba(238, 196, 87, 0.4)',
            }, {
                rowIndex: 6,
                colIndex: 6,
                color: '#FAEAFA',
            }, {
                rowIndex: 7,
                colIndex: 6,
                color: '#FAEAFA',
            }, {
                rowIndex: 8,
                colIndex: 6,
                color: '#FAEAFA',
            }]
        }
    });

    function getRandomColor() { //随机生成RGB颜色
        const r = Math.floor(Math.random() * 256); //随机生成256以内r值
        const g = Math.floor(Math.random() * 256); //随机生成256以内g值
        const b = Math.floor(Math.random() * 256); //随机生成256以内b值
        return `rgb(${r},${g},${b}, 0.4)`; //返回rgb(r,g,b)格式颜色
    }

    setInterval(() => {
        const randomColor1 = getRandomColor();
        const randomColor2 = getRandomColor();
        const rangeRandomNumber = Math.floor(9 * Math.random()) + 3;

        grid.update({
            columns,
            dataSource,
            fixedConfig: {
                left: 1,
                header: 1,
            },
            colWidths: {
                0: 50,
                1: 60,
                7: 60,
            },
            rowHeights: {
                3: 200,
            },
            combineRanges: [
                { start: [3, 3], end: [3, rangeRandomNumber] }
            ],
            decorators: {
                background: [{
                    rowIndex: 3,
                    colIndex: 3,
                    color: randomColor2,
                }, {
                    rowIndex: 6,
                    colIndex: 6,
                    color: randomColor1,
                }, {
                    rowIndex: 7,
                    colIndex: 6,
                    color: randomColor1,
                }, {
                    rowIndex: 8,
                    colIndex: 6,
                    color: randomColor1,
                }]
            }
        });
    }, 1500);
}
