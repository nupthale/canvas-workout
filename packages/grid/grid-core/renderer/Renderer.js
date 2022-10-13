import Grid from "./Grid";
import Scrollbar from "./Scrollbar";
import SelectionRect from "./SelectionRect";
import ExpandIndicator from "./ExpandIndicator.js";
import SelectionText from './SelectionText';

export default class Renderer {
    constructor(context) {
        this.context = context;
        const { selectable } = context;

        this.components = [
            // 画Grid
            new Grid(context),
            new Scrollbar(context),
        ];
        if (selectable) {
            this.components = [
                ...this.components,
                new SelectionRect(context),
                new ExpandIndicator(context),
            ]
        } else {
            this.components.push(new SelectionText(context))
        }
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
