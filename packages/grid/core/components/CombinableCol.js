import DecoratedCol from "./DecoratedCol.js";

// 横向：range内，除了end， 都不画右边border
// 纵向：range内，除了end， 都不画下边border
// 二维：一样， 先全部横向， 再全部纵向， 规则一样
// 考虑fixed和非fixed不能合并， 这种逻辑靠上层交互控制；底层只关心数据结构和渲染；
export default class CombinableCol extends DecoratedCol {
    constructor(context, rowIndex, colIndex, width, height) {
        super(context, rowIndex, colIndex);

        this.rowIndex = rowIndex;
        this.colIndex = colIndex;

        this.combineRange = null;
        this.combineWidth = width;
        this.combineHeight = height;

        this.initRange(context);
    }

    initRange(context) {
        const { config, layout } = context;
        const { combineRanges = [] } = config;

        for (let i = 0; i < combineRanges.length; i++) {
            const {start, end} = combineRanges[i];

            if (
                (this.rowIndex >= start[0] && this.rowIndex <= end[0]) &&
                (this.colIndex >= start[1] && this.colIndex <= end[1])
            ) {
                this.combineRange = {
                    start,
                    end,
                };

                this.isCombinedLastRow = this.rowIndex === end[0];
                this.isCombinedLastCol = this.colIndex === end[1];

                this.isCombinedStart = this.rowIndex === start[0] && this.colIndex === start[1];

                this.combineWidth = this.getCombineWidth(layout, start, end);
                this.combineHeight = this.getCombineHeight(layout, start, end);

                break;
            }
        }
    }

    get isCombined() {
        return !!this.combineRange;
    }

    getCombineWidth(layout, start, end) {
        const endX = end[1] === layout.colCount - 1 ? layout.totalWidth : layout.getX(end[1] + 1);

        return endX - layout.getX(start[1]);
    }

    getCombineHeight(layout, start, end) {
        const endY = end[0] === layout.rowCount - 1 ? layout.totalHeight : layout.getY(end[0] + 1);

        return endY - layout.getY(start[0]);
    }
}
