const format = function(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + 'MB'
}

const print = function() {
  const memoryUsage = process.memoryUsage()

  console.log(JSON.stringify({
    rss: format(memoryUsage.rss), // rss（resident set size）：RAM 中保存的进程占用的内存部分，包括代码本身、栈、堆
    heapTotal: format(memoryUsage.heapTotal), // 堆中总共申请到的内存量
    heapUsed: format(memoryUsage.heapUsed), // 堆中目前使用的内存量
    external: format(memoryUsage.external), // V8 引擎内部的 C++ 对象占用的内存
  }))
}

function Quantity(num) {
  if (num) {
    return new Array(num * 1024 * 1024)
  }
  return num
}

function Fruit(name, quantity) {
  this.name = name
  this.quantity = new Quantity(quantity)
}

const apple = new Fruit('apple')
print()

let banana = new Fruit('banana', 20)
print()
banana = null
global.gc()
print()
