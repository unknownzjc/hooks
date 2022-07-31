import { ref } from 'vue-demi'

export function useLockFn<T extends any[] = any[], V extends any = any>(fn: (...params: T) => Promise<V>) {
    const lock = ref(false);
    const run = async (...args: T) => {
        if(lock.value) return;
        lock.value = true;
        try{
            let ret = await fn(...args);
            lock.value = false
            return ret
        }catch(e) {
            lock.value = false;
            throw e;
        }
    }
    return run;
}