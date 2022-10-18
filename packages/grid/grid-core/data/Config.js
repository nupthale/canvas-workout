
export default class Config {
    constructor({
        dom,
        width,
        height,
        columns,
        dataSource,
        fixedConfig,
        rowHeights,
        colWidths,
        combineRanges,
        decorators,
    }) {
        this.dom = dom;
        this.width = width;
        this.height = height;

        this.columns = columns;
        this.dataSource = dataSource;
        this.fixedConfig = fixedConfig;

        this.rowHeights = rowHeights;
        this.colWidths = colWidths;

        // [{ start: [0, 1], end: [3, 1] }]
        this.combineRanges = combineRanges || [];
        // 背景色、文字颜色，大小等
        this.decorators = decorators;
    }

    getText(rowIndex, colIndex) {
        const column = this.columns[colIndex];
        return this.dataSource[rowIndex][column.dataIndex]
    }

    getColumnTitle(colIndex) {
        const column = this.columns[colIndex];
        return column.title;
    }
}
