export default class Scrollbar {
    constructor(context, onScrollX, onScrollY) {
        this.context = context;

        // 滚动条
        this.scrollbarSize = 9;
        this.minScrollbarSize = 20;

        this.onScrollX = onScrollX;
        this.onScrollY = onScrollY;

        this.hScrollbar = {
            x: 0,
            y: 0,
            width: this.minScrollbarSize,
            height: this.scrollbarSize,
            isHover: false,
            isScroll: false,
        };

        this.vScrollbar = {
            x: 0,
            y: 0,
            width: this.scrollbarSize,
            height: this.minScrollbarSize,
            isHover: false,
            isScroll: false,
        };

        this.initEvt();
    }

    initEvt() {
        const { event$, dom } = this.context;
        const {left, top} = dom.getBoundingClientRect();

        event$.on('mousemove', (e) => {
            if (this.scroll(e)) {
                return;
            }

            this.hover(e, left, top);
        });

        event$.on('mousedown', (e) => {
            if (!this.hScrollbar.isHover && !this.vScrollbar.isHover) {
                return;
            }

            this.hScrollbar.isScroll = this.hScrollbar.isHover;
            this.vScrollbar.isScroll = this.vScrollbar.isHover;
        });

        event$.on('mouseup', this.endScroll.bind(this));

        event$.on('mouseout', this.endScroll.bind(this));
    }

    endScroll() {
        this.hScrollbar.isScroll = false;
        this.vScrollbar.isScroll = false;
    }

    scroll(e) {
        const {
            maxScrollLeft,
            maxScrollTop,
        } = this.context.viewport;

        if (this.hScrollbar.isScroll) {
            // const x = (scrollLeft / maxScrollLeft) * (width - this.hScrollbar.width)
            const newX = Math.min(Math.max(this.hScrollbar.x + e.movementX, 0), this.hScrollbar.maxX);
            const scrollLeft = (newX / this.hScrollbar.maxX) * maxScrollLeft;

            this.hScrollbar.x = newX;
            this.onScrollX(scrollLeft);
            return true;
        }

        if (this.vScrollbar.isScroll) {
            // const x = (scrollLeft / maxScrollLeft) * (width - this.hScrollbar.width)
            const newY = Math.min(Math.max(this.vScrollbar.y + e.movementY, 0), this.vScrollbar.maxY);
            const scrollTop = (newY / this.vScrollbar.maxY) * maxScrollTop;

            this.vScrollbar.y = newY;
            this.onScrollY(scrollTop);
            return true;
        }

        return false;
    }

    hover(e, left, top) {
        const { stage } = this.context;

        const eventX = e.clientX - left;
        const eventY = e.clientY - top;

        const isHoverH = this.isHoverScrollbar(this.hScrollbar, eventX, eventY);
        const isHoverV = this.isHoverScrollbar(this.vScrollbar, eventX, eventY);

        const shouldRerender = (isHoverH !== this.hScrollbar.isHover) || (isHoverV !== this.vScrollbar.isHover);

        this.hScrollbar.isHover = isHoverH;
        this.vScrollbar.isHover = isHoverV;

        if (shouldRerender) {
            stage.render();
        }

        return shouldRerender;
    }

    isHoverScrollbar(scrollbar, x, y) {
       return (
           (x > scrollbar.x && x < scrollbar.x + scrollbar.width) &&
           (y > scrollbar.y && y < scrollbar.y + scrollbar.height)
       );
    }

    update() {
        const { viewport } = this.context;
        const {
            isHorizontalScrollable,
            isVerticalScrollable,
            scrollWidth,
            width,
            scrollHeight,
            height,
            scrollLeft,
            maxScrollLeft,
            scrollTop,
            maxScrollTop,
        } = viewport;

        // 画横向的滚动handler
        if (isHorizontalScrollable) {
            // if scrollWidth === width then scrollBarWidth = width / 1
            // if scrollWidth === 2 * width then scrollBarWidth width / 2;

            // scrollLeft为0 => 最小0
            // 最大scrollbar.left = width - scrollBar.width
            // scrollbar.left / 最大scrollbar.left = scrollLeft / maxScrollLeft;
            // scrollbar.left = (scrollLeft / maxScrollLeft ) * 最大scrollbar.left
            const scrollBarWidth = Math.max(this.minScrollbarSize, width / (scrollWidth / width));
            const maxX = width - scrollBarWidth;

            this.hScrollbar = {
                x: (scrollLeft / maxScrollLeft) * (maxX),
                y: height - this.scrollbarSize - 2,
                width: scrollBarWidth,
                height: this.scrollbarSize,
                maxX,
            };
        }

        // 画纵向的滚动条handler
        if (isVerticalScrollable) {
            const scrollBarHeight = Math.max(this.minScrollbarSize, height / (scrollHeight / height));
            const maxY = height - scrollBarHeight;

            this.vScrollbar = {
                x: width - this.scrollbarSize - 2,
                y: (scrollTop / maxScrollTop) * (maxY),
                width: this.scrollbarSize,
                height: scrollBarHeight,
                maxY,
            };
        }
    }
}
