export default class DataManager {
    constructor(columns, dataSource) {
        this.columns = columns;
        this.dataSource = dataSource;
    }

    get rowLen() {
        return this.dataSource.length;
    }

    get colLen() {
        return this.columns.length;
    }

    getText(rowIndex, colIndex) {
        const column = this.columns[colIndex];
        return this.dataSource[rowIndex][column.dataIndex]
    }
}
