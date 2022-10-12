// 计算向量叉积
const multiply = (v1, v2) => {
    return v1[0] * v2[1] - v2[0] * v1[1];
}

// 叉积小于0代表线相交
export const hasRelation = (aRange, bRange) => {
    return multiply([aRange.end[0] - aRange.start[0], aRange.end[1] - aRange.start[1]], [bRange.end[0] - bRange.start[0], bRange.start[1] - bRange.end[1]]) < 0
}