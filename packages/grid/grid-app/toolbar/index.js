import RandomBackground from "./commands/RandomBackground.js";
import MergeCells from "./commands/MergeCells.js";

export default class Toolbar {
    constructor({ $toolbar, grid }) {
        this.$toolbar = $toolbar;
        this.grid = grid;

        this.commands = [
            new RandomBackground(this.grid),
            new MergeCells(this.grid)
        ];

        this.initDom();
    }

    initDom() {
        const fragment = document.createDocumentFragment();

        const divider = document.createElement('div');
        divider.classList.add('divider');

        this.commands.forEach((command, index) => {
            fragment.appendChild(command.dom);
            if (index !== this.commands.length - 1) {
                fragment.appendChild(divider);
            }
        });

        this.$toolbar.appendChild(fragment);
    }
}
