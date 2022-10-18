import {dispatch} from "../../store/index.js";

function getRandomColor() { //随机生成RGB颜色
    const r = Math.floor(Math.random() * 256); //随机生成256以内r值
    const g = Math.floor(Math.random() * 256); //随机生成256以内g值
    const b = Math.floor(Math.random() * 256); //随机生成256以内b值
    return `rgb(${r},${g},${b}, 0.4)`; //返回rgb(r,g,b)格式颜色
}

export default class RandomBackground {
    constructor(grid) {
        this.dom = this.initDom();
        this.grid = grid;

        this.initEvt();
    }

    initDom() {
        const $container = document.createElement('div');
        $container.classList.add('command');

        $container.innerHTML = '<svg t="1666101261652" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1861" width="20" height="20"><path d="M883.84 211.498667v186.410666a96 96 0 0 1-96 96H534.826667v49.173334h7.637333a64 64 0 0 1 64 64V810.666667a64 64 0 0 1-64 64h-79.253333a64 64 0 0 1-64-64v-203.584a64 64 0 0 1 64-64h7.616v-113.173334H787.84a32 32 0 0 0 32-32V211.498667h64zM542.485333 607.082667h-79.253333V810.666667h79.253333v-203.584zM727.765333 149.333333a64 64 0 0 1 64 64v120.682667a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V213.333333a64 64 0 0 1 64-64h514.432z m0 64H213.333333v120.682667h514.432V213.333333z" p-id="1862"></path></svg>';

        const $text = document.createElement('div');
        $text.style.marginLeft = '6px';
        $text.innerText = 'Random background';

        $container.appendChild($text);

        return $container;
    }

    initEvt() {
        this.dom.addEventListener('click', () => {
            const { selection } = this.grid;
            const { activeCol, selectionCol } = selection;

            if (activeCol) {
                const color = getRandomColor();

                let startRowIndex = activeCol.rowIndex;
                let startColIndex = activeCol.colIndex;
                let endRowIndex = activeCol.rowIndex;
                let endColIndex = activeCol.colIndex;

                if (selectionCol) {
                    endRowIndex = selectionCol.rowIndex;
                    endColIndex = selectionCol.colIndex;
                }

                const payload = [];
                for (let i = startRowIndex; i <= endRowIndex; i++) {
                    for (let j = startColIndex; j <= endColIndex; j++) {
                        payload.push({
                            rowIndex: i,
                            colIndex: j,
                            color,
                        });
                    }
                }

                dispatch({
                    type: 'changeBackgroundBatch',
                    payload,
                })
            }
        });
    }
}
