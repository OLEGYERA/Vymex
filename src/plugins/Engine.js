import {Engine} from '@/core/Engine'
import ConsoleNotifier from "@/core/ConsoleNotifier";

export default {
  install(Vue, options) {
    Vue.prototype.$engine = new Engine(options)
    Vue.prototype.$console = new ConsoleNotifier('Vue')
  }
}