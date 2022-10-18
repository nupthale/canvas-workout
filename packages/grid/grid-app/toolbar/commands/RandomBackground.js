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

        // $container.innerHTML = '<svg t="1666101261652" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1861" width="20" height="20"><path d="M883.84 211.498667v186.410666a96 96 0 0 1-96 96H534.826667v49.173334h7.637333a64 64 0 0 1 64 64V810.666667a64 64 0 0 1-64 64h-79.253333a64 64 0 0 1-64-64v-203.584a64 64 0 0 1 64-64h7.616v-113.173334H787.84a32 32 0 0 0 32-32V211.498667h64zM542.485333 607.082667h-79.253333V810.666667h79.253333v-203.584zM727.765333 149.333333a64 64 0 0 1 64 64v120.682667a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V213.333333a64 64 0 0 1 64-64h514.432z m0 64H213.333333v120.682667h514.432V213.333333z" p-id="1862"></path></svg>';
        $container.innerHTML = '<svg t="1666101530890" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8948" width="16" height="16"><path d="M21.424 767.942c-11.778 0-21.308 9.56-21.308 21.338v213.294c0 11.78 9.53 21.308 21.308 21.308h981.086c11.808 0 21.372-9.53 21.372-21.308V789.28c0-11.778-9.562-21.338-21.372-21.338H21.424z" fill="#AC92EB" p-id="8949"></path><path d="M996.512 652.438l-81.668-197.048c-4.498-10.874-16.996-16.06-27.868-11.53L0.118 811.212v110.974l42.116 101.696h113.224l829.498-343.578c10.87-4.498 16.056-16.964 11.556-27.866z" fill="#5D9CEC" p-id="8950"></path><path d="M0.118 947.212l76.67 76.67h102.976l657.35-657.318c8.308-8.342 8.308-21.838 0-30.18l-150.842-150.81c-8.31-8.342-21.806-8.342-30.148 0L0.118 841.612v105.6z" fill="#4FC2E9" p-id="8951"></path><path d="M0.118 981.424l102.476 42.458h110.974L580.922 136.992c4.53-10.872-0.624-23.37-11.53-27.868l-197.048-81.606c-10.872-4.53-23.37 0.656-27.868 11.53L0.118 870.48v110.944z" fill="#48CFAD" p-id="8952"></path><path d="M0.118 1002.574c0 11.78 9.53 21.308 21.308 21.308h213.264c11.81 0 21.37-9.53 21.37-21.308V21.458c0-11.78-9.56-21.34-21.37-21.34H21.424C9.646 0.118 0.116 9.678 0.116 21.458v981.116z" fill="#A0D468" p-id="8953"></path><path d="M0.118 767.972v234.602c0 11.78 9.53 21.308 21.308 21.308h213.264c11.81 0 21.37-9.53 21.37-21.308V767.972H0.118z" fill="#E6E9ED" p-id="8954"></path><path d="M128.088 874.604c-11.81 0-21.37 9.53-21.37 21.308s9.56 21.338 21.37 21.338c11.748 0 21.308-9.558 21.308-21.338s-9.562-21.308-21.308-21.308z" p-id="8955"></path><path d="M136.21 916.44c-10.874 4.498-23.338-0.656-27.87-11.56-4.5-10.874 0.688-23.338 11.56-27.87 10.872-4.498 23.37 0.688 27.868 11.56s-0.684 23.37-11.558 27.87z" p-id="8956"></path><path d="M143.334 909.502c-8.31 8.31-21.808 8.31-30.15 0a21.326 21.326 0 0 1 0-30.18c8.342-8.31 21.838-8.31 30.15 0a21.326 21.326 0 0 1 0 30.18z" p-id="8957"></path><path d="M147.77 904.098c-4.5 10.874-16.996 16.028-27.868 11.53-10.874-4.5-16.06-16.996-11.56-27.87 4.53-10.874 16.996-16.058 27.87-11.53 10.902 4.5 16.058 16.966 11.558 27.87z" p-id="8958"></path><path d="M106.718 895.912c0 11.78 9.56 21.338 21.37 21.338 11.748 0 21.308-9.558 21.308-21.338s-9.56-21.308-21.308-21.308c-11.81 0-21.37 9.528-21.37 21.308z" p-id="8959"></path><path d="M106.718 895.912c0 11.78 9.56 21.338 21.37 21.338 11.748 0 21.308-9.558 21.308-21.338s-9.56-21.308-21.308-21.308c-11.81 0-21.37 9.528-21.37 21.308z" fill="#434A54" p-id="8960"></path></svg>';

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
