import {PIXEL_RATIO} from "./utils/util.js";
import Layout from "./Layout.js";

import Grid from "./Grid.js";
import WindowManager from "./WindowManager.js";
import FixedManager from "./fixedManager.js";


import DataManager from "./DataManager";


const strokeColor = '#e8ebed';

export default class Stage {
    constructor({
        $canvas,
        width,
        height,
        columns = [],
        dataSource = [],
        fixedConfig,
        rowHeights,
        colWidths,
    }) {
        this.$canvas = $canvas;
        this.initCanvas(width, height);


        this.dataManager = new DataManager(columns, dataSource);
        this.layout = new Layout(dataSource.length, columns.length, rowHeights, colWidths);

        this.windowManager = new WindowManager($canvas, width, height, this.layout, this.dataManager, fixedConfig,  (rows) => {
            this.paint();
        });

        this.grid = new Grid(this.ctx, this.windowManager.scroller, this.dataManager,this.windowManager);

        this.paint();
    }

    initCanvas(width, height) {
        this.ctx = this.$canvas.getContext('2d');
        this.$canvas.width = width * PIXEL_RATIO;
        this.$canvas.height = height * PIXEL_RATIO;
        this.$canvas.style.width = `${width}px`;
        this.$canvas.style.height = `${height}px`;

        this.ctx.setTransform(PIXEL_RATIO, 0, 0 , PIXEL_RATIO, 0, 0);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '14px';
        this.ctx.textBaseline = 'middle';
        this.ctx.strokeStyle = strokeColor;
    }

    // 滑动窗口， 分别计算startRowIndex, endRowIndex; startColIndex、endColIndex， 根据startRowIndex，进行layout计算
    paint() {
        this.ctx.clearRect(0, 0, this.windowManager.width, this.windowManager.height);
        this.grid.render({
            rows: this.windowManager.visibleRows,
            fixedRows: {
                leftCorner: this.windowManager.fixedManager.leftCorderRows,
                left: this.windowManager.fixedManager.fixedLeftRows,
                header: this.windowManager.fixedManager.fixedHeaderRows,
            }
        })
    }
}
