<template>
    <div>{{count}}</div>
    <button @click="submit">submit</button>
</template>

<script lang="ts">
import { defineComponent, ref} from 'vue'
import { useLockFn } from './useLockFn';

function mockApiRequest() {
  return new Promise<void>((resolve,reject) => {
    setTimeout(() => {
      reject('some error happend');
    }, 2000);
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
        // const submit = async () => {
        //     console.log('Start to submit');
        //     await mockApiRequest();
        //     count.value += 1;
        //     console.log('Submit finished');
        // }
        return {
            count,
            submit
        }
    }
})
</script>