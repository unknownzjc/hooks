import {ref} from 'vue-demi'
import type { Ref } from "vue-demi";
import type { Service } from './types'
export default class Fetch<TData extends any, TParams extends any[]> {
    loading: Ref<boolean>
    data: Ref<TData>
    service: Service<TData, TParams>
    constructor(service: Service) {
        this.loading = ref(false)
        this.data = ref(undefined as unknown as any)
        this.service = service
    }
    run(...params: TParams) {
        return this.runAsync(...params)
    }
    async runAsync(...params: TParams) {
        this.loading.value = true
        try {
            let res = await this.service(...params)
            this.data.value = res
            this.loading.value = false
            return res
        } catch(e) {
            this.loading.value = false
            throw e
        }
    }
    cancel() {
        
    }
}