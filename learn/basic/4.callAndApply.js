// call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法

// var foo = {
//   value: 1
// }

// function bar() {
//   console.log(this.value)
// }

// // bar.call(foo)

// // 1. call 改变了 this 的指向，指向到 foo
// // 2. bar 函数执行了

// // v2
// Function.prototype.call2 = function(context) {
//   // 首先要获取调用 call 的函数，用 this 可以获取
//   console.log(this)
//   context.fn = this
//   context.fn()
//   delete context.fn
// }

// var foo2 = {
//   value: 2
// }

// function bar2() {
//   console.log(this.value)
// }

// // bar.call2(foo2)

// // v3
// Function.prototype.call3 = function(context) {
//   context.fn = this
//   var args = []
//   for (var i = 1; i < arguments.length; i++) {
//     args.push('arguments[' + i + ']')
//   }
//   console.log(args)
//   eval('context.fn(' + args + ')')
//   delete context.fn
// }

// var foo3 = {
//   value: 3
// }

// function bar3(name, age) {
//   console.log(name)
//   console.log(age)
//   console.log(this.value)
// }

// bar3.call3(foo3, 'yzh', 18)

// v4

var value = 4444

var foo4 = {
  value: 4
}

Function.prototype.call4 = function(context) {
  var context = context || window
  context.fn = this
  var args = []
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
    // args.push(arguments[i])
  }
  var result = eval('context.fn(' + args + ')')
  // context.fn(...args)
  delete context.fn
  return result
}

function bar4(name, age) {
  console.log(this.value)
  return {
    value: this.value,
    name: name,
    age: age
  }
}

bar4.call4(null)

// apply
Function.prototype.apply = function (context, arr) {
  var context = Object(context) || window
  context.fn = this

  var result
  if (!arr) {
    result = context.fn()
  } else {
    var args = []
    for (var i = 0; i < arguments.length; i++) {
      args.push('arr[' + i + ']')
    }
    result = eval('context.fn(' + args + ')')
  }
  delete context.fn
  return result
}