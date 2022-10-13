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
 * cx1=max(ax1,bx1)         //左下x为最大的左下x集合
 * cy1=max(ay1,by1)         //左下y为最大的左下y集合
 * cx2=min(ax2,bx2)         //右上x为最小的右上x集合
 * cy2=min(ay2,by2)         //右上y为最小的右上y集合
 * 如果两个矩形不相交，那么满足：（cx1>cx2）||（cy1>cy2）
 * 也就是说，如果矩形相交就条件相反
 */
export const hasOverlap = (aRange, bRange) => {
    const cx1 = Math.max(aRange.start[0], bRange.start[0]);
    const cy1 = Math.min(aRange.start[1], bRange.start[1]);
    const cx2 = Math.min(aRange.end[0], bRange.end[0]);
    const cy2 = Math.max(aRange.end[1], bRange.end[1]);

    return !(cx1 > cx2 || cy1 > cy2)
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