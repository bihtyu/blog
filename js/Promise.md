1. 初始化 Promise 状态（pending)
2. 执行 then(...) 注册回调处理数组（then 方法可被同一个 promise 调用多次）
3. 立即执行 Promise 中传入的 fn 函数， 将 Promise 内部 resolve、reject 函数作为参数传递给 fn，按事件机制时机处理
4. Promise 中要保证，then 方法传入的参数 onFulfilled 和 onRejected，必须在 then 方法被调用的那一轮事件循环之后的新执行栈中执行
```
function Promise1(fn) {
  let state = 'pending'
  let value = null
  const callbacks = []

  this.then = function(onFulfilled) {
    return new Promise1((resolve, reject) => {
      handle({ // 桥梁，将新的 Promise1 的 resolve 方法，放到前一个 Promise1 的回调对象中
        onFulfilled,
        resolve
      })
    })
  }

  this.catch = function(onError) {
    this.then(null, onError)
  }

  this.finally = function(onDone) {
    this.then(onDone, onError)
  }

  this.resolve = function(value) {
    if (value && value instanceof Promise1) {
      return value
    } else if (value && typeof value === 'object' && typeof value.then === 'function') {
      let then = value.then
      return new Promise1(resolve => {
        then(resolve)
      })
    } else if (value) {
      return new Promise1(resolve => resolve(value))
    } else {
      return new Promise1(resolve => resolve())
    }
  }

  this.reject = function(value) {
    return new Promise1(function(resolve, reject) {
      reject(value)
    })
  }

  function handle(callback) {
    if (state === 'pending') {
      callbacks.push(callback)
      return
    }

    const cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected
    const next = state === 'fulfilled' ? callback.resolve : callback.reject
    if (!cb) {
      next(value)
      return
    }
    try {
      const ret = cb(value)
      next(ret)
    } catch(e) {
      callback.reject(e)
    }
  }

  function resolve(newValue) {
    const fn = () => {
      if (state !== 'pending') return
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        const { then } = newValue
        if (typeof then === 'function') {
          // newValue 为新产生的 Promise，此时 resolve 为上个 promise 的 resolve
          // 相当于调用了新产生 Promise 的 then 方法，注入了上个 promise 的 resolve 为其回调
          then.call(newValue, resolve)
          return
        }
      }
      state = 'fulfilled'
      value = newValue
      handleCb()
    }
    setTimeout(fn, 0) // 基于 PromiseA+ 规范
  }

  function reject(error) {
    const fn = () => {
      if (state !== 'pending') return
      if (error && (typeof error === 'object' || typeof error === 'function')) {
        const { then } = error
        if (typeof then === 'function') {
          then.call(error, resolve, reject)
          return
        }
      }
      state = 'rejected'
      value = error
      handleCb()
    }
    setTimeout(fn, 0)
  }

  function handleCb() {
    while(callbacks.length) {
      const fulfiledFn = callbacks.shift()
      handle(fulfiledFn)
    }
  }

  fn(resolve)
}

new Promise1((resolve, reject) => {
  setTimeout(() => {
    resolve({ test: 1 })
  }, 1000)
}).then(data => {
  console.log('result 1: ', data)
  return test()
}).then(data => {
  console.log('result 2: ', data)
})

function test(id) {
  return new Promise1((resolve) => {
    setTimeout(() => {
      resolve({ test: 2 })
    }, 5000)
  })
}
```