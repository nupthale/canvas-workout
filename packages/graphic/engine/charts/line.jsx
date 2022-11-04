import XAxis from "../elements/Axis/x.jsx";
import YAxis from "../elements/Axis/y.jsx";

import Path from '../elements/Path';
import Circle from '../shape/Circle';
import Base from "./base.jsx";

import {getBezierList} from "../utils/bezier.js";


import { getChartHeight, getYAxisOrigin, getChartWidth, getXAxisOrigin } from "../meta.js";

export default class Line extends Base {
    constructor(context) {
        super(context);

        this.context = context;

        const { data, yField } = this.context;

        this.yValues = data.map(item => parseFloat(`${item[yField]}`.replace(/,/g, '')));
        this.maxY = this.getMaxY();

        this.pathData = this.getPathData(this.yValues);
        this.curvePathData = this.getCurvePathData2(this.yValues);
    }

    getMaxY() {
        let maxY = 0;

        this.yValues.forEach(yValue => {
            maxY = Math.max(yValue, maxY);
        });

        const tickCount = Math.ceil(maxY / 100);
        return tickCount * 100;
    }

    layoutPointY(y) {
        const { height } = this.context;
        const yHeight = getChartHeight(height);
        const yOrigin = getYAxisOrigin();

        const pos = yHeight - (y / this.maxY) * yHeight + yOrigin.y;
        return parseInt(pos);
    }

    layoutPointX(index) {
        const { width, height, data, yField } = this.context;

        const xOrigin = getXAxisOrigin(height);
        this.tickInterval = getChartWidth(width) / (data.length - 1);

        return (index) * this.tickInterval + xOrigin.x;
    }


    layoutPoints(points) {
        const positions = [];

        points.forEach((point, index) => {
            positions.push({
               x: this.layoutPointX(index),
               y: this.layoutPointY(point),
           });
        });

        return positions;
    }

    getPathData(points) {
        const start = points[0];

        let d = `M ${this.layoutPointX(0)} ${this.layoutPointY(start)}`;

        points.slice(1).forEach((point, index) => {
            d += ` L ${this.layoutPointX(index + 1)} ${this.layoutPointY(point)}`;
        });

        return d;
    }

    // 算法： https://www.jointjs.com/blog/how-to-create-nice-looking-curves-in-svg-with-fixed-tangents
    // https://www.researchgate.net/publication/41391547_Modeling_Shapes_for_Pattern_Recognition_A_Simple_Low-Cost_Spline-based_Approach
    // https://github.com/gitcnd/jspline
    // https://pomax.github.io/bezierinfo/#projections
    // https://jermmy.github.io/2016/08/01/2016-8-1-Bezier-Curve-SVG/
    getCurvePathData(points) {
        const positions = this.layoutPoints(points);

        let d = `M ${positions[0].x} ${positions[0].y}`;

        positions.forEach((position, index) => {
            if (index < positions.length - 1) {
                if (index % 2 === 0) {
                    d += ` Q${positions[index].x}, ${positions[index + 1].y} ${positions[index + 1].x}, ${positions[index + 1].y}`;
                } else {
                    d += ` T${positions[index + 1].x} ${positions[index + 1].y}`;
                }
            }
        });

        return d;
    }

    getCurvePathData2(points) {
        const positions = this.layoutPoints(points);

        const list = getBezierList(
            positions,
            false,
        );

        let d = '';

        list.forEach(item => {
            const [point0, point1, point2, point3] = item;
            d += ` M ${point0.x} ${point0.y} C ${point1.x} ${point1.y} ${point2.x} ${point2.y} ${point3.x} ${point3.y}`;
        });

        console.info('#list', list, d);

        return d;
    }

    renderContent() {
        return (
            <view>
                {/* x axis */}
                <XAxis context={this.context} />
                {/* y axis */}
                <YAxis context={this.context} />
                {/* line */}
                <Path id="hale" d={this.pathData} stroke="#85CB9F" onClick={() => alert('path clicked')} />
                <Path id="hale" d={this.curvePathData} stroke="#8884D8" onClick={() => alert('path clicked')} />
            </view>
        );
    }
}
