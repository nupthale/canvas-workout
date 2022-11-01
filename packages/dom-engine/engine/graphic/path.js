import Element from "../dom/Element";

export default class Path extends Element {
    constructor(props) {
        super(props);

        this.path = new Path2D(props.d);
    }

    get isPath() {
        return true;
    }
}
