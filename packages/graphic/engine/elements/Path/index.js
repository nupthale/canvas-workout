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
}

export class PathRender {
    constructor(ctx, element) {
        this.ctx = ctx;
        this.element = element;
    }

    render() {
        this.ctx.save();

        debugger;
        this.ctx.strokeStyle = 'red';
        this.ctx.stroke(this.element.path)

        this.ctx.restore();
    }
}
