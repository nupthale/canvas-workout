export default class Col {
    constructor(rowIndex, colIndex, x, y, width, height, scroller, fixedConfig) {
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;

        this._x = x;
        this._y = y;
        this.width = width;
        this.height = height;

        this.scroller = scroller;
        this.fixedConfig = fixedConfig;
    }

    _isFixedLeft() {
        return this.colIndex < this.fixedConfig.left;
    }

    _isFixedHeader() {
        return this.rowIndex < this.fixedConfig.header;
    }

    get x() {
        const { scrollLeft = 0 } = this.scroller;

      if (this._isFixedLeft()) {
          return this._x;
      }

      return this._x - scrollLeft;
    }

    get y() {
        const { scrollTop = 0 } = this.scroller;

        if (this._isFixedHeader()) {
            return this._y;
        }

        return this._y - scrollTop;
    }
}
