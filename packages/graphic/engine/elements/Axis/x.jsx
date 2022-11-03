import { getChartWidth, getXAxisOrigin } from "../../meta.js";


// 可以做成Axis Element， 放到dom-engine中，减少dom数量
export default class XAxis {
    constructor(props) {
        this.context = props.context;

        this.initTicks();
    }

    initTicks() {
        const { width, data, xField } = this.context;
        this.ticks = data.map(item => item[xField]);

        this.lineWidth = getChartWidth(width);
        this.tickInterval = this.lineWidth / (this.ticks.length - 1);
        this.labels = this.ticks.map((label, index) => {
            return {
                index,
                label,
            };
        });
    }

    render() {
        const { height } = this.context;
        const xOrigin = getXAxisOrigin(height);


        return (
            <view>
                <view style={{
                    position: 'fixed',
                    width: this.lineWidth,
                    height: 1,
                    top: xOrigin.y,
                    left: xOrigin.x,
                    backgroundColor: "#666",
                }}>
                </view>

                {/* ticks */}
                {
                    this.ticks.map((tick, index) => {
                        return (
                            <view style={{
                                position: 'fixed',
                                width: 1,
                                height: 5,
                                top: xOrigin.y,
                                left: (index) * this.tickInterval + xOrigin.x,
                                backgroundColor: "#666",
                            }}></view>
                        );
                    })
                }

                {/* labels */}
                {
                    this.labels.map((item) => {
                        return (
                            <view style={{
                                position: 'fixed',
                                top: xOrigin.y + 10,
                                left: (item.index) * this.tickInterval + xOrigin.x,
                                color: '#333',
                            }}>
                                <text>{item.label}</text>
                            </view>
                        )
                    })
                }
            </view>

        );
    }
}
