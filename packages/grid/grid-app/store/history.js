export const history = [];

export const redo = [];

export const handleAddPatch = (patch, inversePatch, clearRedo) => {
    if (clearRedo) {
        redo.length = 0;
    }

    history.push({
        redo: patch,
        undo: inversePatch,
    });
}
