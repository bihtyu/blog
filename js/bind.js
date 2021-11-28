/**
 * bind() 方法会创建一个新函数，当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，
 * 之后的一序列参数将会在传递的实参前传入作为它的参数。（来自 MDN）
 * 1. 返回一个新函数
 * 2. 可以传入参数
 */
// v1
Function.prototype.bind1 = function(context) {
  var self = this
  return function() {
    return self.apply(context)
  }
}

// v2
Function.prototype.bind2 = function(context) {
  var self = this
  // 获取 bind2 函数从第二个参数到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1)
  return function() {
    // 这个时候的 arguments 是指向 bind 返回的函数传入的参数
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(context, args.concat(bindArgs))
  }
}

// finally
Function.prototype.bind3 = function(context) {
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
  }
  var self = this
  var args = Array.prototype.slice.call(arguments, 1)
  var fNOP = function() {}
  var fBound = function() {
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
  }
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}


// test
var foo = {
  value: 3
}

function bar() {
  console.log(this.value)
}

var bindFoo = bar.bind3(foo)

bindFoo()