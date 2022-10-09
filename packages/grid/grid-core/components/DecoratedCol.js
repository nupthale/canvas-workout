import CombinableCol from "./CombinableCol.js";

export default class DecoratedCol extends CombinableCol {
    constructor(context, rowIndex, colIndex, width, height) {
        super(context, rowIndex, colIndex, width, height);

        this.background = this.getBackground(context, rowIndex, colIndex);
    }

    getBackground(context, rowIndex, colIndex) {
        const { background } = context.config.decorators || {};

        const config = background?.find(item => {
            return item.rowIndex === rowIndex && item.colIndex === colIndex;
        });

        return config?.color;
    }
}
