export default class DecoratedCol {
    constructor(context, rowIndex, colIndex) {
        this.background = this.getBackground(context, rowIndex, colIndex);
    }

    getBackground(context, rowIndex, colIndex) {
        const { background } = context.config.decorators || {};

        const config = background?.find(item => {
            return item.rowIndex === rowIndex && item.colIndex === colIndex;
        });

        return config?.color || '#fff';
    }
}
