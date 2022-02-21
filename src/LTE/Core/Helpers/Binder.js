import Vue from 'vue'
import Router from '@/router'

const CORE = Vue.prototype;

export default class Binder{
  get $log(){
    return CORE.$core.log;
  }
  get $store(){
    return CORE.$core.store;
  }
  get $socket(){
    return CORE.$core.socket;
  }
  get $router(){
    return Router;
  }
  get $notify(){
    return Vue.notify
  }
}