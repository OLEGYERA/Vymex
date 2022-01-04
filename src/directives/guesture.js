import Vue from 'vue';
/*eslint-disable*/

let V_ELEMENT, V_NODE;

function WHEEL_EVENT_HANDLER(event){
  console.log(event)
}



Vue.directive('gesture', {
  bind: (el, binding, vnode) => {
    V_ELEMENT = el;
    V_NODE = vnode


    el.addEventListener('wheel', WHEEL_EVENT_HANDLER, false)
  },
  unbind(el, binding) {
    el.removeEventListener('scroll', handleWheelEvent)
  }
})