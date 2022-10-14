export const getLayoutXY = (rowIndex, colIndex, layout, viewport, config) => {
    const { scrollLeft = 0, scrollTop = 0 } = viewport
    let x, y
    const _x = layout.getX(colIndex)
    const _y = layout.getY(rowIndex)

    if (colIndex < config.fixedConfig?.left) {
        x = _x
    } else {
        x = _x - scrollLeft
    }
    if (rowIndex < config.fixedConfig?.header) {
        y = _y
    } else {
        y = _y - scrollTop
    }
    return {
        x,
        y
    }
}

export const isColInCombineRange = (rowIndex, colIndex, combineRange) => {
    if (rowIndex >= combineRange.start[0] && rowIndex <= combineRange.end[0] && colIndex >= combineRange.start[1] && colIndex <= combineRange.end[1]) {
        return true
    } else {
        return false
    }
}

/**
 * 判断两个range组成的矩形是否相交
 * 根据两个矩形的中间点之间距离是否大于两边边长合来判断
 */
export const hasOverlap = (aRange, bRange) => {
    const center1 = [(aRange.end[0] + aRange.start[0]) / 2, (aRange.end[1] + aRange.start[1]) / 2]
    const center2 = [(bRange.end[0] + bRange.start[0]) / 2, (bRange.end[1] + bRange.start[1]) / 2]

    const aRangeWidth = aRange.end[0] - aRange.start[0];
    const aRangeHeight = aRange.end[1] - aRange.start[1];

    const bRangeWidth = bRange.end[0] - bRange.start[0];
    const bRangeHeight = bRange.end[1] - bRange.start[1];

    return ((center2[0] - center1[0]) <= (aRangeWidth + bRangeWidth) / 2) && ((center2[1] - center1[1]) <= (aRangeHeight + bRangeHeight) / 2)
}

/**
 * 判断数组range中是否包含这一项的交叉
 * @param combineRanges : 数组
 * @param selectRange : 单项
 * @returns 
 */
export const getIsCross = (combineRanges, selectRange) => {
    let hasCross = false;
    combineRanges.forEach(range => {
        if (hasOverlap(range, selectRange)) {
            hasCross = true
        }
    })
    return hasCross
}