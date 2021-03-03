/**
 * --- 题目描述 ---
 *
 * 实现一个 parseParem 函数，将 url 转化为指定结果
 *
 * --- 测试用例 ---
 *
 * 输入：url = 'http://www.domain.com/?user=anonymous&id=123&id=456&id=789&city=%E5%8C%97%E4%BA%AC&enabled'
 * 输出：
{
 user:'anonymous',
 id:[123,456],// 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
 city:'北京',// 中文需解码
 enabled: true // 未指定值的 key 与约定为 true
}
 */

const parseParams = url => {
  const arr = url.split('?')[1].split('&')
  const paramsObj = {}
  arr.forEach(item => {
    const currentArr = item.split('=')
    const key = currentArr[0]
    let value = currentArr[1]
    if (value === undefined) {
      paramsObj[key] = true
    } else {
      value = decodeURI(value)
      if (key in paramsObj) {
        Array.isArray(paramsObj[key]) ? paramsObj[key].push(value) : paramsObj[key] = [paramsObj[key], value]
      } else {
        paramsObj[key] = value
      }
    }
  })
  console.log(paramsObj)
  return paramsObj
}

parseParams('http://www.domain.com/?user=anonymous&id=123&id=456&id=789&city=%E5%8C%97%E4%BA%AC&enabled')