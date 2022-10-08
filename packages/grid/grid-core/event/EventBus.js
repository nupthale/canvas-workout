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

        this.event$[name].sort((a, b) => b.priority - a.priority);
    }

    emit(name, value) {
        const handlers = this.event$[name] || [];

        const config = {
            shouldStop: false,
        };

        for (let i = 0; i < handlers.length; i++) {
            const handler = handlers[i];
            handler.callback(value, config);

            if (config.shouldStop) {
                break;
            }
        }
    }
}
