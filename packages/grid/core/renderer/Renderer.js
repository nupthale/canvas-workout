import Grid from "./Grid";
import Scrollbar from "./Scrollbar";

export default class Renderer {
    constructor(context) {
        this.context = context;

        this.components = [
            // 画Grid
            new Grid(context),
            new Scrollbar(context),
            // 画其他， 预留
        ];
    }

    paint(dataDeps) {
        const { canvasCtx, viewport } = this.context;

        canvasCtx.clearRect(0, 0, viewport.width, viewport.height);

        this.components.forEach(component => {
            component.render(dataDeps);
        })
    }
}
