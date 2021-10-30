/**
 * cancel all timer from window.setTimeout
 */
// function clearAllTimeout() {
//   let lastTimerId = setTimeout(()=>{}, 0);
//   while (lastTimerId--) {
//     clearTimeout(lastTimerId);
//   }
// }

var originSetTimeout = window.setTimeout
var timers = []

window.setTimeout = function(fn, timer) {
  const currentId = originSetTimeout(fn, timer)
  timers.push(currentId)
  return currentId
}

function clearAllTimeout() {
  timers.forEach(item => {
    clearTimeout(item)
  })

  timers = []
}