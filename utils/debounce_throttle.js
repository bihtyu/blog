// 时间戳写法，第一次立即执行
function throttle_timestamp(fn, interval) {
  let last = 0
  return function () {
    let now = Date.now()
    if (now - last > interval) {
      last = now
      fn.apply(this, arguments)
    }
  }
}

const throttleHandle1 = throttle_timestamp(handle, 1000)
// for (let i = 0; i < 10000; i++) {
//   setTimeout(() => {
//     throttleHandle1()
//   }, 100)
// }

//
function throttle_timer(fn, interval) {
  let timer = null
  return function () {
    const context = this
    const args = arguments
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(context, args)
        timer = null
      }, interval)
    }
  }
}

function handle(str) {
  console.log('in handle')
  console.log(str)
}

const throttleHandle2 = throttle_timer(handle, 1000)

function throttle_better(fn, delay) {
  let timer = null
  let start = Date.now()
  return function() {
    const context = this
    const args = arguments

    let end = Date.now()
    let remain = delay - (end - start)
    
    if (remain <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      fn.apply(context, args)
      start = Date.now()
    } else {
      timer = setTimeout(function() {
        fn.apply(context, args)
        timer = null
        start = Date.now()
      }, delay)
    }
  }
}

const throttleHandle3 = throttle_better2(handle, 1000)
throttleHandle3(1)
throttleHandle3(2)
throttleHandle3(3)
throttleHandle3(4)
throttleHandle3(5)

// 防抖：重复触发的事件，在最后一次事件触发的 delay 后执行
function debounce(fn, wait) {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, wait)
  }
}

function debounce2(fn, wait, immediate) {
  var timeout;
  var result

  var _debounce = function() {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);

    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout
      timeout = setTimeout(function() {
        timeout = null;
      }, wait)
      if (callNow) {
        result = fn.apply(context, args);
      }
    } else {
      timeout = setTimeout(function() {
        fn.apply(context, args);
      }, wait)
    }

    return result
  }

  _debounce.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  }

  return _debounce;
}

function debounce3(func) {
  var t = null;
  return function() {
    clearAnimationFrame(t);
    t = requestAnimationFrame(func)
  }
}

// eg
var count = 1
var container = document.getElementById('container')

function getUserAction(e) {
  container.innerHTML = count++
}

var setUseAction = debounce(getUserAction, 10000, true)

container.onmousemove = setUseAction

document.getElementById('button').addEventListener('click', function () {
  setUseAction.cancel()
})
