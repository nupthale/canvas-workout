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

        this.dom.addEventListener('mousemove', (e) => {
            this.emit('mousemove', e);
        });

        this.dom.addEventListener('mouseup', (e) => {
            this.emit('mouseup', e);
        });

        this.dom.addEventListener('mouseout', (e) => {
            this.emit('mouseout', e);
        });
    }
}
