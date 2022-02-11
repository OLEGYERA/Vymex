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
Vue.component('icon-volume-off', () => import('./VolumeOff'));

Vue.component('icon-success', () => import('./Success'));
Vue.component('icon-dropdown-arrow', () => import('./DropdownArrow'));



Vue.component('icon-success', () => import('./Success'));
Vue.component('icon-dropdown-arrow', () => import('./DropdownArrow'));
Vue.component('icon-notebook', () => import('./Notebook'));
Vue.component('icon-language', () => import('./Language'));
Vue.component('icon-location', () => import('./Location'));
Vue.component('icon-home', () => import('./Home'));
Vue.component('icon-phone', () => import('./Phone'));
Vue.component('icon-info', () => import('./Info'));

Vue.component('icon-points-vertical', () => import('./PointsVertical'));
