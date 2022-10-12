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