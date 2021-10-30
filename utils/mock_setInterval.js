let timer = null

function mockSetinterval(fn, delay, ...args) {
  const func = () => {
    timer = setTimeout(() => {
      fn.apply(this, args)
      func()
    }, delay)
  }

  func()
}

mockSetinterval(name => {
  console.log(name)
}, 1000, 'bihtyu')

function clearMockInterval(id) {
  clearTimeout(id)
}

setTimeout(() => {
  clearMockInterval(timer)
}, 5000)
