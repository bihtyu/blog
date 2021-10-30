function deepClone(source) {
  if (!source) {
    return source
  }

  const map = new Map()

  const _clone = function (source) {
    const copy = Array.isArray(source) ? [] : {}

    for (let k in source) {
      if (typeof source[k] === 'object' && source[k] !== null) {
        if (map.get(source[k])) {
          copy[k] = map.get(source[k])
        } else {
          copy[k] = _clone(source[k])
          map.set(source[k], copy[k])
        }
      } else {
        copy[k] = source[k]
      }
    }
    return copy
  }
  return _clone(source)
}

function deepClone2(target) {
  const map = new Map()
  function clone(target) {
    if (typeof target === 'object' && target !== null) {
      let cloneTarget = Array.isArray(target) ? [] : {}
      if (map.get(target)) {
        return map.get(target)
      }
      map.set(target, cloneTarget)
      for (const key in target) {
        cloneTarget[key] = clone(target[key])
      }
      return cloneTarget
    } else {
      return target
    }
  }
  return clone(target)
}

function deepClone3(obj, hash = new WeakMap()) {
  // 如果参数为空则直接返回,如果是 日期/正则 也直接返回；
  if (obj == null) return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  if (typeof obj !== 'object') return obj
  if (hash.has(obj)) return hash.get(obj) // 如果weakmap 中存在则直接返回; 解决 参数本身引用本身造成爆栈；
  let cloneObj = new obj.constructor() // 此时是为了获取 obj 的类型, 并且可以根据类型来新建相应的拷贝对象;

  hash.set(obj, cloneObj) // 将 obj 设置为对象则将对象放入 WeakMap 中, 拷贝的时候如果没有该值则直接从weakMap 中取就好了;

  // 根据上文的对象类型,来进行填充;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 过滤掉对象元属性上面的属性
      cloneObj[key] = deepClone3(obj[key], hash)
    }
  }
  return cloneObj
}

let od = {
  name: '张三', 
  age: 18, 
  address: {
    province: '上海市', 
    district: '浦东新区'
   }
}
od.cloneSelf = od

// let test =  {a: {b: {c: a}}}  
// console.log(deepClone4({a: {b: {c: a}}}))

// console.log(deepClone4(od))

function deepClone4(data) {
  const wm = new WeakMap()

  function clone(data) {
    if (typeof data === 'object' && data !== null) {
      const target = Array.isArray(data) ? [] : {}
      if (wm.get(data)) {
        return wm.get(data)
      }
      wm.set(data, target)
      // const keys = [...Object.getOwnPropertySymbols(data), ...Object.keys(data)]
      const keys = Object.keys(data)
      for (let key of keys) {
        target[key] = clone(data[key])
      }
      return target
    } else {
      return data
    }
  }

  return clone(data)
}

function deepClone5(data) {
  const wm = new WeakMap()

  function clone(data) {
    if (typeof data === 'object' && data !== null) {
      const copy = Array.isArray(data) ? [] : {}
      if (wm.get(data)) {
        return wm.get(data)
      }

      wm.set(data, copy)
      const keys = [...Object.getOwnPropertySymbols(data), ...Object.keys(data)]
      for (const k of keys) {
        copy[k] = clone(data[k])
      }

      return copy
    } else {
      return data
    }
  }

  return clone(data)
}

console.log(deepClone4(od))
console.log(deepClone5(od))