import { sendToServer } from "../collaboration/firestore.js";

export const history = [];

export const redo = [];

export const handleAddPatch = async (patch, inversePatch, clearRedo) => {
    if (clearRedo) {
        redo.length = 0;
    }

    history.push({
        redo: patch,
        undo: inversePatch,
    });

    await sendToServer(patch);
}
