function limitLoad(urls, handler, limit) {
  const sequence = [].concat(urls)
  let promises = []

  // 获取前 limit 个
  promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      return index
    })
  })

  // 使用 Promise.race()，逐个执行
  let p = Promise.race(promises)
  for(let i = 0; i < sequence.length; i++) {
    p = p.then(res => {
          // 覆盖已执行完的 promise
          promises[res] = handler(sequence[i]).then(() => {
            return res
          })
          // 返回下一个 Promise，完成一条链路的调用
          return Promise.race(promises)
        })
  }
}

const urls = [
  { info: 'link1', time: 5000 },
  { info: 'link2', time: 2000 },
  { info: 'link3', time: 1000 },
  { info: 'link4', time: 3000 },
  { info: 'link5', time: 5000 }
]

function loadImg(url) {
  return new Promise((resolve, reject) => {
    console.log('----' + url.info + ' start')
    setTimeout(() => {
      console.log(url.info + ' ok')
      resolve()
    }, url.time)
  })
}

// limitLoad(urls, loadImg, 3)
limitLoad2(urls, loadImg, 3)

function limitLoad2(urls, handler, limit) {
  const sequence = [].concat(urls);

  const arr = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      return index
    });
  })

  let p = Promise.race(arr);
  
  for (let i = 0; i < sequence.length; i++) {
    p = p.then(index => {
      arr[index] = handler(sequence[i]).then(() => {
        return index
      });
      return Promise.race(arr);
    })
  }
}
