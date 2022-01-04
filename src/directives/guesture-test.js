import Vue from 'vue';
/*eslint-disable*/

const CombinationType = {
  '0000': 'scroll',
  '1000': 'middle',
  '0010': 'inner',
  '0100': 'changeAxios',
  '1010': 'outer',
}

let eventCallCounter = 0, cancelableTimer = null;
let bindEl, vNode, wheelStartType = {type: null, category: null, depth: null};
let metaKeyListenerInit = false;
let primaryEventData = null;
let peakAccelerationPoint = null
let peakData = null;
let fixPeak = false;
let previousDegreePeak = null
let reflowDown = 0, reflowVerify = 0;
let zeroStage = 0, firstStage = 0;

// console.log(e.getModifierState('Control'))
// if(combination === 'inner' || combination ===  'middle' || 'outer' === combination){
//   wheelStartType.type = 'zoom'
//   wheelStartType.category = combination
//   wheelStartType.depth = e.wheelDeltaY > 0;
//   wheelStartType.time = e.timeStamp;
//   wheelStartType.delta = e.wheelDelta;
//   wheelStartType.deltaX = e.deltaX;
//   wheelStartType.deltaY = e.deltaY;
// }

// if((combination === 'inner' || combination ===  'middle' || 'outer' === combination) && eventCallCounter === 3){
//   wheelStartType.speed = wheelStartType.delta === e.wheelDelta ? 'touchpad' : 'mouse'
// }

let compareSlow = 0, typeSlow = null;

function handleWheelEvent(e){
  e.preventDefault();
  e.stopImmediatePropagation();
  const combination = getEventByKeyboardShortcut(e);
  if(eventCallCounter === 0){
    primaryEventData = e;
  } else {


    let primary = Math.abs(primaryEventData.wheelDeltaY),
        current = Math.abs(e.wheelDeltaY);



    if(typeSlow === null){
      console.log(current)
      if(primary === 0){
        if(eventCallCounter < 4){
          console.log('----- Zero detecting')
          if(30 < current){
            typeSlow = false
          }
        } else {
          typeSlow = true
        }
      }
      else if(primary < 10){
        console.log('----Float detecting', primary)
        if(eventCallCounter < 4){
          if((primary * 3) < current){
            typeSlow = false
          }
        } else {
          typeSlow = true
        }
      } else {
        console.log('----direct detecting')
        if(eventCallCounter < 4){
          if(Math.abs(primaryEventData.wheelDeltaY) !== Math.abs(e.wheelDeltaY)){
            if(++compareSlow > 2) typeSlow = false
          }
        } else {
          typeSlow = true
        }
      }
    } else {
      console.log(typeSlow ? 'Slow' : 'Accelerate')
    }
  }


  // let absolutePoint = Math.abs(e.wheelDeltaY)
  // //2 стадии: равномерный и разгон
  //
  // console.log(e)
  //
  // if(Math.abs((primaryEventData.wheelDeltaY)) === absolutePoint){
  //   console.log('Slow', absolutePoint)
  // } else {
  //   console.log('Fast', absolutePoint)
  // }

  // if((absolutePoint > peakAccelerationPoint || absolutePoint === peakAccelerationPoint) && !fixPeak){
  //
  //   peakAccelerationPoint = absolutePoint;
  //   peakData = e;
  //   reflowVerify = 0
  //
  // // } else if(absolutePoint === peakAccelerationPoint){
  // //   console.log('Equal', absolutePoint);
  // } else if(absolutePoint < peakAccelerationPoint) {
  //
  //   if (reflowVerify > 3) {
  //     if(!fixPeak){
  //       fixPeak = true;
  //       e.stopImmediatePropagation()
  //       zeroStage = peakAccelerationPoint
  //     }
  //   } else {
  //     ++reflowVerify
  //   }
  //
  //
  //   if (fixPeak){
  //     let currentPerCent = (zeroStage - absolutePoint) * 100 / zeroStage
  //
  //     // console.log(zeroStage, absolutePoint, currentPerCent)
  //
  //     if (previousDegreePeak !== null && previousDegreePeak < absolutePoint) {
  //       if (++reflowDown > 2) {
  //         console.log('----- Ускоренное окончание-----')
  //
  //         regenerateEventListener(e)
  //
  //       }
  //     } else {
  //       console.log(currentPerCent + '%')
  //       reflowDown = 0
  //       previousDegreePeak = absolutePoint;
  //     }
  //   }
  //
  // }


  function regenerateEventListener(e){
    finishWheelEvent(e)
  }



  // console.log(e.wheelDelta)


  // if(eventCallCounter === 3){
  //   console.log(primaryEventData.wheelDelta, e.wheelDelta, (primaryEventData.wheelDelta === e.wheelDelta ? 'touchpad' : 'mouse'));
  //   console.log('timeStamp', e.timeStamp - primaryEventData.timeStamp)
  // }




  wheelStartType.time = e.timeStamp

  eventCallCounter++;


  vNode.data.on.someEvent(e, wheelStartType)
  // const event = new CustomEvent('someEvent', {data: {custom: "data",can: "be",in: "detail property"}, bubbles: true});

  // bindEl.dispatchEvent(event);
  if(cancelableTimer) clearTimeout(cancelableTimer)
  cancelableTimer = setTimeout(() => finishWheelEvent(e),typeSlow ? 20 : 100);
}

function finishWheelEvent(e){
  compareSlow = 0; typeSlow = null
  firstStage = e.timeStamp - primaryEventData.timeStamp + 150;
  // console.log('Stages', zeroStage, firstStage)
  // console.log((zeroStage * 100) / 8)

  console.log('Per Cent Stage 2', (firstStage * 100) / (zeroStage + firstStage))
  console.log('__')
  console.log('__')
  console.log('__')
  cancelableTimer = clearTimeout(cancelableTimer);
  peakAccelerationPoint = null;
  fixPeak = false
  zeroStage = 0; firstStage = 0; reflowDown = 0;
  previousDegreePeak = null;
  console.log('Finish', 'Counter: ' + eventCallCounter)
  eventCallCounter = 0
}

function getEventByKeyboardShortcut(e){
  const combinationCode = '' + Number(e.metaKey) + Number(e.shiftKey) + Number(e.ctrlKey) + Number(e.altKey);
  return CombinationType[combinationCode]
}

//
// setTimeout(() => {
//   console.log('vnode.context.$emit', vnode)
//   el.dispatchEvent(new Event('someEvent'));
//
// }, 1000);

function zoom(e) {
  console.log(e)
  e.preventDefault()
}

console.log(navigator)

Vue.directive('gesture', {
  bind: (el, binding, vnode) => {
    bindEl = el, vNode = vnode;
    // console.log('created', el, binding, vnode)
    el.addEventListener('wheel', handleWheelEvent, false)
    // console.log(234)
    // el.addEventListener('gesturestart', zoom)
    // el.addEventListener('gesturechange', zoom)
    // el.addEventListener('gestureend', zoom)


    //
    // let f = function (evt) {
    //   if (binding.value(evt, el)) {
    //     window.removeEventListener('scroll', f)
    //   }
    // }
    // window.addEventListener('scroll', f)
  },
  unbind(el, binding) {
    el.removeEventListener('scroll', handleWheelEvent)
  }
})