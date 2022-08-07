import {ref} from 'vue-demi'
import type { Ref } from "vue-demi";
import type { Service, Plugin, PluginReturn } from './types'
export default class Fetch<TData extends any, TParams extends any[]> {
    loading: Ref<boolean>
    data: Ref<TData>
    service: Service<TData, TParams>
    count: number = 0
    plugins: PluginReturn<TData, TParams>[] = []
    constructor(service: Service) {
        this.loading = ref(false)
        this.data = ref(undefined as unknown as any)
        this.service = service
    }
    registePlugin(plugins: Plugin<TData, TParams>[]) {
        this.plugins = plugins.map(plugin => plugin(this))
    }
    runPluginEvent(event: keyof PluginReturn<TData, TParams>, ...args: any[]) {
        this.plugins.forEach(plugin => {
            plugin[event]?.(...args)
        })
    }
    run(...params: TParams) {
        return this.runAsync(...params)
    }
    async runAsync(...params: TParams) {
        this.count += 1;
        const currentCount = this.count
        this.loading.value = true
        try {
            let res = await this.service(...params)
            if(currentCount !== this.count) return new Promise(() => {})
            this.data.value = res
            this.loading.value = false
            this.runPluginEvent('onSuccess', res)
            return res
        } catch(e) {
            this.loading.value = false
            throw e
        }
    }
    cancel() {
        this.count += 1;
        this.loading.value = false
    }
}