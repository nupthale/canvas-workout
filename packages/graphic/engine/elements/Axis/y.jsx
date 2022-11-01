const margin = 50;

export default class YAxis {
    constructor(props) {
        this.context = props.context;

        this.initTicks();
    }

    initTicks() {
        const { height, data, yField } = this.context;
        this.ticks = data.map(item => item[yField]);
        this.lineHeight = height - margin * 2;

        this.tickInterval = this.lineHeight / this.ticks.length;
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
        return (
            <view>
                <view style={{
                    position: 'fixed',
                    width: 1,
                    height: this.lineHeight,
                    top: margin,
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
                                width: 5,
                                height: 1,
                                top: (index + 1) * this.tickInterval + margin,
                                left: margin - 5,
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
                                top: (item.index + 1) * this.tickInterval + margin,
                                left: 0,
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
