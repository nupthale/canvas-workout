import * as Y from 'yjs'
import {FirebaseProvider} from "./FirebaseProvider.js";

export const doc = new Y.Doc();

export const state = doc.getMap('state');

export const combineRanges = doc.getArray('combineRanges');
state.set('combineRanges', combineRanges);

const decorators = doc.getMap('decorators');
export const background = doc.getArray('background');
decorators.set('background', background);
state.set('decorators', decorators);

export const fixedConfig = doc.getMap('fixedConfig');
state.set('fixedConfig', fixedConfig);

export const colWidths = doc.getMap('colWidths');
state.set('colWidths', colWidths);

export const rowHeights = doc.getMap('rowHeights');
state.set('rowHeights', rowHeights);

const firebaseProvider = new FirebaseProvider(doc)

// observe changes of the sum
state.observe(event => {
    // print updates when the data changes
    debugger;
    console.log('new sum: ' + state.toJSON());
});
