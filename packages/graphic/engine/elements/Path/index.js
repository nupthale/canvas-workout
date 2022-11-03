import ExtendElement from "../../../../dom-engine/engine/dom/ExtendElement";

export default class Path extends ExtendElement {
    static type = 'path';

    get type() {
        return Path.type;
    }

    constructor(props) {
        super(props);

        this.path = new Path2D(props.d);
    }

    isHit(e, x, y) {
        return e.stage.ctx.isPointInPath(this.path, x, y);
    }
}

export class PathRender {
    constructor(ctx, element) {
        this.ctx = ctx;
        this.element = element;
    }

    render() {
        this.ctx.save();

        this.ctx.strokeStyle = 'red';
        this.ctx.stroke(this.element.path)

        this.ctx.restore();
    }
}