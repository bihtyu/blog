function PromiseAll(promiseArray) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promiseArray)) {
      return reject(new Error('传入参数必须是数组！'))
    }
    const result = []
    const promiseNums = promiseArray.length
    let counter = 0
    for (let i = 0; i < promiseNums; i++) {
      // 使用 Promise.resolve 包裹 promiseArray[i]，一定返回一个 promise，
      // 代替判断是 promise 还是基础类型数据
      Promise.resolve(promiseArray[i]).then(res => {
        counter++
        // 防止结果和参数位置对不上
        result[i] = res
        if (counter === promiseNums) {
          resolve(result)
        }
      }).catch(err => {
        reject(err)
      })
    }
  })
}

const pro1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('1')
  }, 1000)
})
const pro2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('2')
  }, 4000)
})
const pro3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('3')
  }, 500)
})

PromiseAll([pro1, 11111, pro3]).then(res => {
  console.log(res)
})

// https://bigfrontend.dev/problem/implement-Promise-any
function any(promises) {
  const rejectArr = []
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(res => resolve(res)).catch(err => {
        rejectArr[i] = err
        if (rejectArr.length === promises.length) {
          reject(new AggregateError('No Promise in Promise.any was resolved', rejectArr))
        }
      })
    }
  })
}

// https://bigfrontend.dev/problem/implement-Promise-allSettled
function allSettled(promises) {
  let len = promises.length
  let res = [] 

  return new Promise(resolve => {
    if (len === 0) resolve(res)
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(value => {
        res[i] = { status: 'fulfilled', value }
      }).catch(reason => {
        res[i] = { status: 'rejected', reason }
      }).finally(() => {
        if (res.length === len) resolve(res)
      })
    }
  })
}
