import Element from "./Element";

// 用于扩展
export default class ExtendElement extends Element {
    constructor(props) {
        super(props);
    }

    get isExtendElement() {
        return true;
    }
}
