// 快速排序
/**
 * --- 测试用例 ---
 *
 * 输入：[1, 34, 5, 76, 8, 6, 9, 7, 6, 3]
 * 输出：[1, 3, 5, 6, 6, 7, 8, 9, 34, 76]
 *
 * --- 说明 ---
 *
 * 思考：快速排序是稳定的吗？
 * 解答：base 的每次选择，会导致快排是不稳定排序。
 */
const quickSort = (nums) => {
  if (nums.length < 2) {
    return nums
  } else {
    const left = []
    const right = []
    const base = nums.splice(0, 1)[0]
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] < base) {
        left.push(nums[i])
      } else {
        right.push(nums[i])
      }
    }
    return quickSort(left).concat([base], quickSort(right))
  }
}

/**
 * --- 测试用例 ---
 *
 * 输入：[5, 2, 4, 7, 9, 8, 3, 6, 3, 8, 3]
 * 输出：[2, 3, 3, 3, 4, 5, 6, 7, 8, 8, 9]
 *
 * --- 说明 ---
 * 
 * 思考：冒泡排序是稳定的吗？
 * 解答：稳定。相等的元素不发生交换
 */
const bubbleSort = (arr) => {
  let len = arr.length, j
  let temp
  while (len > 0) {
    for (j = 0; j < len - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
    len--
  }
  return arr
}

const selectionSort = (arr) => {
  var len = arr.length
  var minIndex, temp
  for (var i = 0; i < len - 1; i++) {
    minIndex = i
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
    console.log(arr)
  }
  return arr
}

// console.log(selectionSort([1]))
