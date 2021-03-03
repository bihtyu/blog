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
