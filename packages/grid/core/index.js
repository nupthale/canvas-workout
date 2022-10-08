import {PIXEL_RATIO} from "./utils/util.js";
import Layout from "./data/Layout.js";

import Viewport from "./components/Viewport.js";
import ClippedData from "./data/ClippedData.js";
import FixedData from "./data/FixedData.js";
import Renderer from './renderer/Renderer';

import EventRegistry from "./event/EventRegistry.js";

import Config from "./data/Config";

import {strokeColor} from "./meta.js";

export default class Stage {
    constructor(props) {
        const {
            $canvas,
            width,
            height,
        } = props;

        this.$canvas = $canvas;
        this.initCanvas(width, height);
        this.initContext(props);

        this.clippedData = new ClippedData(this.context);
        this.fixedData = new FixedData(this.context);

        // 滑动窗口， 分别计算startRowIndex, endRowIndex; startColIndex、endColIndex， 根据startRowIndex，进行layout计算
        this.renderer = new Renderer(this.context);

        this.render();
    }

    initContext(props) {
        const {
            $canvas,
            columns = [],
            dataSource = [],
            rowHeights,
            colWidths,
            fixedConfig,
        } = props;

        this.context = {
            stage: this,
            dom: $canvas,
            event$: new EventRegistry($canvas),
            canvasCtx: this.ctx,
            config: new Config({
                dom: $canvas,
                ...props,
            }),
            layout: new Layout(dataSource.length, columns.length, rowHeights, colWidths, fixedConfig),
        };

        this.context.viewport = new Viewport({
            context: this.context,
            onUpdate: this.handleViewportUpdate.bind(this),
        });

        this.context.viewport.moveWindow();
        this.context.viewport.scrollbar.update();
    }

    initCanvas(width, height) {
        this.ctx = this.$canvas.getContext('2d');
        this.$canvas.width = width * PIXEL_RATIO;
        this.$canvas.height = height * PIXEL_RATIO;
        this.$canvas.style.width = `${width}px`;
        this.$canvas.style.height = `${height}px`;
        this.$canvas.style.background = '#fff';

        this.ctx.setTransform(PIXEL_RATIO, 0, 0 , PIXEL_RATIO, 0, 0);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '14px';
        this.ctx.textBaseline = 'middle';
        this.ctx.strokeStyle = strokeColor;
    }

    handleViewportUpdate() {
        this.clippedData.update(this.context);
        this.fixedData.update(this.context);

        this.render();
    }

    render() {
        this.renderer.paint({
            scrollbar: this.context.viewport.scrollbar,
            rows: this.clippedData.clippedData,
            fixedRows: {
                leftCorner: this.fixedData.leftCornerRows,
                left: this.fixedData.fixedLeftRows,
                header: this.fixedData.fixedHeaderRows,
            }
        });
    }

    update(props) {
        const {
            columns = [],
            dataSource = [],
            rowHeights,
            colWidths,
            fixedConfig,
            shouldLayout,
        } = props;

        this.context.config = new Config({
            dom: this.$canvas,
            ...props,
        });

        if (shouldLayout) {
            this.context.layout = new Layout(dataSource.length, columns.length, rowHeights, colWidths, fixedConfig);
        }

        this.context.viewport.moveWindow();
        this.context.viewport.scrollbar.update();

        this.clippedData = new ClippedData(this.context);
        this.fixedData = new FixedData(this.context);

        this.render();
    }
}
