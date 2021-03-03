/**
 * --- 题目描述 ---
 *
 * 实现一个方法，把 HTTP 文本形式(字符串)的 header 转换成 JS 对象。
 * 
 * --- 测试用例 ---
 * 
 * 输入：
 * `Accept-Ranges: bytes 
 * Cache-Control: max-age=6000, public
 * Connection: keep-alive
 * Content-Type: application/javascript`
 * 输出：
 * {
 *   "Accept-Ranges": "bytes",
 *   "Cache-Control": "max-age=6000, public",
 *   Connection: "keep-alive",
 *   "Content-Type": "application/javascript"
 * }
 *
 * --- 解题思路 ---
 *
 * 1. 首先将每行数据作为数组的一个元素
 * 2. 将每个元素使用冒号分割，前面为 `key`，后面为 `value`。
 */

 const solution = s => {
  const arr = s.split('\n')
  const obj = {}
  arr.forEach(item => {
    const currentArr = item.split(': ')
    const key = currentArr[0]
    const value = currentArr[1]
    obj[key] = value
  })
  console.log(obj)
  return obj
 }

 const header =  `Accept-Ranges: bytes
Cache-Control: max-age=6000, public
Connection: keep-alive
Content-Type: application/javascript`

 solution(header)