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

        document.body.addEventListener('mousedown', (e) => {
            this.emit('mousedown', e);
        });

        document.body.addEventListener('mousemove', (e) => {
            this.emit('mousemove', e);
        });

        document.body.addEventListener('mouseup', (e) => {
            this.emit('mouseup', e);
        });

        document.body.addEventListener('mouseout', (e) => {
            this.emit('mouseout', e);
        });
    }
}
