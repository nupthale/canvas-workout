import Col from "../components/Col.js";

export default class ClippedData {
    constructor(context) {
        this.context = context;

        this.clippedData = [];

        this.update();
    }

    update() {
        const { viewport, layout } = this.context;

        const { startRowIndex, endRowIndex, startColIndex, endColIndex } = viewport;

        this.clippedData = [];

        for (let i = startRowIndex; i <= endRowIndex; i++) {
            const rowY = layout.getY(i);
            const rowHeight =  layout.getRowHeight(i);

            const row = {
                x: 0,
                y: rowY,
                height: rowHeight,
                cols: [],
            };

            for (let j = startColIndex; j <= endColIndex; j++) {
                const colX = layout.getX(j);
                const col = new Col(this.context, i, j, colX, rowY, layout.getColWidth(j), rowHeight);

                row.cols.push(col);
            }

            this.clippedData.push(row);
        }
    }
}
