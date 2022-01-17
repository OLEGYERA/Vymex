/*eslint-disable*/
import GestureBase from "@Services/Gesture/Base";

class Gesture extends GestureBase{
  constructor() {
    super();
  }

  bind(e, r, n) {
    this.bindDirectives(e, r, n);

    if(this.bindHooks() && this.bindValues()) {
      this.bindHandler();
      e.addEventListener('wheel', (e) => this.handler.watch(e), false);
    }
  }


  install(){
    return {bind: (e,r,n) => this.bind(e,r,n)}
  }

}

export default new Gesture();


// update: (e, r, n) => {
//   BIND_EL = e; BIND_REF = r; BIND_NODE = n;
//   const value = BIND_REF.value;
//
//   if(value){
//     if(typeof value !== 'object') {
//       console.error('Gesture value must be Object')
//       return;
//     }
//     //учесть свойства чисто для Zoom или Swipe
//     if(value.duration){
//       GestureAnimation.zoom.duration = GestureAnimation.swipe.duration = value.duration;
//     } else {
//       if(value.zoomDuration){
//         GestureAnimation.zoom.duration = value.zoomDuration
//       }
//       if(value.swipeDuration){
//         GestureAnimation.swipe.duration = value.swipeDuration
//       }
//     }
//
//     if(value.animate && AnimatorList[value.animate]){
//       GestureAnimation.zoom.animate = GestureAnimation.swipe.animate = AnimatorList[value.animate];
//     } else {
//       if(value.zoomAnimate && AnimatorList[value.zoomAnimate]){
//         GestureAnimation.zoom.animate = AnimatorList[value.zoomAnimate]
//       }
//       if(value.swipeAnimate && AnimatorList[value.swipeAnimate]){
//         GestureAnimation.swipe.animate = AnimatorList[value.swipeAnimate]
//       }
//     }
//
//     if(value.animateThreshold) {
//       GestureAnimation.swipe.animateThreshold = value.animateThreshold
//     }
//
//   }
// },