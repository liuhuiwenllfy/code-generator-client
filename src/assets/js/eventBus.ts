import mitt from 'mitt'
// 总线
let emitter = null as any;

export const createEmitter = () => {
    if (!emitter) {
        emitter = mitt();
    }
    return emitter;
}

export const destroyEmitter = () => {
    if (emitter) {
        emitter.all.clear();
        emitter = null;
    }
}
