1. firestore比较慢， 会有明显延迟；建议使用realtime database： https://firebase.google.com/docs/database/web/structure-data
2. Yjs完全封装了协同、undo/redo等方法，可以直接使用Yjs配合realtime database做demo： https://github.com/yjs/yjs/issues/189
3. Yjs也提供了后端服务模版代码，正式产品可以使用；

immer使用的JSON OP描述与YJS不兼容， 所以在store层如果使用YJS， 就不能用immer的patch了；
immer使用的JSON规范：https://datatracker.ietf.org/doc/html/rfc6902/#section-4.1

如果用了Yjs， 就不需要用immer了， Yjs本身就是store；
