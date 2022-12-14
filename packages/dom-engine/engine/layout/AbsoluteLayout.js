import LayoutBase from './LayoutBase';
import {isPositionedNode} from "./util";

export default class AbsoluteLayout extends LayoutBase {
    constructor(element) {
        super(element);

        this.positionedParent = null;
    }

    getPositionedParent() {
        if (this.positionedParent) {
            return this.positionedParent;
        }

        let node = this.element.parent;
        while(node) {
            if (isPositionedNode(node)) {
                this.positionedParent = node;
                break;
            }
            node = node.parent;
        }

        return this.positionedParent;
    }

    layoutX(_parentX, elementStyle) {
        const parent = this.getPositionedParent();
        if (!parent) {
            return 0;
        }

        const parentScrollLeft = parent?.scrollLeft || 0;
        const parentLayout = parent.getLayout();

        return parentLayout.x + elementStyle.left || 0 - parentScrollLeft;
    }

    layoutY(_parentY, elementStyle) {
        const parent = this.getPositionedParent();
        if (!parent) {
            return 0;
        }

        const parentScrollTop = parent?.scrollTop || 0;
        const parentLayout = parent.getLayout();

        return parentLayout.y + elementStyle.top || 0 - parentScrollTop;
    }
}

