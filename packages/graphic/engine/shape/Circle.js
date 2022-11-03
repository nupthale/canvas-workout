import ExtendElement from "../../../dom-engine/engine/dom/ExtendElement";

export default class Circle extends ExtendElement {
    static type = 'path';

    get type() {
        return Circle.type;
    }

    constructor(props) {
        super(props);

        const { top, left } = this.props.style;
        this.path = new Path2D();
        this.path.arc(left, top, props.radius , 0,2 * Math.PI);
    }

    isHit(e, x, y) {
        return e.stage.ctx.isPointInPath(this.path, x, y);
    }
}

export class CircleRender {
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
