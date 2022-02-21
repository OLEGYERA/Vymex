import Vue from 'vue'
import App from './App.vue'
import store from '@/storage'
import {mapMutations} from "vuex";
import router from '@/router'
import Notifications from 'vue-notification'
import EnginePlugin from "@/plugins/Engine";
import panZoom from 'vue-panzoom'

import '@/directives/guesture'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(panZoom);
Vue.use(Notifications)

import Core from "@/LTE/Core";

import '@Icon/index'



Vue.prototype.$core = new Core({socket: {connection:  'wss://ponchik.app:7777'}});
// Vue.prototype.$core = new Core({socket: {connection: 'wss://dev.vymex.com:7777'}});
// Vue.prototype.$core = new Core({socket: {connection: 'wss://socketn.vymex.com'}});

Vue.config.productionTip = true;
Vue.config.devtools = true;
Vue.config.debug = true;
// Vue.config.silent = true;

new Vue({
  store,
  router,
  beforeCreate(){
    this.$core.install();
    this.$router.push({name: 'preload.launch'}).catch(() => {})
  },
  methods: {
    ...mapMutations({
      pushOverlapRoute: 'History/pushOverlapRoute',
      returnOverlapRoute: 'History/returnOverlapRoute',
      clearOverlapRoute: 'History/clearOverlapRoute',
    })
  },
  render: h => h(App),
}).$mount('#app')
