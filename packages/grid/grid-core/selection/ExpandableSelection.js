import {findColByEvent, getIndicatorBoundingRect} from "./util.js";
import {isEventInView} from "../utils/util.js";

import Selection from "./Selection.js";

export default class ExpandableSelection extends Selection {
    constructor(stage) {
        super(stage);

        this.isExpanding = false;

        this.initIndicatorEvt();
    }

    isEnterIndicator(x, y) {
        if (!this.activeCol) {
            return false;
        }

        const indicator = getIndicatorBoundingRect(this.activeCol);
        return isEventInView(x, y, indicator);
    }

    initIndicatorEvt() {
        const { context } = this.stage;
        const { event$, dom } = context;

        const {left, top} = dom.getBoundingClientRect();


        event$.on('mousedown', (e, config) => {
            const eventX = e.clientX - left;
            const eventY = e.clientY - top;

            this.selectionCol = null;

            if (this.isEnterIndicator(eventX, eventY)) {
                this.isExpanding = true;

                config.shouldStop = true;
            } else {
                config.shouldStop = false;
            }
        }, 10);

        event$.on('mousemove', (e) => {
            const eventX = e.clientX - left;
            const eventY = e.clientY - top;

            if (this.isExpanding) {
                this.selectionCol = this.getCol(eventX, eventY);
                if (!this.selectionCol) {
                    debugger;
                }

                console.info('#selectionCol', this.selectionCol);

                this.stage.render();
            } else {
                // hover
                if (this.isEnterIndicator(eventX, eventY)) {
                    dom.style.cursor = 'crosshair';
                } else {
                    dom.style.cursor = 'cell';
                }
            }
        });

        event$.on('mouseup', () => {
            this.isExpanding = false;
        });
    }
}
