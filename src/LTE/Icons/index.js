// const ctx = require.context('./', true, /^(?!.*(?:\/_|-story\.vue|-test\.vue)).*\.vue$/)();
// // const components = ctx.keys().map(ctx);
//
// console.log(ctx)

import Vue from 'vue'
Vue.component('icon-add', () => import('./Add'));
Vue.component('icon-alarm', () => import('./Alarm'));
Vue.component('icon-error', () => import('./Error'));
Vue.component('icon-volume', () => import('./Volume'));
Vue.component('icon-profile', () => import('./Profile'));
Vue.component('icon-chat', () => import('./Comments')); //Should be refactor
Vue.component('icon-setting', () => import('./Setting'));
Vue.component('icon-search', () => import('./Search'));
