export default class Scrollbar {
    constructor(context) {
        this.context = context;

        // 滚动条
        this.scrollbarSize = 9;
        this.minScrollbarSize = 20;

        this.hScrollbar = {
            x: 0,
            y: 0,
            width: this.minScrollbarSize,
            height: this.scrollbarSize,
            isHover: false,
        };

        this.vScrollbar = {
            x: 0,
            y: 0,
            width: this.scrollbarSize,
            height: this.minScrollbarSize,
            isHover: false,
        };

        this.initEvt();
    }

    initEvt() {
        const { event$, dom, stage } = this.context;
        const {left, top} = dom.getBoundingClientRect();

        event$.on('mousemove', (e) => {
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
        });
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

            this.hScrollbar = {
                x: (scrollLeft / maxScrollLeft) * (width - scrollBarWidth),
                y: height - this.scrollbarSize - 2,
                width: scrollBarWidth,
                height: this.scrollbarSize,
            };
        }

        // 画纵向的滚动条handler
        if (isVerticalScrollable) {
            const scrollBarHeight = Math.max(this.minScrollbarSize, height / (scrollHeight / height));

            this.vScrollbar = {
                x: width - this.scrollbarSize - 2,
                y: (scrollTop / maxScrollTop) * (height - scrollBarHeight),
                width: this.scrollbarSize,
                height: scrollBarHeight,
            };
        }
    }
}
