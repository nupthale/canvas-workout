import {canvasPadding, titleBarHeight, xAxisHeight, yAxisWidth } from "../meta.js";


export default class Base {
    constructor(context) {
        this.context = context;
    }

    renderContent() {}

    render() {
        const { width, height } = this.context;

        return (
            <view style={{
                width: width,
                height: height,
                backgroundColor: '#CFE8FC',
                padding: [canvasPadding, canvasPadding, canvasPadding, canvasPadding],
            }}>
                <view style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#F5F6F7',
                    padding: [titleBarHeight, 0, xAxisHeight, yAxisWidth],
                }}>
                    <view style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#DFE1E5',
                    }}>
                        {this.renderContent()}
                    </view>
                </view>

            </view>
        );
    }
}
