import CombinableCol from "./CombinableCol.js";


export default class Col extends CombinableCol {
    constructor(context, rowIndex, colIndex, x, y, width, height) {
        super(context, rowIndex, colIndex, width, height);

        this.rowIndex = rowIndex;
        this.colIndex = colIndex;

        this._x = x;
        this._y = y;
        this.width = width;
        this.height = height;

        this.context = context;
    }

    _isFixedLeft() {
        const { config } = this.context;

        return this.colIndex < config.fixedConfig?.left;
    }

    _isFixedHeader() {
        const { config } = this.context;

        return this.rowIndex < config.fixedConfig?.header;
    }

    get x() {
        const { scrollLeft = 0 } = this.context.viewport;

        if (this._isFixedLeft()) {
            return this._x;
        }

        return this._x - scrollLeft;
    }

    get y() {
        const { scrollTop = 0 } = this.context.viewport;

        if (this._isFixedHeader()) {
            return this._y;
        }

        return this._y - scrollTop;
    }
}
