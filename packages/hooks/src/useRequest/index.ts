import type { Service, UseRequestOptions, UseRequestReturn } from "./types";
import { useRequestImplement } from "./useRequestImplement";
export function useRequest<TData, TParams extends any[]>(service: Service, options?: UseRequestOptions): UseRequestReturn<TData, TParams> {
    return useRequestImplement(service, options)
}