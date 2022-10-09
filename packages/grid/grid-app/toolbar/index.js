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

        const divider = document.createElement('div');
        divider.classList.add('divider');

        this.commands.forEach(command => {
            fragment.appendChild(command.dom);
            fragment.appendChild(divider);
        });

        this.$toolbar.appendChild(fragment);
    }
}
