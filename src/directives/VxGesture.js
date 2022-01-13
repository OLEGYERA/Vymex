/*eslint-disable*/

const _REAL_META_KEY = navigator.platform === 'MacIntel';
const LIST_ANIMATION = {
  rebound_h: [.3, .9, 1.6, 2, .6, .4, .6, .8, .9, .95, 1],
  rebound: [.25, .7, 1.2, 1.4, .8, .6, .8, 1],
  acceleration_h: [.2, .9, 1.2, 1.1, 1],
  acceleration: [.1, .95, .98, 1],
}

let BIND_EL, BIND_REF, BIND_NODE, BIND_MODIFIER; // PRIVATE BIND VARIABLES
let HARD_GESTURE_TIMER, DEATH_SYSTEM_TIMER, DEATH_ZOOM_ANIMATION_TIMER;

let PLATFORM_SIZE=0;
let EVENT_REPEAT_COUNTER=0, EVENT_GESTURE_EXPECTATION=false, EVENT_GESTURE_RECOGNIZING=true, EVENT_ANIMATION_RECOGNIZING=false, EVENT_ANIMATION=false;

let CURRENT_DELTA_POSITION, LAST_DELTA_POSITION=0, PICK_DELTA_POSITION=0, FALLOFF_CONTROL_DELTA_COUNT=0;

let IS_GESTURE_SWIPE, GESTURE_ZOOM={}, GESTURE_SWIPE={}; //IS_ZOOM_GESTURE!!


let BIND_ANIMATION = {
  zoom: {
    duration: 200,
    animate: false
  },
  swipe: {
    duration: 375,
    animate: false,
    animateThreshold: false
  }
}


function GestureAnimation({pattern, draw, duration, finish}) {
  let start = performance.now();
  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;     // timeFraction изменяется от 0 до 1
    if (timeFraction > 1) timeFraction = 1;

    const progress = __getBezierCurve(pattern, timeFraction);
    // console.log(progress)
    draw(progress); // отрисовать её

    if (timeFraction < 1) requestAnimationFrame(animate);
    if (timeFraction === 1) finish();
  });
}
function _getSwipeAnimationData(){
  const _shiftProgress = _getPlatformShiftProgress();
  if(!BIND_ANIMATION.swipe.animate){
    if(_shiftProgress > 70){
      console.log('Very fast',_shiftProgress)
      return {
        duration: BIND_ANIMATION.swipe.duration - 25,
        pattern: LIST_ANIMATION.rebound_h
      }
    } else if(_shiftProgress > 50){
      console.log('Fast',_shiftProgress)
      return {
        duration: BIND_ANIMATION.swipe.duration - 25,
        pattern: LIST_ANIMATION.rebound
      }
    } else if(_shiftProgress > 30){
      console.log('Base',_shiftProgress)
      return {
        duration: BIND_ANIMATION.swipe.duration,
        pattern: LIST_ANIMATION.acceleration_h
      }
    } else if(_shiftProgress > 15){
      console.log('Slow',_shiftProgress)
      return {
        duration: BIND_ANIMATION.swipe.duration + 25,
        pattern: LIST_ANIMATION.acceleration
      }
    } else{
      console.log('Cancel',_shiftProgress)

      return {
        duration: 200,
        pattern: [_shiftProgress*.1/100, _shiftProgress*.6/100, _shiftProgress*1.8/100, _shiftProgress*.6/100, 0]
      }
    }
  }
  else{
    if(BIND_ANIMATION.swipe.animateThreshold){
      if(_shiftProgress > 15){
        return {
          duration: BIND_ANIMATION.swipe.duration,
          pattern: BIND_ANIMATION.swipe.animate
        }
      } else{
        console.log('Cancel',_shiftProgress)
        return {
          duration: 200,
          pattern: [_shiftProgress*.1/100, _shiftProgress*.6/100, _shiftProgress*1.8/100, _shiftProgress*.6/100, 0]
        }
      }
    } else {
      console.log('HERE', {
        duration: BIND_ANIMATION.swipe.duration,
        pattern: BIND_ANIMATION.swipe.animate
      })
      return {
        duration: BIND_ANIMATION.swipe.duration,
        pattern: BIND_ANIMATION.swipe.animate
      }
    }

  }
}
function _getZoomAnimationData(){
  if(!BIND_ANIMATION.zoom.animate) {
    if (PICK_DELTA_POSITION < 15) {
      console.log('Base', PICK_DELTA_POSITION)
      return {
        duration: BIND_ANIMATION.swipe.duration + 100,
        pattern: LIST_ANIMATION.acceleration
      }
    } else if (PICK_DELTA_POSITION > 50) {
      console.log('Very Fast', PICK_DELTA_POSITION)
      return {
        duration: BIND_ANIMATION.swipe.duration,
        pattern: LIST_ANIMATION.acceleration_h
      }
    } else if (PICK_DELTA_POSITION > 15) {
      console.log('Fast', PICK_DELTA_POSITION)
      return {
        duration: BIND_ANIMATION.swipe.duration + 50,
        pattern: LIST_ANIMATION.acceleration_h
      }
    }
  }
  else {
    return {
      duration: BIND_ANIMATION.zoom.duration,
      pattern: BIND_ANIMATION.zoom.animate
    }
  }
}

function __getBezierBasis(i, n, t) {
  function factorial(n) {
    return (n <= 1) ? 1 : n * factorial(n - 1)
  }
  // считаем i-й элемент полинома Берштейна
  return (factorial(n)/(factorial(i)*factorial(n - i)))* Math.pow(t, i)*Math.pow(1 - t, n - i);
}
function __getBezierCurve(pattern, timeFraction) {
  let Curve = 0;

  if(pattern.length > 1)
    for (let patternItem = 0; patternItem < pattern.length; patternItem++) {
      Curve += pattern[patternItem] * __getBezierBasis(patternItem, pattern.length - 1, timeFraction);
    }
  else
    Curve = __getBezierBasis(pattern[0], 1, timeFraction);

  return Curve
}

function FinishHardGesture(){
  console.log('Отработать единичный скролл')
}
function FinishAfterAnimation(){
  EVENT_ANIMATION = false;
  EVENT_GESTURE_EXPECTATION = true;
  BIND_NODE.data.on.gestureEnd()
}
function EventDeath(){
  PLATFORM_SIZE = 0;
  EVENT_REPEAT_COUNTER = 0;
  LAST_DELTA_POSITION = 0;
  PICK_DELTA_POSITION = 0;
  EVENT_GESTURE_EXPECTATION = false;
  EVENT_GESTURE_RECOGNIZING = true;
  EVENT_ANIMATION_RECOGNIZING = false;
  GESTURE_ZOOM={}; GESTURE_SWIPE={};
}
function StartZoomGesture(){
  console.log('Тачбар зум')
  LAST_DELTA_POSITION = 0;
  EVENT_GESTURE_RECOGNIZING = false;
  EVENT_ANIMATION_RECOGNIZING = true;
  _gestureControlHandler()
}

function __checkHardGesture(){
  if(HARD_GESTURE_TIMER === undefined){
    HARD_GESTURE_TIMER = setTimeout(() => FinishHardGesture(), 50)
  } else {
    HARD_GESTURE_TIMER = clearTimeout(HARD_GESTURE_TIMER)
  }
}
function __watchSystemDeath(cancel = false){
  if(DEATH_SYSTEM_TIMER) DEATH_SYSTEM_TIMER = clearTimeout(DEATH_SYSTEM_TIMER)
  if(!cancel) DEATH_SYSTEM_TIMER = setTimeout(() => EventDeath(), 150)
}
function __waitAnimationDeath(){
  DEATH_SYSTEM_TIMER = setTimeout(() => FinishAfterAnimation(), 80)
}
function __watchZoomAnimationGesture(cancel = false){
  if(DEATH_ZOOM_ANIMATION_TIMER) DEATH_ZOOM_ANIMATION_TIMER = clearTimeout(DEATH_ZOOM_ANIMATION_TIMER);
  if(!cancel) DEATH_ZOOM_ANIMATION_TIMER = setTimeout(() => StartZoomGesture(), 80)
}

function _settingStates(e){
  if(BIND_MODIFIER === 'swipe'){
    IS_GESTURE_SWIPE = true;
  } else if(BIND_MODIFIER === 'zoom'){
    if(!e.ctrlKey) return false;
    IS_GESTURE_SWIPE = !e.ctrlKey;
  } else {
    IS_GESTURE_SWIPE = !e.ctrlKey;
  }

  const _meta = _REAL_META_KEY ? e.metaKey : e.altKey;

  const dX = e.deltaX, dY = e.deltaY;

  if(!IS_GESTURE_SWIPE){
    GESTURE_ZOOM.axisY = true;
    GESTURE_ZOOM.isPositiveDirection = dY > 0;
    GESTURE_ZOOM.isOuter = _meta;
  } else {
    GESTURE_SWIPE.isHolding= _meta;
    if(Math.abs(dY) > Math.abs(dX)){
      const _posDir = dY > 0;
      if(e.shiftKey){
        //watchOnAxis
        GESTURE_SWIPE.executiveAxisY = true;
        GESTURE_SWIPE.axisY = false;
        GESTURE_SWIPE.isPositiveDirection = _posDir;
      } else {
        GESTURE_SWIPE.executiveAxisY = true;
        GESTURE_SWIPE.axisY = true
        GESTURE_SWIPE.isPositiveDirection = _posDir;
      }
    } else{
      GESTURE_SWIPE.executiveAxisY = false;
      GESTURE_SWIPE.axisY = false
      GESTURE_SWIPE.isPositiveDirection = dX > 0;
    }

    PLATFORM_SIZE = GESTURE_SWIPE.axisY ? BIND_EL.offsetHeight : BIND_EL.offsetWidth;
  }



}
function _getDeltaPosition(_dX, _dY){
  if(IS_GESTURE_SWIPE){
    if(GESTURE_SWIPE.axisY || GESTURE_SWIPE.executiveAxisY){
      CURRENT_DELTA_POSITION = _dY;
    } else {
      CURRENT_DELTA_POSITION = _dX;
    }
  } else {
    CURRENT_DELTA_POSITION = _dY;
  }
}
function _getPlatformShiftProgress(){
  return PICK_DELTA_POSITION * 100 / PLATFORM_SIZE;
}


function _initialHandler(e){
  if(EVENT_REPEAT_COUNTER === 0){
    _settingStates(e);
    __checkHardGesture();
  } else {
    if(EVENT_REPEAT_COUNTER === 1) __checkHardGesture();
    if(!(EVENT_ANIMATION || EVENT_GESTURE_EXPECTATION)) __watchSystemDeath();

    if(!BIND_MODIFIER){
      if(EVENT_GESTURE_EXPECTATION && IS_GESTURE_SWIPE !== !e.ctrlKey){
        console.log('Разные жесты! Меняю жест')
        IS_GESTURE_SWIPE = !e.ctrlKey
      }
    }
  }

  _getDeltaPosition(e.deltaX, e.deltaY);
}
function _gestureControlHandler(e){
  // Ожидаем новую deltaPosition, для вызова нового жеста
  if(EVENT_GESTURE_EXPECTATION){
    let _mod_cur_delta_pos = Math.abs(CURRENT_DELTA_POSITION), _mod_last_delta_pos = Math.abs(LAST_DELTA_POSITION);
    if(_mod_cur_delta_pos > _mod_last_delta_pos){
      EventDeath();
      _initialHandler(e);
    }
    else return false;
  }

  // Слушаем новый жест
  if(EVENT_GESTURE_RECOGNIZING){
    let _mod_cur_delta_pos = Math.abs(CURRENT_DELTA_POSITION),
      _mod_last_delta_pos = Math.abs(LAST_DELTA_POSITION);
    if(_mod_cur_delta_pos > _mod_last_delta_pos){
      PICK_DELTA_POSITION = _mod_cur_delta_pos;
      FALLOFF_CONTROL_DELTA_COUNT = 0;
    } else if(_mod_cur_delta_pos === _mod_last_delta_pos && FALLOFF_CONTROL_DELTA_COUNT > 0){
      ++FALLOFF_CONTROL_DELTA_COUNT;
    } else {
      ++FALLOFF_CONTROL_DELTA_COUNT;
    }

    if(GESTURE_SWIPE.axisY !== undefined || GESTURE_ZOOM.axisY  !== undefined){
      if(IS_GESTURE_SWIPE && _getPlatformShiftProgress() > 60){
        EVENT_GESTURE_RECOGNIZING = false;
        EVENT_ANIMATION_RECOGNIZING = true;
      }
      if(FALLOFF_CONTROL_DELTA_COUNT > 3) {
        EVENT_GESTURE_RECOGNIZING = false;
        EVENT_ANIMATION_RECOGNIZING = true;
      }

      if(!IS_GESTURE_SWIPE) __watchZoomAnimationGesture();
    }
  }

  // Определяем тип анимации для жеста
  if(!EVENT_GESTURE_RECOGNIZING && EVENT_ANIMATION_RECOGNIZING){

    //call Start Emit
    if(IS_GESTURE_SWIPE) {
      BIND_NODE.data.on.gestureStart({type: 'swipe', axisY: GESTURE_SWIPE.axisY, posDir: GESTURE_SWIPE.isPositiveDirection})
    } else {
      __watchZoomAnimationGesture(true);
      BIND_NODE.data.on.gestureStart({type: 'zoom', axisY: GESTURE_ZOOM.axisY, posDir: GESTURE_ZOOM.isPositiveDirection, isOuter: GESTURE_ZOOM.isOuter})
    }

    //Получаем Данные об Анимации
    const {duration, pattern} = IS_GESTURE_SWIPE ? _getSwipeAnimationData() : _getZoomAnimationData();

    GestureAnimation({
      duration, pattern,
      draw(progress) {
        BIND_NODE.data.on.gestureProcess(progress * 100) //call Process Emit
      },
      finish(){
        __waitAnimationDeath() //call End Emit in __waitAnimationDeath
      }
    })

    EVENT_ANIMATION_RECOGNIZING = false;
    EVENT_ANIMATION = true;
    __watchSystemDeath(true);
  }
}
function _gonerHandler(){
  LAST_DELTA_POSITION = CURRENT_DELTA_POSITION;
  EVENT_REPEAT_COUNTER++;
}


function vxGestureHandler(e){
  e.preventDefault();

  _initialHandler(e);
  _gestureControlHandler(e);
  _gonerHandler()
}

function createVxGestureDirective(){
  return {
    bind: (e, r, n) => {
      BIND_EL = e; BIND_REF = r; BIND_NODE = n;
      const DIRECTIVE = BIND_NODE.data.directives[0],
            VALUE = BIND_REF.value;

      if(DIRECTIVE.modifiers){
        BIND_MODIFIER = DIRECTIVE.modifiers.zoom ? 'zoom' : (DIRECTIVE.modifiers.swipe ? 'swipe' : false);
      } else {
        BIND_MODIFIER = false
      }


      if(VALUE){
        if(typeof VALUE !== 'object') {
          console.error('Gesture value must be Object')
          return;
        }
        //учесть свойства чисто для Zoom или Swipe
        if(VALUE.duration){
          BIND_ANIMATION.zoom.duration = BIND_ANIMATION.swipe.duration = VALUE.duration;
        } else {
          if(VALUE.zoomDuration){
            BIND_ANIMATION.zoom.duration = VALUE.zoomDuration
          }
          if(VALUE.swipeDuration){
            BIND_ANIMATION.swipe.duration = VALUE.swipeDuration
          }
        }

        if(VALUE.animate && LIST_ANIMATION[VALUE.animate]){
          BIND_ANIMATION.zoom.animate = BIND_ANIMATION.swipe.animate = LIST_ANIMATION[VALUE.animate];
        } else {
          if(VALUE.zoomAnimate && LIST_ANIMATION[VALUE.zoomAnimate]){
            BIND_ANIMATION.zoom.animate = LIST_ANIMATION[VALUE.zoomAnimate]
          }
          if(VALUE.swipeAnimate && LIST_ANIMATION[VALUE.swipeAnimate]){
            BIND_ANIMATION.swipe.animate = LIST_ANIMATION[VALUE.swipeAnimate]
          }
        }

        if(VALUE.animateThreshold) {
          BIND_ANIMATION.swipe.animateThreshold = VALUE.animateThreshold
        }

      }

      console.log(BIND_ANIMATION)

      if(BIND_NODE.data.on.gestureStart && BIND_NODE.data.on.gestureProcess && BIND_NODE.data.on.gestureEnd){
        e.addEventListener('wheel', vxGestureHandler, false);
      } else {
        console.error('Gestures can\'t work without listeners:  gestureStart, gestureProcess, gestureEnd!')
      }

    },
  }
}

const vxGestureDirective = createVxGestureDirective();

export {vxGestureDirective as VxGesture}