var value = 1

function foo() {
  console.log(value)
}

function bar() {
  var value = 2
  foo()
}

// bar() // 1

var scope = 'global scope'
function checkscope() {
  var scope = 'local scope'
  function f() {
    return scope
  }
  return f()
}

// console.log(checkscope()) // local scope

var scope2 = 'global scope 2'
function checkscope2() {
  var scope2 = 'local scope 2'
  function f() {
    return scope2
  }
  return f
}

/**
 * <f> functionContext
 * scope: globalContext
 * <checkscope> functionContext
 * scope: globalContext
 */

// console.log(checkscope2()()) // local scope 2

function fun3() {
  console.log('fun3')
}

function fun2() {
  func3()
}

function fun1() {
  fun2()
}

// fun1()

// 入栈伪代码
// fun1()
// ECStack.push(<fun1> functionContext)

// fun1 调用 fun2，创建 fun2 的执行上下文
// ECStack.push(<fun2> functionContext)

// fun2 调用了 fun3
// ECStack.push(<fun3> functionContext)

// fun3 执行完毕
// ECStack.pop()

// fun2 执行完毕
// ECStack.pop()

// fun1 执行完毕
// ECStack.pop()

// javascript 继续执行下面的代码，但是 ECStack 底层永远有个 globalContext

console.log(yutest)
function yutest() {
  console.log('yutest')
}
var yutest = '123123'