export default class EventBus {
    constructor() {
        this.event$ = {};
    }

    on(name, callback, priority = 0) {
        this.event$[name] = this.event$[name] || [];
        this.event$[name].push({
            priority,
            callback,
        });

        this.event$[name].sort((a, b) => a.priority - b.priority);
    }

    emit(name, value) {
        const handlers = this.event$[name] || [];

        for (let i = 0; i < handlers.length; i++) {
            const handler = handlers[i];
            const shouldBreak = !handler.callback(value);

            if (name === 'mousemove') {
                console.info('#mousemove', shouldBreak);
            }

            if (shouldBreak) {
                break;
            }
        }
    }
}
