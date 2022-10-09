import EventBus from "./EventBus.js";

export default class EventRegistry extends  EventBus{
    constructor(dom) {
        super();

        this.dom = dom;

        this.init();
    }

    init() {
        this.dom.addEventListener('click', (e) => {
            this.emit('click', e);
        });

        this.dom.addEventListener('mousedown', (e) => {
            this.emit('mousedown', e);
        });

        // 不用document.body， 在canvas外部， 就监听不到；
        document.body.addEventListener('mousemove', (e) => {
            this.emit('mousemove', e);
        });

        // 这里必须用window，用document或者dom都会造成滚动条问题： 如果滚动到屏幕外， 就不会触发mouseup了；
        window.addEventListener('mouseup', (e) => {
            this.emit('mouseup', e);
        });

        document.body.addEventListener('mouseout', (e) => {
            this.emit('mouseout', e);
        });
    }
}
