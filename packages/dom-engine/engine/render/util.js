export const shouldClipCtx = (element) => {
    try {
        const style = element.getComputedStyle();

        return style.overflow !== 'visible';
    } catch(e) {
    }
}
