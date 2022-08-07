import type {Plugin} from '../types' 
const testPlugin: Plugin<any, any[]> = (fetchInstance) => {
    return {
        onSuccess: (data) => {
            console.log(`======= ${JSON.stringify(data)}======`)
        }
    }
}

export {
    testPlugin
}