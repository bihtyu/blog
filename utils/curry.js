function addCurry() {
  // 1. 把所有参数转换成数组
  let args = Array.prototype.slice.call(arguments)
  // 2. 再次调用 add 函数，传递合并当前与之前的参数
  let fn = function () {
    let arg_fn = Array.prototype.slice.call(arguments)
    return add.apply(null, args.concat(arg_fn))
  }
  // 3. 最后默认调用，返回合并的值
  fn.toString = function () {
    return args.reduce(function (a, b) {
      return a + b
    })
  }
  return fn
}

// ES6 版本
function addMadeByES6() {
  let args = [...arguments]
  let fn = function () {
    return addMadeByES6(null, args.concat([...arguments]))
  }
  fn.toString = () => args.reduce((a, b) => a + b)
  return fn
}

function argsSum(args) {
  return args.reduce((pre, cur) => {
    return pre + cur
  })
}

function add(...args1) {
  let sum1 = argsSum(args1)
  let fn = function (...args2) {
    let sum2 = argsSum(args2)
    return add(sum1 + sum2)
  }
  fn.toString = function () {
    return sum1
  }
  return fn
}

// ----------------------------------------

function addNum() {
  return [].reduce.call(arguments, (total, current) => total + current, 0)
}
const curry_3 = fn => {
  return function curriedFn(...args) {
    if (args.length < fn.length) {
      return function() {
        return curriedFn.apply(null, args.concat([].slice.call(arguments)))
      }
    }
    return fn.apply(null, args)
  }
}
function multiply(x, y, z, m, n) {
  return x * y * z * m * n
}

let multiplyCurry_2 = curry_3(multiply)


const curry_4 = fn => {
  return function curriedFn(...args) {
    if (args.length < fn.length) {
      return function() {
        return curriedFn.apply(null, args.concat([].slice.call(arguments)))
      }
    }
    return fn.apply(null, args)
  }
}

function add4(x, y, z) {
  return x + y + z;
}

const add4_curry = curry_4(add4)
console.log(add4_curry(1)(2)(3)(4))