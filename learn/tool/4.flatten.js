const arr = [1, [2, [3, 4]]]
const flatten1 = arr => {
  let result = []
  for(let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten1(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result
}

const flatten2 = arr => {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

const arr1 = [0, 1, 2, [[[3, 4]]]];

console.log(arr1.flat(3)); // 3 代表数组内最多嵌套层数