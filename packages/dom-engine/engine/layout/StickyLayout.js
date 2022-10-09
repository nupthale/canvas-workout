import LayoutBase from './LayoutBase';
import {isOverflowNode} from "./util";
import {isNil} from "lodash-es";

// @todo
export default class StickyLayout extends LayoutBase {
    constructor(element) {
        super(element);

        this.overflowParent = null;
    }

    getOverflowParent() {
        if (this.overflowParent) {
            return this.overflowParent;
        }

        let node = this.element.parent;
        while(node) {
            if (isOverflowNode(node)) {
                this.overflowParent = node;
                break;
            }
            node = node.parent;
        }

        return this.overflowParent;
    }

    layoutX(parentX, elementStyle) {
        const overflowParent = this.getOverflowParent();

        const overflowParentLayout = overflowParent.getLayout();

        if (elementStyle.left && parentX < 0) {
            return elementStyle.left + overflowParentLayout.x;
        }
        return parentX + elementStyle.left || 0;
    }

    layoutY(parentY, elementStyle) {
        const overflowParent = this.getOverflowParent();

        const overflowParentLayout = overflowParent.getLayout();

        console.info('elementStyle: ', elementStyle.top, parentY, !isNil(elementStyle.top));

        if (elementStyle.top && parentY < 0) {
            return elementStyle.top + overflowParentLayout.y;
        }

        return parentY + elementStyle.top || 0;
    }
}

