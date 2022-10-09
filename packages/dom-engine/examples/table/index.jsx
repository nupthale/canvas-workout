import Stage from '../../engine/stage';

import {columns, dataSource } from "./mock";

import {style, tableWidth, tableHeight} from "./style";

import {width, height, cellStyle} from "./meta.js";

function getTHead() {
    return (
        <view style={style.thead}>
            <view style={style.row} rowIndex={0}>
                {
                    columns.map((col, colIndex) => {
                        return (
                            <view style={style.col}>
                                <text>{columns[colIndex].title}</text>
                            </view>
                        )
                    })
                }
            </view>

            <view style={{
                position: 'sticky',
                width: 100,
                left: 1,
                top: 0,
            }}>
                <view style={style.col}>
                    <text>{columns[0].title}</text>
                </view>
            </view>
        </view>
    );
}

function getFixedLeft() {
    return (
        <view style={{
            position: 'sticky',
            left: 1,
            top: 0,
        }}>
            {
                dataSource.map((row, rowIndex) => {
                    return (
                        <view style={style.row}>
                            {
                                columns.filter(col => col.fixed === 'left').map((col, colIndex) => {
                                    return (
                                        <view style={{
                                            ...style.col,
                                            width: col.width || cellStyle.width,
                                        }}>
                                            <text>{dataSource[rowIndex][columns[colIndex].dataIndex]}</text>
                                        </view>
                                    );
                                })
                            }
                        </view>
                    );
                })
            }
        </view>
    )
}

function getTBody() {
    return (
        <view style={style.tbody}>
            <view>
            {
                dataSource.map((row, rowIndex) => {
                    return (
                        <view style={style.row}>
                            {
                                columns.map((col, colIndex) => {
                                    return (
                                        <view style={{
                                            ...style.col,
                                            width: col.width || cellStyle.width,
                                        }}>
                                            <text>{dataSource[rowIndex][columns[colIndex].dataIndex]}</text>
                                        </view>
                                    );
                                })
                            }
                        </view>
                    );
                })
            }
            </view>

            {getFixedLeft()}
        </view>
    );
}

let stage;

export default function tableExample(mountId) {
    const dom = (
        <view style={style.container}>
            <view style={{ boxShadow: [] }}>
                <scrollable scrollWidth={tableWidth} scrollHeight={tableHeight} onScroll={() => {
                    stage.reflow()
                }}>
                    <view style={style.table}>
                        {getTHead()}
                        {getTBody()}
                    </view>
                </scrollable>
            </view>
        </view>
    );

    stage = new Stage(dom, document.getElementById(mountId), width, height);
}
