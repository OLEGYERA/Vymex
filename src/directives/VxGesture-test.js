/*eslint-disable*/
const _REAL_META_KEY = navigator.platform === 'MacIntel';
let BIND_EL, BIND_REF, BIND_NODE; // PRIVATE BIND VARIABLES
let EVENT_STAGE=0, STREAM_TIMER, REPEAT_EVENT_COUNTER=0;
let GESTURE_PROPERTIES=null;
let SWIPE_MULTIPLIER=2;
let DETECTED_SWIPE_SPEED=false
let PLATFORM_BEYOND_BOUNDARY=0.3;
let DELTA_SHIFT=0;
let RECREATE_EVENT=false;


let LastDeltaFinish = false;







function DATA_CLEANSING(){
  EVENT_STAGE=0;
  REPEAT_EVENT_COUNTER=0;
  GESTURE_PROPERTIES=null;
  DELTA_SHIFT=0
  DETECTED_SWIPE_SPEED=0;
  EMULATION_PERCENT=0;
  LastDeltaFinish = true;
}


function CATCH_END_STREAM_GESTURE(timeout = 150){
  // if(STREAM_TIMER) STREAM_TIMER = clearTimeout(STREAM_TIMER)
  STREAM_TIMER = setTimeout(() => _gestureEnd(), timeout);
}


function GET_GESTURE_TYPE(_ctrl, _meta, _shift){
  let gestureType = {};

  if(_ctrl){
    //all zoom gestures
    gestureType.name = 'zoom';
    gestureType.function = _meta ? 'outer' : 'inner';
  } else {
    //all swipe gestures
    gestureType.name = 'swipe';
    gestureType.priorityAxisX = _shift;
    gestureType.holdAnimation = _meta;
  }

  return gestureType;
}

function GET_GESTURE_POSITION(dX, dY, type){
  let gesturePosition = {}
  if(type.name === 'zoom'){
    gesturePosition.axis = {
      getPlatformSize: BIND_EL.offsetHeight,
      getDelta: 'deltaY'
    }
    gesturePosition.directionAboveZero = dY > 0;
  } else {
    const isAxisX = type.priorityAxisX || Math.abs(dX) > Math.abs(dY);
    gesturePosition.axis = {
      getPlatformSize: BIND_EL[isAxisX ? 'offsetWidth' : 'offsetHeight'],
      getDelta: isAxisX ? 'deltaX' : 'deltaY'
    }
    gesturePosition.directionAboveZero = isAxisX ? dX > 0 : dY > 0;
  }

  return gesturePosition;
}

function _gestureStart(e){
  // console.log(e.deltaY)
  if(LastDeltaFinish === true){
    DATA_CLEANSING();
  }
  if(REPEAT_EVENT_COUNTER === 1){
    // console.log(e)
    const _gestureType = GET_GESTURE_TYPE(e.ctrlKey, _REAL_META_KEY ? e.metaKey : e.altKey, e.shiftKey);
    const _gesturePosition = GET_GESTURE_POSITION(e.deltaX, e.deltaY, _gestureType);
    GESTURE_PROPERTIES = {..._gestureType, ..._gesturePosition}
    // console.log(GESTURE_PROPERTIES)
  } else {
    CATCH_END_STREAM_GESTURE()
    EVENT_STAGE = GESTURE_PROPERTIES.name === 'swipe' ? 1 : 3
  }
} //// start

function STEP_ANALYSIS_SWIPE(){
  const _shiftPercent = DELTA_SHIFT_PERCENT()
  if(REPEAT_EVENT_COUNTER < 5 && _shiftPercent > 60){
    DETECTED_SWIPE_SPEED=4
  } else if(REPEAT_EVENT_COUNTER < 5 && _shiftPercent > 30){
    DETECTED_SWIPE_SPEED=3
  } else if(REPEAT_EVENT_COUNTER < 5 && _shiftPercent > 20){
    DETECTED_SWIPE_SPEED=2
  } else if(REPEAT_EVENT_COUNTER > 3 && _shiftPercent > 10){
    DETECTED_SWIPE_SPEED=1
  } else if(REPEAT_EVENT_COUNTER > 4){
    EVENT_STAGE=2 //change event
  }
}

function DELTA_SHIFT_PERCENT(){
  return Math.abs(DELTA_SHIFT) * 100 / GESTURE_PROPERTIES.axis.getPlatformSize;
}

let EMULATION_PERCENT = 0, EMULATION_PERCENTAGE_INTERVAL;

let STEP=1

function EMULATION_PERCENTAGE_CHANGE(){
  // console.log('EMULATION_PERCENTAGE_CHANGE')
  if(EMULATION_PERCENT >= 100){
    EMULATION_PERCENTAGE_INTERVAL = clearInterval(EMULATION_PERCENTAGE_INTERVAL)
    LastDeltaFinish = true
    // if(RECREATE_EVENT) CATCH_END_STREAM_GESTURE(0)
    // else {
    //   EVENT_STAGE = -1;
    //   CATCH_END_STREAM_GESTURE(50)
    // }


    return false
    // нужно разделить ивенты
  }
  EMULATION_PERCENT += STEP;
  BIND_NODE.data.on.someEvent(EMULATION_PERCENT)
  // console.log(EMULATION_PERCENT + '%')
}

let animation = 400

function _swipeEmulation(){
  EVENT_STAGE = 5 //костыль

  console.log(DETECTED_SWIPE_SPEED, 'Type Animation')
  switch (DETECTED_SWIPE_SPEED){
    case 4:
      RECREATE_EVENT=true;
      animation=400
      STEP=4
      break
    case 3:
      RECREATE_EVENT=false;
      animation=300
      STEP=3
      break;
    case 2:
      RECREATE_EVENT=false;
      animation=300
      STEP=2
      break;
    case 1:
      RECREATE_EVENT=false;
      animation=200
      STEP=1
      break;
  }

  // if(DETECTED_SWIPE_SPEED > 3){
  //   console.log('FAST')
  //   RECREATE_EVENT=true;
  //   animation=200
  //   STEP=2
  // } else {
  //   console.log('NORMAL')
  //   RECREATE_EVENT=false
  //   animation=400
  //   STEP=1
  // }

  STREAM_TIMER = clearTimeout(STREAM_TIMER);
  EMULATION_PERCENTAGE_INTERVAL = setInterval(EMULATION_PERCENTAGE_CHANGE, animation/100*STEP)
  // while (emulationPercent <= 100){
  //   console.log(emulationPercent + '%')
  //   ++emulationPercent;
  // }
}

function _gestureSwipeStream(e){
  DELTA_SHIFT += e[GESTURE_PROPERTIES.axis.getDelta] * SWIPE_MULTIPLIER;

  if(!DETECTED_SWIPE_SPEED) STEP_ANALYSIS_SWIPE()

  if(DETECTED_SWIPE_SPEED) _swipeEmulation()


  //нужно добавить граничный допуск к выходу за ширину блока ~130% + скорость реверса до 100% (в мс анимация)
  //добавить коэфициент прибавление/убавление процентов для ускорения/замедления шага [по дефолту 15%]
  // проверку делать на основе прохождения 2-5 шагов
  // [Не в этой версии] если за 5 шагов система прошла 5% - нужно ускорить систему, чтобы следующие 3 шага были [15% - коэф шага]
  // [Не в этой версии] если за 2 шага система прошла 20% - нужно замедлить систему, чтобы следующие 4 шага были 15%

  //добавить пограничный допуск для завершения анимации (скорость доводчика и реверса)

  //опции времени - 1 для всех в мс
  // - 2 по отдельности
  // closerTime [40ms]
  // beyondReversTime [200ms]
  // inReversTime [40ms]
  // simpleAnimationTime[200ms]

}

function _gestureSwipeInterceptStream(e){
  DELTA_SHIFT += e[GESTURE_PROPERTIES.axis.getDelta] * SWIPE_MULTIPLIER;

  if(GESTURE_PROPERTIES.holdAnimation){
    console.log('Тут добавляем слушатель metaKey')
  }

  console.log(DELTA_SHIFT)
}

function _gestureZoomStream(e){
  // console.log(e)
}

function _gestureEnd(){
  if(REPEAT_EVENT_COUNTER === 1){
    console.log('Тут автоматически дорабатываем анимацию')
    DATA_CLEANSING()
  }/* else {
    DATA_CLEANSING()
  }*/
  console.log('--')
  console.log('----------- END ------------')
  console.log('--')

}


function vxGestureHandler(event){
  event.preventDefault();

  if(EVENT_STAGE === -1){
    // console.log('Продолжение после анимации')
    CATCH_END_STREAM_GESTURE(50)
    return false;
  }

  ++REPEAT_EVENT_COUNTER;
  if(EVENT_STAGE === 0) _gestureStart(event);
  if(EVENT_STAGE === 1) _gestureSwipeStream(event);
  if(EVENT_STAGE === 2) _gestureSwipeInterceptStream(event);
  if(EVENT_STAGE === 3) _gestureZoomStream(event);
  if(EVENT_STAGE === 5) return false;

  // console.log(EVENT_STAGE, 1212)

}

function createVxGestureDirective(){
  return {
    bind: (e, r, n) => {
      BIND_EL = e; BIND_REF = r; BIND_NODE = n;
      e.addEventListener('wheel', vxGestureHandler, false);
    },
  }
}

const vxGestureDirective = createVxGestureDirective();

export {vxGestureDirective as VxGesture}

