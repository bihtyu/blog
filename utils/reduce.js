Array.prototype.reduce2 = function(fn, init) {
  const arr = this;

  let total = init || arr[0];

  for (let i = init ? 0 : 1; i < arr.length; i++) {
    total = fn(total, arr[i], i, arr);
  }

  return total
}

// 去重
const a = [1,2,3,4,5,6,7,7,3,2,3,4,10]

const b = a.reduce_2((unique, cur) => {
  !unique.includes(cur) && unique.push(cur);
  return unique
}, [])

// console.log(b)


// 找到数组中重复次数最多的值

const c = ['a','b','c','a','d','e','r','a','f','f','f','f','f']

const d = c.reduce_2((obj, cur) => {
  obj[cur] ? obj[cur]++ : obj[cur] = 1;
  return obj
}, {})

// console.log(d)

// max or min
const e = [1,2,33,4,5,6,7,7,3,2,3,4,10]

const f = e.reduce2((target, cur) => {
  return Math.min(target, cur);
})

console.log(f)
