import { getChartHeight, getYAxisOrigin } from "../../meta.js";


const margin = 50;

export default class YAxis {
    constructor(props) {
        this.context = props.context;

        this.initTicks();
    }

    initTicks() {
        const { height, data, yField } = this.context;
        this.lineHeight = getChartHeight(height);

        this.maxValue = this.getMaxValue();

        this.tickCount = Math.ceil(this.maxValue / 100);
        this.ticks = new Array(this.tickCount).fill('');


        this.tickInterval = this.lineHeight / this.ticks.length;
        this.labels = this.ticks.concat('').map((_, index) => {
            return {
                index,
                label: index * 100,
            };
        });
        debugger;
    }

    getMaxValue() {
        const { height, data, yField } = this.context;

        let maxValue = 0;
        const values = data.map(item => item[yField]);

        values.forEach(value => {
            maxValue = Math.max(value, maxValue);
        });

        return maxValue;
    }

    render() {
        const yOrigin = getYAxisOrigin();

        return (
            <view>
                <view style={{
                    position: 'fixed',
                    width: 1,
                    height: this.lineHeight,
                    top: yOrigin.y,
                    left: yOrigin.x,
                    backgroundColor: "#666",
                }}>
                </view>

                {/* ticks */}
                {
                    this.ticks.map((tick, index) => {
                        return (
                            <view style={{
                                position: 'fixed',
                                width: 5,
                                height: 1,
                                top: (index) * this.tickInterval + yOrigin.y,
                                left: yOrigin.x - 5,
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
                                width: 50,
                                top: (this.labels.length - item.index - 1) * this.tickInterval + yOrigin.y - 5,
                                left: yOrigin.x - 30,
                                color: '#333',
                                textAlign: 'left',
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
