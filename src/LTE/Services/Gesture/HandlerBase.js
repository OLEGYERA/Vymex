const _REAL_META_KEY = navigator.platform === 'MacIntel';

class HandlerBase{
  EVENT_REPEAT_COUNTER; BIND_MODIFIER; 
  HARD_GESTURE_TIMER; DEATH_SYSTEM_TIMER; DEATH_ZOOM_ANIMATION_TIMER;
  IS_GESTURE_SWIPE; GESTURE_ZOOM={}; GESTURE_SWIPE={};

  animation;
  bind(data){
    this.animation = data.values;
    this.animation = data.values;
  }

  initialHandler(e){
    if(this.EVENT_REPEAT_COUNTER === 0){
      this.settingStates(e);
      __checkHardGesture();
    } else {
      if(this.EVENT_REPEAT_COUNTER === 1) __checkHardGesture();
      if(!(EVENT_ANIMATION || EVENT_GESTURE_EXPECTATION)) __watchSystemDeath();

      if(!this.BIND_MODIFIER){
        if(EVENT_GESTURE_EXPECTATION && IS_GESTURE_SWIPE !== !e.ctrlKey){
          console.log('Разные жесты! Меняю жест')
          this.IS_GESTURE_SWIPE = !e.ctrlKey
        }
      }
    }

    _getDeltaPosition(e.deltaX, e.deltaY);
  }

  settingStates(e){
    if(this.BIND_MODIFIER === 'swipe'){
      this.IS_GESTURE_SWIPE = true;
    } else if(this.BIND_MODIFIER === 'zoom'){
      if(!e.ctrlKey) return false;
      this.IS_GESTURE_SWIPE = !e.ctrlKey;
    } else {
      this.IS_GESTURE_SWIPE = !e.ctrlKey;
    }

    const _meta = _REAL_META_KEY ? e.metaKey : e.altKey;

    const dX = e.deltaX, dY = e.deltaY;

    if(!this.IS_GESTURE_SWIPE){
      this.GESTURE_ZOOM.axisY = true;
      this.GESTURE_ZOOM.isPositiveDirection = dY > 0;
      this.GESTURE_ZOOM.isOuter = _meta;
    } else {
      this.GESTURE_SWIPE.isHolding= _meta;
      if(Math.abs(dY) > Math.abs(dX)){
        const _posDir = dY > 0;
        if(e.shiftKey){
          //watchOnAxis
          this.GESTURE_SWIPE.executiveAxisY = true;
          this.GESTURE_SWIPE.axisY = false;
          this.GESTURE_SWIPE.isPositiveDirection = _posDir;
        } else {
          this.GESTURE_SWIPE.executiveAxisY = true;
          this.GESTURE_SWIPE.axisY = true
          this.GESTURE_SWIPE.isPositiveDirection = _posDir;
        }
      } else{
        this.GESTURE_SWIPE.executiveAxisY = false;
        this.GESTURE_SWIPE.axisY = false
        this.GESTURE_SWIPE.isPositiveDirection = dX > 0;
      }

      this.PLATFORM_SIZE = this.GESTURE_SWIPE.axisY ? BIND_EL.offsetHeight : BIND_EL.offsetWidth;
    }



  }


}

export default HandlerBase;