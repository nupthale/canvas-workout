import Element from "../dom/Element";
import Text from "../dom/Text";
import Scrollable from "../dom/Scrollable";


export const percentCalc = (number, parentNumber) => {
    if (typeof number === 'string') {
        if (/^\d{1,2}%$/.test(number)) {
            return parseInt(number.substring(0, -1)) * 0.01 * parentNumber()
        } else {
            return parentNumber()
        }
    } else if (typeof number === 'number') {
        return number
    } else {
        return parentNumber()
    }
};

export const isInView = (node, ctx) => {
    const element = node.isTextNode ? node.parent : node;

    const overflowParent = element.style.overflowParent;

    const style = element.getComputedStyle();
    const layout = element.getLayout();

    const x = layout.x - (overflowParent?.scrollLeft || 0);
    const y = layout.y - (overflowParent?.scrollTop || 0)

    const isHorizontalInView = (x + style.width > 0 && x < ctx.canvas.width / PIXEL_RATIO);
    const isVerticalInView = (y + style.height > 0 && y < ctx.canvas.height / PIXEL_RATIO);

    return isHorizontalInView && isVerticalInView;
}

export const isInOverflowBox = (targetElement, element) => {
    const style = element.getComputedStyle();
    const layout = element.getLayout();

    const targetStyle = targetElement.getComputedStyle();
    const targetLayout = targetElement.getLayout();

    const x = layout.x - (targetElement?.scrollLeft || 0);
    const y = layout.y - (targetElement?.scrollTop || 0)

    const isHorizontalInView = (x + style.width > targetLayout.x && x < targetLayout.x + targetStyle.width);
    const isVerticalInView = (y + style.height > targetLayout.y && y < targetLayout.y + targetStyle.height);

    return isHorizontalInView && isVerticalInView;
}

export const createElement = (type, props, ...children) => {
    const flatChildren = [];
    children.map(child => {
        if (child instanceof Array) {
            child.forEach(item => {
                flatChildren.push(item);
            })
        } else {
            flatChildren.push(child);
        }
    })

    if (typeof type === 'string') {
        if (type === 'view') {
            return new Element({
                ...props,
                children: flatChildren,
            })
        } else if (type === 'scrollable') {
            return new Scrollable({
                ...props,
                children: flatChildren,
            })
        } else {
            return new Text({
                text: children[0],
                children: [],
            })
        }
    } else  {
        const inst = new type({...props, children: flatChildren });
        return inst.render ? inst.render() : inst;
    }
}

export const PIXEL_RATIO = (() => {
    if (typeof window !== 'undefined') {
        const ctx = document.createElement('canvas').getContext('2d'),
            dpr = window.devicePixelRatio || 1,
            bsr = ctx['webkitBackingStorePixelRatio'] ||
                ctx['mozBackingStorePixelRatio'] ||
                ctx['msBackingStorePixelRatio'] ||
                ctx['oBackingStorePixelRatio'] ||
                ctx['backingStorePixelRatio'] || 1;

        const ratio = dpr / bsr;
        return ratio < 1 ? 1 : ratio;
    }

    return 1;
})();

let _scrollbarWidth = 0;

export const getScrollbarWidth = () => {
    if (typeof window !== 'undefined') {
        if (_scrollbarWidth > 0) {
            return _scrollbarWidth;
        }


        // Creating invisible container
        const outer = document.createElement('div');
        // outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll'; // forcing scrollbar to appear
        outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
        document.body.appendChild(outer);

        // Creating inner element and placing it in the container
        const inner = document.createElement('div');
        outer.appendChild(inner);

        // Calculating difference between container's full width and the child width
        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

        // Removing temporary elements from the DOM
        outer.parentNode.removeChild(outer);

        _scrollbarWidth = scrollbarWidth;
        return scrollbarWidth;
    }

    return 0;
};
