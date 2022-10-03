import Stage from "../../engine/stage";

import { style } from "./style";

export default function zIndexExample(mountId) {
    const root = (
        <view>
            <view id="1" style={style.$div1}>
                <view id="2" style={style.$div2}></view>
            </view>
            <view id="3" style={style.$div3}>
                <view id="4" style={style.$div4}></view>
            </view>
        </view>
    );

    new Stage(root, document.getElementById(mountId), 800, 800);
}
