// function getBezierBasis(i, n, t) {
//   // Факториал
//   function f(n) {
//     return (n <= 1) ? 1 : n * f(n - 1);
//   }
//
//   // считаем i-й элемент полинома Берштейна
//   return (f(n)/(f(i)*f(n - i)))* Math.pow(t, i)*Math.pow(1 - t, n - i);
// }
//
// // let bounceEaseOut = makeEaseInOut(bounce);
// let bounceEaseOut = function (timeFraction){
//   let l = getBezierBasis(1, 2, timeFraction)
//   console.log(l);
//   return l
// }


////////



function makeEaseOut(timing) {
  return function(timeFraction) {
    // return timing(timeFraction);
    return timing(Math.pow(2, timeFraction) - 1);
    // return 1 - timing(1 - timeFraction);
    // return
  }
}

function makeEaseInOut(timing) {
  return function(timeFraction) {
    if (timeFraction < .5){
      return timing(2 * timeFraction) / 2;
    }
    else
      return (2 - timing(2 * (1 - timeFraction))) / 2;
  }
}

function bounce(timeFraction) {
  for (let a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
    }
  }

}

// i - номер вершины, n - количество вершин, t - положение кривой (от 0 до 1)
function getBezierBasis(i, n, t) {
  // Факториал
  function f(n) {
    return (n <= 1) ? 1 : n * f(n - 1);
  }

  // считаем i-й элемент полинома Берштейна
  return (f(n)/(f(i)*f(n - i)))* Math.pow(t, i)*Math.pow(1 - t, n - i);
}

// let bounceEaseOut = makeEaseInOut(bounce);
let bounceEaseOut = function (timeFraction){
  console.log(timeFraction)
  // if(timeFraction < 0.4){
  //   console.log('1', (timeFraction / 0.4) + (timeFraction / 0.4)*.4)
  //   return (timeFraction / 0.4) + (timeFraction / 0.4)*.4;
  // } else if(timeFraction >= 0.4 && timeFraction < 0.6){
  //   let tF = 0.4 - timeFraction;
  //   console.log('2', 1.4+(tF/0.24))
  //   return 1.4+(tF/0.24);
  // } else {
  //   console.log('3', timeFraction)
  //   return timeFraction;
  // }

  let fP = getBezierBasis(0.795, 1.650, timeFraction),
    sP = getBezierBasis(0.685, 0.565, timeFraction);

  console.log(fP*timeFraction, sP*timeFraction, fP + sP)
  // return getBezierBasis(0.795, 1.650, timeFraction)
  return fP + sP



  if(timeFraction < .4){
    return getBezierBasis(1.14, 1, timeFraction/.4)
  } else if(timeFraction <= .8){
    let l = getBezierBasis(1.14, 1, .9777)
    let tF = 0.4 - timeFraction;
    return l - (-tF/.6);
  }else {
    return timeFraction;
  }

  // let k = getBezierBasis(2, 2, timeFraction)
  // // console.log(l);
  // return l + k
}

let anim = makeEaseOut(bounceEaseOut)