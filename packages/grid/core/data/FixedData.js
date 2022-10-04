import Col from "../components/Col.js";

export default class FixedData {
    constructor(context) {
        this.context = context;

        this.fixedLeftRows = [];
        this.fixedRightRows = [];
        this.fixedHeaderRows = [];

        this.leftCorderRows = [];

        this.update();
    }

    getRows(startRow, endRow, startCol, endCol) {
        const { layout } = this.context;

        const rows = [];

        for (let i = startRow; i <= endRow; i++) {
            const rowY = layout.getY(i);
            const rowHeight =  layout.getRowHeight(i);

            const row = {
                x: 0,
                y: rowY,
                height: rowHeight,
                cols: [],
            };

            for (let j = startCol; j < endCol; j++) {
                const colX = layout.getX(j);

                const col = new Col(this.context, i, j, colX, rowY, layout.getColWidth(j), rowHeight);

                row.cols.push(col);
            }
            rows.push(row);
        }

        return rows;
    }

    update() {
        const { viewport, config } = this.context;
        const { startRowIndex, endRowIndex, startColIndex, endColIndex } = viewport;

        const { left, right, header } = config.fixedConfig || {};

        this.fixedLeftRows = this.getRows(startRowIndex, endRowIndex, 0, left);

        this.fixedHeaderRows = this.getRows(0, header - 1, startColIndex, endColIndex + 1);

        this.leftCorderRows = this.getRows(0, header - 1, 0, left);
    }
}
