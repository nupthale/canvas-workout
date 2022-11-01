import Stage from "../../dom-engine/engine/stage";

import Line from "./charts/line.jsx";

export default class Chart {
    constructor(props) {
        this.context = props;

        this.render();
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
                this.stage = new Stage(line.render(), document.getElementById(mountId), width, height);

                console.info('stage', this.stage);
                break;
            default:
                break;
        }
    }
}
