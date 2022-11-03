import {filter, Subject, tap} from "rxjs";

export default class Eventful {
    constructor(props) {
        this.event$ = new Subject({});

        this._initEvent(props);
    }

    _initEvent(props) {
        const {
            onClick,
        } = props;

        this.on('click', onClick);
    }

    on(name, handler) {
        return this.event$.pipe(
            filter((e) => e.name === name),
            tap((e) => handler(e.value)),
        ).subscribe();
    }

    emit(name, value) {
        this.event$.next({
            name,
            value,
        });
    }
}
