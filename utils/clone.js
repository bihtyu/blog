const deepClone = (obj = {}) => {
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  let res
  if (obj instanceof Array) {
    res = []
  } else {
    res = {}
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = deepClone(obj[key])
    }
  }
  return res
}

// copy number, null, undefined, array, function, boolean, string
const copyData = data => {
  const typeString = Object.prototype.toString.call(data)
  const type = typeString.slice(8, -1)
  let copy
  switch(type) {
    case 'Number':
      copy = data - 0
      break
    case 'String':
      copy = data + ''
      break
    case 'Null':
    case 'Undefined':
    case 'Function':
    case 'Boolean':
      copy = data
      break
    case 'Object':
      {
        copy = {}
        for (let k in data) {
          copy[k] = data[k]
        }
        break
      }
    case 'Array':
      {
        copy = []
        for (let i = 0; i < data.length; i++) {
          copy[i] = data[i]
        }
        break
      }
    default:
      copy = data
  }
  return copy
}

console.log(copyData(123))
console.log(copyData('123'))
console.log(copyData(null))
console.log(copyData(undefined))
console.log(copyData(function() { console.log(123) }))
console.log(copyData(true))
console.log(copyData([1,2,3,4,5]))
console.log(copyData({ a: 123, b: 456}))