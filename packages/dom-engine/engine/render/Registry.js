export default class Registry {
    constructor() {
        this.registry = new Map();
    }

    register(type, clazz) {
        this.registry.set(type, clazz);
    }

    unregister(type) {
        this.registry.delete(type);
    }

    get(type) {
        return this.registry.get(type);
    }
}
