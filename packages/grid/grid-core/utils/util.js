export const PIXEL_RATIO = (() => {
    const ctx = document.createElement('canvas').getContext('2d'),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx['webkitBackingStorePixelRatio'] ||
            ctx['mozBackingStorePixelRatio'] ||
            ctx['msBackingStorePixelRatio'] ||
            ctx['oBackingStorePixelRatio'] ||
            ctx['backingStorePixelRatio'] || 1;

    const ratio = dpr / bsr;
    return ratio < 1 ? 1 : ratio;
})();

export const isEventInView = (x, y, view) => {
    return (
        (x > view.x && x < view.x + view.width) &&
        (y > view.y && y < view.y + view.height)
    );
}
