import {skip} from "rxjs";


import Grid from "../grid-core/index";
import Toolbar from "./toolbar/index.js";

import {state$, dispatch} from "./store/index.js";

import * as data from "./store/data.js";

export default class GridApp {
    constructor(props) {
        this.grid = this.initGrid(props);

        this.toolbar = this.initToolbar(props);

        this.initEvt();

        this.prevColWidths = '';
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
            onColResize: this.onColResize,
            fixedConfig: {
                left: 2,
                header: 1,
            },
            colWidths: {
                0: 100,
                1: 60,
                7: 60,
            },
            rowHeights: {
                3: 200,
            },
            combineRanges: [
                { start: [3, 3], end: [3, 5] }
            ],
            decorators: {
                background: [{
                    rowIndex: 3,
                    colIndex: 3,
                    color: 'rgba(238, 196, 87, 0.4)',
                }, {
                    rowIndex: 6,
                    colIndex: 6,
                    color: '#FAEAFA',
                }, {
                    rowIndex: 7,
                    colIndex: 6,
                    color: '#FAEAFA',
                }, {
                    rowIndex: 8,
                    colIndex: 6,
                    color: '#FAEAFA',
                }]
            }
        });
    }

    onColResize(payload) {
        dispatch({
            type: 'colResize',
            payload
        })
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
            this.grid.update({
                columns: data.initialState.columns,
                dataSource: data.initialState.dataSource,
                ...state,
                shouldLayout: true,
            });
        });

        window.onresize = () => {
            dispatch({
                type: 'windowResize',
            });
        }
    }
}
