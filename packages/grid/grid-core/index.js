import {PIXEL_RATIO} from "./utils/util.js";
import Layout from "./data/Layout.js";

import Viewport from "./components/Viewport.js";
import ClippedData from "./data/ClippedData.js";
import FixedData from "./data/FixedData.js";
import Renderer from './renderer/Renderer';

import EventRegistry from "./event/EventRegistry.js";

import ExpandableSelection from "./selection/ExpandableSelection.js";
import Resize from './resize/index';

import Config from "./data/Config";

import {strokeColor} from "./meta.js";

export default class Stage {
    constructor(props) {
        const {
            $canvas,
            width,
            height,
            onColResize,
        } = props;

        this.$canvas = $canvas;
        this.initCanvas(width, height);
        this.initialWidth = width;
        this.initialHeight = height;
        this.initContext(props);
        this.onColResize = onColResize;

        this.clippedData = new ClippedData(this.context);
        this.fixedData = new FixedData(this.context);

        // 滑动窗口， 分别计算startRowIndex, endRowIndex; startColIndex、endColIndex， 根据startRowIndex，进行layout计算
        this.renderer = new Renderer(this.context);

        this.selection = new ExpandableSelection(this);
        this.resize = new Resize(this.context);

        this.render();
    }

    colResize(payload) {
        this.onColResize(payload)
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
            selectable: true,
        };

        this.context.viewport = new Viewport({
            context: this.context,
            onUpdate: this.handleViewportUpdate.bind(this),
        });

        this.context.viewport.moveWindow();
        this.context.viewport.scrollbar.update();
    }

    getFontArr() {
        const fontSize = '12px';
        const fontFamily = 'SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace';
        const fontWeight = 'normal';

        return [fontWeight, fontSize, fontFamily];
    }

    updateWH(width, height) {
        this.$canvas.width = width * PIXEL_RATIO;
        this.$canvas.height = height * PIXEL_RATIO;
        this.$canvas.style.width = `${width}px`;
        this.$canvas.style.height = `${height}px`;
        this.ctx.setTransform(PIXEL_RATIO, 0, 0 , PIXEL_RATIO, 0, 0);
    }
 
    initCanvas(width, height) {
        this.ctx = this.$canvas.getContext('2d');
        this.$canvas.style.background = '#fff';
        this.$canvas.style.cursor = 'cell';
        this.updateWH(width, height)

        this.ctx.fillStyle = '#fff';
        this.ctx.font = this.getFontArr().join(' ');
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
            },
            selection: this.selection,
        });
    }

    update(props) {
        const {
            width,
            height,
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
            this.context.layout.update(dataSource.length, columns.length, rowHeights, colWidths, fixedConfig);
            // 宽高没变不需要更新
            if (this.initialWidth !== width || this.initialHeight !== height) {
                this.updateWH(width, height)
            }

            this.context.viewport.update({
                width,
                height,
                scrollWidth: this.context.layout.totalWidth,
                scrollHeight: this.context.layout.totalHeight,
            });

            this.clippedData = new ClippedData(this.context);
            this.fixedData = new FixedData(this.context);
        }

        this.render();
    }
}
