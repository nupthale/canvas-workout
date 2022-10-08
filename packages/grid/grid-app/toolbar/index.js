import RandomBackground from "./commands/RandomBackground.js";

export default class Toolbar {
    constructor({ $toolbar, grid }) {
        this.$toolbar = $toolbar;
        this.grid = grid;

        this.commands = [
            new RandomBackground(this.grid)
        ];

        this.initDom();
    }

    initDom() {
        const fragment = document.createDocumentFragment();

        this.commands.forEach(command => {
            fragment.appendChild(command.dom);
        });

        this.$toolbar.appendChild(fragment);
    }
}
