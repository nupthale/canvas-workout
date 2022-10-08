import Grid from "./Grid";
import Scrollbar from "./Scrollbar";
import SelectionRect from "./SelectionRect";

export default class Renderer {
    constructor(context) {
        this.context = context;

        this.components = [
            // 画Grid
            new Grid(context),
            new Scrollbar(context),
            new SelectionRect(context),
        ];
    }

    // 画其他， 预留
    register(component) {
        this.components.push(component);
    }

    paint(dataDeps) {
        const { canvasCtx, viewport } = this.context;

        canvasCtx.clearRect(0, 0, viewport.width, viewport.height);

        this.components.forEach(component => {
            component.render(dataDeps);
        })
    }
}
