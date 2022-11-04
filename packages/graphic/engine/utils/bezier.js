function isMonotonicity(P0, P1, P2, key) {
    return (P0[key] <= P1[key] && P1[key] <= P2[key]) || (P0[key] >= P1[key] && P1[key] >= P2[key]);
}

function includePointByMin(p0, p1) {
    return {
        x: Math.min(p0.x, p1.x),
        y: Math.min(p0.y, p1.y),
    };
}
function includePointByMax(p0, p1) {
    return {
        x: Math.max(p0.x, p1.x),
        y: Math.max(p0.y, p1.y),
    };
}

function getControl(
    P0,
    P1,
    P2,
    P3,
    smoothMonotone,
) {
    const rateAX = smoothMonotone === 'y' && isMonotonicity(P0, P1, P2, 'y') ? 0 : 0.25;
    const rateAY = smoothMonotone === 'x' && isMonotonicity(P0, P1, P2, 'x') ? 0 : 0.25;
    const rateBX = smoothMonotone === 'y' && isMonotonicity(P1, P2, P3, 'y') ? 0 : 0.25;
    const rateBY = smoothMonotone === 'x' && isMonotonicity(P1, P2, P3, 'x') ? 0 : 0.25;

    return [
        P1,
        {
            x: P1.x + rateAX * (P2.x - P0.x),
            // x: P1.x + 0 * (P2.x - P0.x),
            y: P1.y + rateAY * (P2.y - P0.y),
            // y: P1.y + 0 * (P2.y - P0.y),
        },
        {
            x: P2.x - rateBX * (P3.x - P1.x),
            // x: P2.x - 0 * (P3.x - P1.x),
            y: P2.y - rateBY * (P3.y - P1.y),
            // y: P2.y - 0 * (P3.y - P1.y),
        },
        P2,
    ];
}

export function getBezierList(
    path,
    isLoop,
    smoothConstraint,
    smoothMonotone,
) {
    const length = path.length;
    const outPath = [];
    // let min: number = path[0].y;
    // let max: number = path[0].y;
    let min;
    let max;
    // for (let j: number = 0; j < path.length; j = j + 1) {
    //     const i: Point = path[j];
    //     if (i.y > max) {
    //         max = i.y;
    //     }
    //     if (i.y < min) {
    //         min= i.y;
    //     }
    // }

    if (smoothConstraint) {
        // min = smoothConstraint[0];
        // max = smoothConstraint[1];
        min = { x: Infinity, y: Infinity };
        max = { x: -Infinity, y: -Infinity };
        for (let j = 1; j < path.length; j += 1) {
            const i = path[j];
            min = includePointByMin(i, min);
            max = includePointByMax(i, max);
        }

        min = includePointByMin(min, smoothConstraint[0]);
        max = includePointByMax(max, smoothConstraint[1]);
    }
    const maxL = isLoop ? length : length - 1;

    for (let i = 0; i < maxL; i += 1) {
        let controlP;
        if (!isLoop) {
            controlP = getControl(
                path[Math.max(0, i - 1)], // safe array steps
                path[i],
                path[Math.min(i + 1, length - 1)], // safe Array steps
                path[Math.min(i + 2, length - 1)], // safe Array steps
                smoothMonotone,
            );
        } else {
            controlP = getControl(
                path[(i - 1 + length) % length], // safe array steps
                path[i],
                path[(i + 1) % length], // safe array steps
                path[(i + 2) % length], // safe array steps
                smoothMonotone,
            );
        }

        for (let t = 0; t < controlP.length; t += 1) {
            let j = controlP[t];
            if (smoothConstraint) {
                j = includePointByMax(j, min);
                j = includePointByMin(j, max);
                controlP[t] = j;
            }
            // if (j.y < min) {
            //     j.y = min;
            // }
            // if (j.y > max) {
            //     j.y = max;
            // }
        }

        outPath.push(controlP); // store each value
    }

    return outPath;
}
