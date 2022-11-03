import {filter, Subject, tap} from "rxjs";

export default class Eventful {
    constructor(props) {
        this.event$ = new Subject({});

        this._initEvent(props);
    }

    _initEvent(props) {
        const {
            onClick,
            onContextmenu,
            onDbClick,
            onMouseEnter,
            onMouseMove,
            onMouseLeave,
        } = props;

        if (onClick) {
            this.on('click', onClick);
        }

        if (onContextmenu) {
            this.on('contextmenu', onContextmenu);
        }

        if (onDbClick) {
            this.on('dblclick', onContextmenu);
        }

        if (onMouseEnter) {
            this.on('mouseenter', onContextmenu);
        }

        if (onMouseMove) {
            this.on('mousemove', onMouseMove);
        }

        if (onMouseLeave) {
            this.on('mouseleave', onMouseLeave);
        }
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
