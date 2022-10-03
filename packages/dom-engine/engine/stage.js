import {PIXEL_RATIO} from "./utils/util";

import Layer from "./layer/Layer";
import Render from "./render/Render";


import ClickHandler from "./event/ClickHandler";
import DblClickHandler from "./event/DblClickHandler";
import ContextMenuHandler from "./event/ContextMenuHandler";
import MouseMoveHandler from "./event/MouseMoveHandler";
import MouseWheelHandler from "./event/MouseWheelHandler";
import TouchMoveHandler from "./event/TouchMoveHandler";

export default class Stage {
    constructor(root, mountNode, width, height) {
        this.root = root;

        this.width = width;
        this.height = height;

        this.$root = mountNode;

        this.init();
    }

    init() {
        if (this.hasInit) {
            return;
        }

        this.hasInit = true;

        this.initDom();
        this.ctxInit();
        this.render();
        this.eventInit();
    }

    initDom() {
        const $canvas = document.createElement('canvas');
        $canvas.width = this.width * PIXEL_RATIO;
        $canvas.height = this.height * PIXEL_RATIO;
        $canvas.style.width = `${this.width}px`;
        $canvas.style.height = `${this.height}px`;
        this.$canvas = $canvas;

        this.$root.prepend(this.$canvas);
    }

    eventInit() {
        new ClickHandler(this);
        new DblClickHandler(this);
        new ContextMenuHandler(this);
        new MouseMoveHandler(this);
        new MouseWheelHandler(this);
        new TouchMoveHandler(this);
    }

    ctxInit() {
        this.ctx = this.$canvas.getContext('2d');
        this.ctx.setTransform(PIXEL_RATIO, 0, 0 , PIXEL_RATIO, 0, 0);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '14px';
        this.ctx.textBaseline = 'middle';
        this.ctx.strokeStyle = '#e8ebed';
    }

    render() {
        this.domTree = this.root;
        this.reflow();
    }

    repaint() {
        this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        // requestAnimationFrame(() => {
        //
        // })
        this.renderer.paint();
    }

    reflow() {
        this.layoutTree = this.domTree.doLayout();

        this.layerTree = Layer.create(this.layoutTree, null);

        this.renderer = new Render(this.ctx, this.layerTree);

        this.repaint();
    }
}
