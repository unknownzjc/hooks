<template>
    <div>{{count}}</div>
    <button @click="submit">submit</button>
    <div>==========================================</div>
    <div>测试 useRequest</div>
    <div>
        <div>loading: {{loading}}</div>
        <div>data: {{data}}</div>
    </div>
    <button @click="run">请求</button>
    <button @click="cancel">取消</button>
</template>

<script lang="ts">
import { defineComponent, ref} from 'vue'
import { useLockFn } from './useLockFn';
import { useRequest } from './useRequest'

function mockApiRequest() {
  return new Promise<any>((resolve,reject) => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: {
            a: 1
        }
      })
    }, 4000);
  });
}
export default defineComponent({
    setup() {
        const count = ref(1)
        const submit = useLockFn(async () => {
            console.log('Start to submit');
            await mockApiRequest();
            count.value += 1;
            console.log('Submit finished');
        })
        const { run, cancel, loading, data } = useRequest(mockApiRequest)
        return {
            count,
            submit,
            loading,
            data,
            run,
            cancel
        }
    }
})
</script>