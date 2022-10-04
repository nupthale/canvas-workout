
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
    }) {
        this.dom = dom;
        this.width = width;
        this.height = height;

        this.columns = columns;
        this.dataSource = dataSource;
        this.fixedConfig = fixedConfig;

        this.rowHeights = rowHeights;
        this.colWidths = colWidths;
    }

    getText(rowIndex, colIndex) {
        const column = this.columns[colIndex];
        return this.dataSource[rowIndex][column.dataIndex]
    }
}
