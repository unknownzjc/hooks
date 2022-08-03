import type {Ref} from 'vue-demi'
export type Service<TData extends any = any, TParams extends any[] = []> = (...params: TParams) => Promise<TData>
export interface UseRequestOptions {
    manual?: boolean
}

export interface UseRequestReturn<TData extends any = any, TParams extends any[] = []> {
    loading: Ref<boolean>
    data: Ref<TData>
    run: (...params: TParams) => void
    runAsync: (...params: TParams) => Promise<TData>
    cancel: () => void
}