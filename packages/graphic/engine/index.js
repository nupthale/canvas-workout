import Stage from "../../dom-engine/engine/stage";

import Registry from "../../dom-engine/engine/render/Registry";

import Line from "./charts/line.jsx";

import Path, { PathRender } from "./elements/Path";
import Circle , { CircleRender } from "./shape/Circle.js";

export default class Chart {
    constructor(props) {
        this.context = props;

        this.initRegistry();

        this.render();
    }

    initRegistry() {
        this.elementRegistry = new Registry();

        this.elementRegistry.register(Path.type, PathRender);
        this.elementRegistry.register(Circle.type, CircleRender);
    }

    render() {
        const {
            data,
            type,
            width,
            height,
            mountId,
        } = this.context;

        switch (type) {
            case 'line':
                const line = new Line(this.context);
                this.stage = new Stage(
                    line.render(),
                    document.getElementById(mountId),
                    width,
                    height,
                    this.elementRegistry,
                );
                break;
            default:
                break;
        }
    }
}
