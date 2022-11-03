import Chart from "../../engine/index.js";
import {data} from "./mock.js";

export const renderLine = (mountId) => {
    const chart = new Chart({
        type: 'line',
        data,
        mountId,
        width: 500,
        height: 500,
        xField: 'Name',
        yField: 'Value',
    });
}
