import Vue from 'vue'
import Router from '@/router'

export default class Binder{
  get $core(){
    return Vue.prototype.$core;
  }
  get $router(){
    return Router;
  }
  get $store(){
    return this.$core.store;
  }
  get $socket(){
    return this.$core.socket;
  }
  get $log(){
    return this.$core.log;
  }

  get $notify(){
    return Vue.notify
  }
}