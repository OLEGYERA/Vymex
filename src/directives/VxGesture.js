/*eslint-disable*/
const _REAL_META_KEY = navigator.platform === 'MacIntel';
let BIND_EL, BIND_REF, BIND_NODE; // PRIVATE BIND VARIABLES
let EVENT_REPEAT_COUNTER = 0, STREAM_TIMER=null;
let EVENT_DELTA=0;
let AXIS_Y=null, AXIS_DELTA=0, AXIS_DELTA_PICK=0, GESTURE_RUN=false;
let EMIT_DELTA=0;
let PLATFORM_SIZE=0, TURN_CLOSER=false;
let DISTANCE_MOVED=0


let newPeakPossibleCounter=0

function clearData(){
  EMIT_DELTA=0;
  TURN_CLOSER=false;
  DISTANCE_MOVED=0;
  BIND_NODE.data.on.someEvent({axisY: AXIS_Y, delta: 0});
  PLATFORM_SIZE=0
  EVENT_REPEAT_COUNTER=0;
  STREAM_TIMER=null;
  EVENT_DELTA=0;
  AXIS_Y=null;
  AXIS_DELTA=0;
  AXIS_DELTA_PICK=0;
  GESTURE_RUN=false;
  newPeakPossibleCounter=0;
  console.log('DATA WAS CLEAN')
}
function closeStream(timeout = 150){
  if(STREAM_TIMER) STREAM_TIMER = clearTimeout(STREAM_TIMER)
  if(TURN_CLOSER) BIND_NODE.data.on.someEvent({axisY: AXIS_Y, delta: PLATFORM_SIZE});

  STREAM_TIMER = setTimeout(() => clearData(), timeout);
}

function getNewDelta(dY, dX){
  return (AXIS_Y ? dY : dX) * 0.8;
}


function vxGestureHandler(e){
  e.preventDefault();
  const dY=e.deltaY, dX=e.deltaX;
  const mdY=Math.abs(dY), mdX=Math.abs(dX);

  if(EVENT_REPEAT_COUNTER === 0){
    if(mdY > mdX){
      AXIS_Y = true;
      console.log('axis Y')
    } else {
      AXIS_Y = false;
      console.log('axis X')
    }
    AXIS_DELTA = getNewDelta(e.deltaY, e.deltaX)
    closeStream(50)
  }
  else {
    if(/*EVENT_REPEAT_COUNTER===1 && */STREAM_TIMER) STREAM_TIMER = clearTimeout(STREAM_TIMER);
    const _newDelta = Math.abs(getNewDelta(e.deltaY, e.deltaX));
    if(!GESTURE_RUN ){
      let timlyPlatformSize = AXIS_Y ? BIND_EL.offsetHeight : BIND_EL.offsetWidth
      if(_newDelta < timlyPlatformSize*.05){
        closeStream(50)
      } else {
        PLATFORM_SIZE = AXIS_Y ? BIND_EL.offsetHeight : BIND_EL.offsetWidth;
        GESTURE_RUN = true;
        if(STREAM_TIMER) STREAM_TIMER = clearTimeout(STREAM_TIMER);
      }
    }
    else {
      if(!TURN_CLOSER) EMIT_DELTA=_newDelta* 100 / PLATFORM_SIZE;
      if(_newDelta > AXIS_DELTA){
        // console.log('Рост', _newDelta);
        if(AXIS_DELTA_PICK !== 0){
          newPeakPossibleCounter++;
          if(newPeakPossibleCounter > 2) {
            //заканчиваем предидущую анимацию || если анимация не дошла до процента доводчика, ускореям данную анимацию
            console.log('Clear AXIS_DELTA_PICK')
            AXIS_DELTA_PICK = 0
          }
        }
      } else {
        newPeakPossibleCounter = 0;

        if(AXIS_DELTA_PICK === 0){
          AXIS_DELTA_PICK = AXIS_DELTA;
          DISTANCE_MOVED = AXIS_DELTA * 100 / PLATFORM_SIZE;
          if(DISTANCE_MOVED > 20){
            TURN_CLOSER=true;
          }
          console.log('Точка вверха: ' + AXIS_DELTA, 'Пройденно: ' + DISTANCE_MOVED, 'size блока: ' + PLATFORM_SIZE)
        } else if(AXIS_DELTA_PICK !== 0 && _newDelta === AXIS_DELTA){
          // console.log('Схождение', AXIS_DELTA_PICK)
          // return false;
        } else {
          if(TURN_CLOSER){
            let newDistMoved = AXIS_DELTA * 100 / PLATFORM_SIZE;
            let diffPlatform = PLATFORM_SIZE - AXIS_DELTA_PICK;

            let deltaDistMoved = Math.abs(DISTANCE_MOVED-newDistMoved)*100/DISTANCE_MOVED;
            EMIT_DELTA = (AXIS_DELTA_PICK + diffPlatform * deltaDistMoved/100)*100/PLATFORM_SIZE;
            // EMIT_DELTA = deltaDistMoved
            console.log(EMIT_DELTA)
            // console.log('Отрабатываем доводчик: ' + deltaDistMoved + '%; In PX' + (AXIS_DELTA_PICK + diffPlatform * deltaDistMoved/100));
          }
          // console.log('ПАДАЕМ',  _newDelta)
        }
      }
    }


    AXIS_DELTA = _newDelta;
    closeStream(80)
  }


  BIND_NODE.data.on.someEvent({axisY: AXIS_Y, delta: EMIT_DELTA});



  EVENT_REPEAT_COUNTER++;
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



// let EL_WIDTH = BIND_EL.offsetWidth, EL_HEIGHT = BIND_EL.offsetHeight;


// function DATA_CLEANSING(){
//   EVENT_REPEAT_COUNTER=0;
//   STREAM_TIMER=null;
//   EVENT_DELTA=0;
//   console.log('DATA WAS CLEAN')
// }
// function CATCH_END_STREAM_GESTURE(timeout = 150){
//   if(STREAM_TIMER) STREAM_TIMER = clearTimeout(STREAM_TIMER)
//   STREAM_TIMER = setTimeout(() => DATA_CLEANSING(), timeout);
// }
// function getInfo(e){
//   const axisY = Math.abs(e.deltaY) > Math.abs(e.deltaX),
//     posDir = axisY ? e.deltaY > 0 : e.deltaX > 0,
//     delta = axisY ? e.deltaY : e.deltaX,
//     deltaModular = Math.abs(delta);
//
//   EVENT_DELTA += deltaModular;
//
//
//   // return {axisY, posDir, delta: EVENT_DELTA > 100 ? deltaModular : EVENT_DELTA}
// }
// function prepareGestureData(e){
//   EVENT_STATE_KEYS = getEventStateKeys(e);
//   EVENT_GESTURE_PROPS = getEventGestureProps(e);
// }
// function checkGestureData(e){
//   if(JSON.stringify(getEventStateKeys(e)) !== JSON.stringify(EVENT_STATE_KEYS)){
//     console.log('Prevent Func by change keys')
//     return false
//   }
//
//   if(JSON.stringify(getEventGestureProps(e)) !== JSON.stringify(EVENT_GESTURE_PROPS)){
//     console.log(JSON.stringify(getEventGestureProps(e)))
//     console.log(JSON.stringify(EVENT_GESTURE_PROPS))
//
//     console.log('Prevent Func by change direction')
//   }
// }
//
// function getEventStateKeys(e){
//   let keysArr = [];
//
//   if(e.ctrlKey) keysArr.push('ctrl');
//   else if(e.shiftKey) keysArr.push('shift');
//   if(_REAL_META_KEY ? e.metaKey : e.altKey) keysArr.push('meta');
//
//   return keysArr;
// }
// function getEventGestureProps(e){
//   const dY = e.deltaY, dX = e.deltaX;
//   let axisY = true;
//
//   if(EVENT_STATE_KEYS.indexOf('ctrl') === -1){
//     if(EVENT_STATE_KEYS.indexOf('shift') !== -1){
//       axisY = false
//     } else {
//       axisY = Math.abs(dY) > Math.abs(dX)
//     }
//   }
//
//   const dirPositive = axisY ? dY > 0 : dX > 0;
//
//   return {axisY, dirPositive}
//
// }