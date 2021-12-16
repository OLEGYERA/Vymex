import {Engine} from '@/core/Engine'


export default {
  install(Vue, options) {
    Vue.prototype.$engine = new Engine(options)

    // Vue.mixin({
    //   created() {
    //     console.log(Vue);
    //   }
    // });
  }
}