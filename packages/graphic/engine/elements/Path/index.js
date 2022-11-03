import ExtendElement from "../../../../dom-engine/engine/dom/ExtendElement";

export default class Path extends ExtendElement {
    static type = 'path';

    get type() {
        return Path.type;
    }

    constructor(props) {
        super(props);

        this.d = props.d;
        // 这里的定义有问题， 定义到这里， 在render的部分设置strokeWidth不生效；
        // 如果定义在rener， 这里isHit无法使用判断，即使点击也是false，
        // 得想个办法
        this.path = new Path2D(props.d);
    }

    isHit(e, x, y) {
        const path = new Path2D(this.d);
        if (e.stage.ctx.isPointInStroke(path, x, y)) {
            return true;
        }

        return false;
    }
}

export class PathRender {
    constructor(ctx, element) {
        this.ctx = ctx;
        this.element = element;
    }

    render() {
        this.ctx.save();

        const path = new Path2D(this.element.d);

        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 5;
        this.ctx.strokeWidth = 5;
        this.ctx.stroke(path)

        this.ctx.restore();
    }
}
