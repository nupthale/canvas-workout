import {dispatch, crtState} from "../../store/index.js";

import {history, redo} from "../../store/history.js";

import {sendToServer} from "../../collaboration/firestore.js";


export default class Undo {
    constructor(grid) {
        this.dom = this.initDom();

        this.grid = grid;

        this.initEvt();
    }

    initDom() {
        const $container = document.createElement('div');
        $container.classList.add('command');

        $container.innerHTML = '<svg t="1666097206634" class="icon" fill="none"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2538" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><path d="M67.52 455.552v0.448h115.84l0.128-0.448h275.264L276.672 274.944a336 336 0 1 1 182.08 568.448v113.472a448 448 0 1 0-263.04-762.24L64 64v391.552h3.52z" fill="currentColor" p-id="2539"></path></svg>';

        const $undo = document.createElement('div');
        $undo.style.marginLeft = '6px';
        $undo.innerText = 'Undo';

        $container.appendChild($undo);

        return $container;
    }

    initEvt() {
        this.dom.addEventListener('click', async () => {
            const op = history.pop();

            if (!op) {
               return;
            }

            redo.push(op);

            await sendToServer(op.undo);

            dispatch({
                type: 'applyPatch',
                payload: op.undo,
            });
        });
    }
}
