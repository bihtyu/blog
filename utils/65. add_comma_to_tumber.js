/**
 * @param {number} num
 * @return {string}
 */
// function addComma(num) {
//   // your code here
//   return num.toLocaleString('zh-CN', { maximumFractionDigits: 20 })
// }

function addComma(num) {
  const isNegative = num < 0
  const arr = (num + '').split('.')
  const front = arr[0].split('').reverse()

  isNegative && front.pop()

  let str = front.reduce((s, cur, idx) => {
    if ((idx + 1) % 3 === 0 && idx !== front.length - 1) {
      s = ',' + cur + s
    } else {
      s = cur + s
    }
    return s
  }, '')

  str = arr[1] ? `${str}.${arr[1]}` : str

  return isNegative ? `-${str}` : str
}


// https://bigfrontend.dev/problem/add-comma-to-number