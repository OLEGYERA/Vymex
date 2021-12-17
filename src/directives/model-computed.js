import Vue from 'vue';

Vue.directive('model-vuex', function(el, binding) {
  if(!binding.value) return;
  Vue.set(el.__vue__._props, 'value', binding.value);
});






  // Vue.directive('model-vuex', function(el, binding, vNode) {
  //   if(!binding.value) return;
  //   Vue.set(el.__vue__._props, 'value', binding.value);
  //
  //   el.addEventListener('input-vuex', (e)=>{
  //     // const event = new CustomEvent('customevent', {detail: {
  //     //     custom: "data",
  //     //     can: "be",
  //     //     in: "detail property"}, bubbles: true});
  //     // el.dispatchEvent(event);
  //   })
  //
  //
  //
  //   // Vue.set(el.__vue__._props.errorMessages,
  //   //   el.__vue__._props.errorMessages.length,
  //   //   ...formErrors.getAll(getErrorKey(value)));
  //   //
  //
  //
  // });
