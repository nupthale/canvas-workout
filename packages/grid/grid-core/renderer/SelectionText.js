import { drawPureColorRect } from "../utils/draw.js";

export default class SelectionText {
    constructor(context) {
        this.context = context;
        this.ctx = context.canvasCtx;

        this.isMouseDown = false
        this.initialX = 0;
        this.textInput = null;
        this.eventX = 0;
    }

    createTextInput() {
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.style.position = 'absolute';
        textInput.style.opacity = 0;
        textInput.style.pointerEvents = 'none';
        textInput.style.zIndex = 0;
        // 高度0隐藏，这里不能display none隐藏，不然就无法select了。
        textInput.style.height = 0 + 'px';
        document.body.appendChild(textInput);
        this.textInput = textInput;
    }

    // 这种方案只能是选中一行内的，如果有换行选中width就有问题。
    getSelectedText(startX, text, i) {
        let currentWidth = startX;
        let selectedWidth = 0
        const startIndex = i
        
        if (this.eventX >= this.initialX) {
            for(;i < text.length; i++) {
                const width = this.ctx.measureText(text[i]).width
                currentWidth += width
                selectedWidth += width
                if (currentWidth > this.eventX) {
                    break
                }
            }
        } else {
            for(i = i - 1;i >= 0; i--) {
                const width = this.ctx.measureText(text[i]).width
                currentWidth -= width
                selectedWidth -= width
                if (currentWidth < this.eventX) {
                    break
                }
            }
        }

        return {
            selectedText: this.eventX >= this.initialX ? text.substring(startIndex, i + 1) : text.substring(i - 1, startIndex),
            selectedWidth,
        }
    }

    render({ selection }) {
        if (!this.textInput) {
            this.createTextInput()
        }
        const { config, event$, dom } = this.context
        const activeCol = selection.activeCol;

        if (!activeCol) {
            return;
        }

        const {left} = dom.getBoundingClientRect();

        event$.on('mousedown', (e) => {
            this.isMouseDown = true
            this.initialX = e.clientX - left;
            this.eventX = e.clientX - left;
        })

        event$.on('mouseup', () => {
            this.isMouseDown = false
        })

        event$.on('mousemove', (e) => {
            if (this.isMouseDown) {
                // 创建inputDom
                const eventX = e.clientX - left;
                this.eventX = eventX

                // 选中
                if (this.eventX !== this.initialX) {
                    this.textInput.focus();
                    this.textInput.select();
                }
            }
        })

        // 计算选中的文字内容
        // 「activeCol.x + activeCol.combineWidth / 2」是文字渲染的位置
        // 又由于alignCenter，所以要减去文字的宽度 / 2，大致就是开始的位置
        const textValue = config.getText(activeCol.rowIndex, activeCol.colIndex) + ''
        const textWidth = this.ctx.measureText(textValue).width
        const startX = activeCol.x + activeCol.combineWidth / 2 - textWidth / 2
        const startMaxX = activeCol.x + activeCol.combineWidth / 2 + textWidth / 2

        // 计算开始的index
        let i = 0;
        let totalWidth = startX;
        // 开始的点在startX后面
        if (startX < this.initialX) {
            for(i = 0; i < textValue.length; i++) {
                const width = this.ctx.measureText(textValue[i]).width
                totalWidth += width
                if (totalWidth > this.initialX) {
                    totalWidth -= width
                    break;
                }
            }
        }

        const {selectedText, selectedWidth} = this.getSelectedText(totalWidth, textValue, i)
        this.textInput.value = selectedText
        this.textInput.style.width = selectedWidth + 'px';

        // 只有不等的时候才绘制rect
        if (this.eventX !== this.initialX && this.isMouseDown) {
            const rect = {
                x: this.initialX < startX ? startX : totalWidth,
                y: activeCol.y + activeCol.height / 2 - 8,
                width: selectedWidth,
                height: 14,
            };
    
            drawPureColorRect(
                this.ctx,
                rect.x,
                rect.y,
                rect.width,
                rect.height,
                'rgba(130,167,252, 0.5)',
            );
        }
    }
}
