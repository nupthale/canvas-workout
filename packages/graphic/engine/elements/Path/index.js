import ExtendElement from "../../../../dom-engine/engine/dom/ExtendElement";
import {PIXEL_RATIO} from "@engine/utils/util.js";

export default class Path extends ExtendElement {
    static type = 'path';

    get type() {
        return Path.type;
    }

    constructor(props) {
        super(props);

        this.stroke = props.stroke;

        this.d = props.d;
        // 这里的定义有问题， 定义到这里， 在render的部分设置strokeWidth不生效；
        // 如果定义在render， 这里isHit无法使用判断，即使点击也是false，
        // 得想个办法
        this.path = new Path2D(props.d);
    }

    isHit(e, x, y) {
        return e.stage.ctx.isPointInStroke(this.path, x * PIXEL_RATIO, y * PIXEL_RATIO);
    }
}

export class PathRender {
    constructor(ctx, element) {
        this.ctx = ctx;
        this.element = element;
    }

    render() {
        this.ctx.save();

        this.ctx.strokeStyle = this.element.stroke;
        this.ctx.lineWidth = 5;
        this.ctx.lineCap = 'round';
        this.ctx.stroke(this.element.path)


        this.ctx.restore();
    }
}
