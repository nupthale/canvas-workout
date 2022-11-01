export default class PathRender {
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
