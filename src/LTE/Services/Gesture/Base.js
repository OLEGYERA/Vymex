import GestureHandler from "@Services/Gesture/Handler";
import {AnimatorList} from "@Services/Animator";

const _directives = new WeakMap;
const _hooks = new WeakMap;
const _values = new WeakMap;


class GestureBase{
  constructor() {
    this.handler = new GestureHandler();
  }

  bindDirectives(element, refs, node){
    const directive = node.data.directives[0], modifier = directive.modifiers.zoom ? 'zoom' : (directive.modifiers.swipe ? 'swipe' : false);
    _directives.set(this, {element, refs, node, directive, modifier, value: refs.value })
  }
  bindHooks(){
    const hookListeners = this.getDirectives().node.data.on;

    if(!hookListeners.length){
      const {gestureStart, gestureProcess, gestureEnd} = hookListeners;

      if(!(gestureStart && gestureProcess && gestureEnd)) {
        console.error('Gestures can\'t work without hooks:  gestureStart, gestureProcess, gestureEnd!');
        return false;
      }
      _hooks.set(this, {gestureStart, gestureProcess, gestureEnd});

      return true;
    }

    console.error('Install Hooks');
    return false;
  }
  bindValues(){
    let ValueList = {zoom: {}, swipe: {}};
    const {value} = this.getDirectives();

    if(typeof value !== 'object') {
      console.error('Gesture Value must be Object')
      return false;
    }

    //   //учесть свойства чисто для Zoom или Swipe
    if(value.duration){
      ValueList.zoom.duration = ValueList.swipe.duration = value.duration;
    } else {
      if(value.zoomDuration){
        ValueList.zoom.duration = value.zoomDuration
      }
      if(value.swipeDuration){
        ValueList.swipe.duration = value.swipeDuration
      }
    }

    if(value.animate && AnimatorList[value.animate]){
      ValueList.zoom.animate = ValueList.swipe.animate = AnimatorList[value.animate];
    } else {
      if(value.zoomAnimate && AnimatorList[value.zoomAnimate]){
        ValueList.zoom.animate = AnimatorList[value.zoomAnimate]
      }
      if(value.swipeAnimate && AnimatorList[value.swipeAnimate]){
        ValueList.swipe.animate = AnimatorList[value.swipeAnimate]
      }
    }

    if(value.animateThreshold) {
      ValueList.swipe.animateThreshold = value.animateThreshold
    }


    _values.set(this, ValueList);

    return true;
  }
  bindHandler(){
    this.handler.bind({values:this.getValues()});
  }


  getDirectives(){
    return _directives.get(this)
  }
  getHooks(){
    return _hooks.get(this)
  }
  getValues(){
    return _values.get(this)
  }



}

export default GestureBase;