import {skip} from "rxjs";


import Grid from "../grid-core/index";
import Toolbar from "./toolbar/index.js";

import {state$} from "./store/index.js";

export default class GridApp {
    constructor(props) {
        this.grid = this.initGrid(props);

        this.toolbar = this.initToolbar(props);

        this.initEvt();
    }

    initGrid(props) {
        const {
            $canvas,
            width,
            height,
            columns,
            dataSource,
        } = props;

        return new Grid({
            $canvas,
            width,
            height,
            columns,
            dataSource,
        });
    }

    initToolbar(props) {
        const {
            $toolbar,
        } = props;

        return new Toolbar({
            $toolbar,
            grid: this.grid,
        });
    }

    initEvt() {
        state$.pipe(
            skip(1),
        ).subscribe(state => {
            debugger;
            this.grid.update(state);
        });
    }
}
