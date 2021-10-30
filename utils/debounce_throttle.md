## 防抖：重复触发的事件，在最后一次事件触发的 n 秒后执行

```
function debounce(func, wait, immediate) {
  var timeout, result;

  var debounced = function() {
    var context = this; // 修改 this 指向
    var args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait)
      if (callNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, wait);
    };
    return result;
  }

  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}
```

## 节流：如果持续触发事件，每隔一段时间，只执行一次事件
1. 使用时间戳
```
function throttle(func, wait) {
  var context, args;
  var previous = 0;

  return function() {
    var now = +new Date();
    context = this;
    args = arguments;
    if (now - previous > wait) {
      func.apply(context, args)
      previous = now;
    }
  }
}
```
2. 使用定时器
```
function throttle(func, wait) {
  var context, args;
  var timeout;
  var previous = 0;
  
  return function() {
    context = this;
    args = arguments;
    if (!timeout) {
      timeout = setTimeout(function() {
        timeout = null;
        func.apply(context, args)
      }, wait)
    }
  }
}
```

- 第一种会立刻执行，第二种会在 n 秒后第一次执行；  
- 第一种事件停止触发后没有办法再执行事件，第二种事件停止触发后依然会再一次执行事件。  

3. 优化  
添加 options 参数：leading: false 表示禁用第一次执行；trailing: false 表示禁用停止触发的回调  
```
function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function () {
    previous = options.leading === false ? 0 : new Date.getTime()；
    timeout = null;
    func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function() {
    var now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  }

  return throttled;
}
```
