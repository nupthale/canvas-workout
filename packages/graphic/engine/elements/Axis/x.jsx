const margin = 50;

// 可以做成Axis Element， 放到dom-engine中，减少dom数量
export default class XAxis {
    constructor(props) {
        this.context = props.context;

        this.initTicks();
    }

    initTicks() {
        const { width, data, xField } = this.context;
        this.ticks = data.map(item => item[xField]);
        this.lineWidth = width - margin * 2;
        this.tickInterval = this.lineWidth / this.ticks.length;
        this.labels = this.ticks.map((label, index) => {
            if (index % 6 === 0) {
                return {
                    index,
                    label,
                };
            }
            return null;
        }).filter(item => !!item);
    }

    render() {
        const { height } = this.context;

        return (
            <view>
                <view style={{
                    position: 'fixed',
                    width: this.lineWidth,
                    height: 1,
                    top: height - margin,
                    left: margin,
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
                                top: height - margin,
                                left: (index + 1) * this.tickInterval + margin,
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
                                top: height - margin + 10,
                                left: (item.index + 1) * this.tickInterval + margin,
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
