import XAxis from "../elements/Axis/x.jsx";
import YAxis from "../elements/Axis/y.jsx";

import Path from '../elements/Path';
import Circle from '../shape/Circle';

const margin = 50;

export default class Line {
    constructor(context) {
        this.context = context;

        const { data, yField } = this.context;

        this.yValues = data.map(item => parseFloat(`${item[yField]}`.replace(/,/g, '')));
        this.maxY = this.getMaxY();

        this.pathData = this.getPathData(this.yValues);
    }

    getMaxY() {
        const { data, yField } = this.context;

        let maxY = 0;
        this.yValues.forEach(yValue => {
            maxY = Math.max(yValue, maxY);
        });

        return maxY;
    }

    getYPosition(y) {
        const { height } = this.context;

        const pos = (y / this.maxY) * (height - margin * 2);
        return parseInt(pos);
    }

    getXPosition(index) {
        const { width, data, yField } = this.context;

        this.tickInterval = (width - margin * 2) / data.length;

        return parseInt((index + 1) * this.tickInterval + margin);
    }

    getPathData(points) {
        const start = points[0];

        let d = `M ${this.getXPosition(0)} ${this.getYPosition(start)}`;

        points.slice(1).forEach((point, index) => {
            d += ` L ${this.getXPosition(index + 1)} ${this.getYPosition(point)}`;
        });

        return d;
    }

    render() {
        return (
            <view>
                {/* x axis */}
                <XAxis context={this.context} />
                {/* y axis */}
                <YAxis context={this.context} />
                {/* line */}
                <Path d={this.pathData} />
                <Circle
                    style={{
                        position: 'fixed',
                        left: 20,
                        top: 20,
                    }}
                    onClick={() => {
                        alert(123);
                    }}
                    radius={20}
                />
            </view>
        );
    }
}
