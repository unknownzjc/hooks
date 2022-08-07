import Fetch from "./fetch";
import { testPlugin } from './plugin';
import type { Service, UseRequestOptions, UseRequestReturn } from "./types";
export function useRequestImplement(service: Service, options?: UseRequestOptions): UseRequestReturn {
    const fetchInstance = new Fetch(service);
    fetchInstance.registePlugin([testPlugin])
    return {
        loading: fetchInstance.loading,
        data: fetchInstance.data,
        run: fetchInstance.run.bind(fetchInstance),
        runAsync: fetchInstance.runAsync.bind(fetchInstance),
        cancel: fetchInstance.cancel.bind(fetchInstance)
    }
}