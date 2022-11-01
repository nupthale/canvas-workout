export const canvasPadding = 50;

export const xAxisHeight = 50;

export const yAxisWidth = 50;

export const titleBarHeight = 50;

export const chartPadding = 50;

export const getChartWidth = (width) => {
    return width - canvasPadding * 2 - yAxisWidth - chartPadding * 2;
}

export const getChartHeight = (height) => {
    return height - canvasPadding * 2 - xAxisHeight - titleBarHeight - chartPadding * 2;
}

export const getYAxisOrigin = () => {
    return {
        x: canvasPadding + yAxisWidth,
        y: canvasPadding + titleBarHeight,
    };
}

export const getXAxisOrigin = (height) => {
   return {
       x: canvasPadding + yAxisWidth,
       y: height - canvasPadding - xAxisHeight,
   }
};
