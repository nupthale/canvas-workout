import RandomBackground from "./commands/RandomBackground.js";
import MergeCells from "./commands/MergeCells.js";
import Undo from "./commands/Undo.js";
import Redo from "./commands/Redo.js";

import {crtState} from "../store/index.js";


export default class Toolbar {
    constructor({ $toolbar, grid }) {
        this.$toolbar = $toolbar;
        this.grid = grid;

        this.commands = [
            new RandomBackground(this.grid),
            new MergeCells(this.grid),
            new Undo(this.grid),
            new Redo(this.grid),
        ];

        this.initDom();
    }

    initDom() {
        const fragment = document.createDocumentFragment();

        this.commands.forEach((command, index) => {
            const divider = document.createElement('div');
            divider.classList.add('divider');

            fragment.appendChild(command.dom);
            if (index !== this.commands.length - 1) {
                fragment.appendChild(divider);
            }
        });

        this.$toolbar.appendChild(fragment);
    }
}
