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

console.log(checkscope())

var scope2 = 'global scope 2'
function checkscope2() {
  var scope2 = 'local scope 2'
  function f() {
    return scope2
  }
  return f
}

console.log(checkscope2()())