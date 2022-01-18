import Vue from 'vue'
import App from './App.vue'
import store from '@/storage'
import router from '@/router'
import Notifications from 'vue-notification'
import '@/directives/guesture'
// import {Engine} from "@/core/Engine";
Vue.use(Notifications)

import Core from "@/LTE/Core";


// Vue.prototype.$engine = new Engine({socketClient: {connection: 'wss://ponchik.app:7777'}});
Vue.prototype.$core = new Core({socket: {connection: 'wss://ponchik.app:7777'}});

Vue.config.productionTip = false
Vue.config.devtools = true


// Vue.config.errorHandler = err => (new ErrorHandler('Error')).onError(err);
// Vue.config.warnHandler = err => (new ErrorHandler('Warn')).onError(err);



new Vue({
  store,
  router,
  beforeCreate() {
    this.$router.push({name: 'preload.launch'}).catch(() => {})
  },
  render: h => h(App),
}).$mount('#app')
