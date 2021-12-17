import Vue from 'vue'
import Preload from '@/app/preload/routing'
import Auth from '@/app/auth/routing'
import Vx from '@/app/vx/routing'



import VueRouter from 'vue-router'
Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'preload.launch'
      }
    },
    ...Preload,
    ...Auth,
    ...Vx,
  ]
});