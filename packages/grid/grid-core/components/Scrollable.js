import Scrollbar from "./Scrollbar.js";


export default class Scrollable {
    constructor(props) {
        this.dom = props.dom;
        this.context = props.context;

        this.scrollLeft = 0;
        this.scrollTop = 0;

        this.prevScrollLeft = 0;
        this.prevScrollTop = 0;

        this.width = props.width;
        this.height = props.height;
        this.scrollWidth = props.scrollWidth;
        this.scrollHeight = props.scrollHeight;
        this.onScroll = props.onScroll;

        this.isHorizontalScrollable = this.scrollWidth > this.width;
        this.isVerticalScrollable = this.scrollHeight > this.height;

        this.scrollbar = new Scrollbar(this.context, this.scrollToX.bind(this), this.scrollToY.bind(this));

        this.initEvent();
    }

    get maxScrollLeft() {
        return this.scrollWidth - this.width;
    }

    get maxScrollTop() {
        return this.scrollHeight - this.height;
    }

    initEvent() {
        const { event$ } = this.context;

        this.dom.addEventListener('mousewheel', (e) => {
            e.preventDefault();

            e.stopPropagation();
            this.scrollBy(e.deltaX, e.deltaY);
        });
    }

    scrollToX(scrollLeft) {
        this.prevScrollLeft = this.scrollLeft;

        this.scrollLeft = Math.min(scrollLeft, this.maxScrollLeft);
        this.onScroll?.();
    }

    scrollToY(scrollTop) {
        this.prevScrollTop = this.scrollTop;

        this.scrollTop = Math.min(scrollTop, this.maxScrollTop);
        this.onScroll?.();
    }

    scrollBy(deltaX, deltaY) {
        this.prevScrollLeft = this.scrollLeft;
        this.prevScrollTop = this.scrollTop;


        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (this.scrollByX(deltaX)) {
                this.onScroll?.();
                this.scrollbar.update();
            }
        } else {
            if (this.scrollByY(deltaY)) {
                this.onScroll?.();
                this.scrollbar.update();
            }
        }
    }

    scrollByX(deltaX) {
        // 无需滚动
        if (this.scrollWidth <= this.width || deltaX === 0) {
            return false;
        }

        let shouldUpdate = false;
        const newScrollLeft = this.scrollLeft + deltaX;

        if (newScrollLeft < 0) {
            shouldUpdate = this.scrollLeft === 0;
            this.scrollLeft = 0;
        } else if (newScrollLeft >= this.maxScrollLeft) {
            shouldUpdate = this.scrollLeft === this.maxScrollLeft;
            this.scrollLeft = this.maxScrollLeft;
        } else {
            shouldUpdate = true;
            this.scrollLeft = newScrollLeft;
        }

        return shouldUpdate;
    }

    scrollByY(deltaY) {
        // 无需滚动
        if (this.scrollHeight <= this.height || deltaY === 0) {
            return false;
        }

        let shouldUpdate = false;
        const newScrollTop = this.scrollTop + deltaY;

        if (newScrollTop < 0) {
            shouldUpdate = this.scrollTop === 0;
            this.scrollTop = 0;
        } else if (newScrollTop > this.maxScrollTop) {
            shouldUpdate = this.scrollTop === this.maxScrollTop;
            this.scrollTop = this.maxScrollTop;
        } else {
            shouldUpdate = true;
            this.scrollTop = newScrollTop;
        }

        return shouldUpdate;
    }
}
