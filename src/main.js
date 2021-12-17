import Vue from 'vue'
import App from './App.vue'
import store from '@/storage'
import router from '@/./router'
import Notifications from 'vue-notification'
import EnginePlugin from "@/plugins/Engine";


Vue.config.productionTip = false
Vue.config.devtools = true


Vue.use(Notifications)
Vue.use(EnginePlugin, {
  socketClient: {
    connection: 'ws://ponchik.app:7777'
  }
})



// Vue.config.errorHandler = err => (new ErrorHandler('Error')).onError(err);
// Vue.config.warnHandler = err => (new ErrorHandler('Warn')).onError(err);



new Vue({
  store,
  router,
  beforeCreate() {
    this.$router.push({name: 'preload.launch'}).catch(() => {})
  },
  data: {
    eventBus: new Vue()
  },
  render: h => h(App),
}).$mount('#app')
