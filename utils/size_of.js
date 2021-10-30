const testData = {
  a: 111,
  b: 'cccc',
  2222: false
}

// error
function sizeOf_0(object) {
  let total = 0
  switch(typeof object) {
    case 'number':
      total = 8
      break
    case 'string':
      total = object.length * 2
      break
    case 'boolean':
      total = 4
      break
    case 'object':
    {
      for (let k in object) {
        total += sizeOf(object[k])
      }
      break
    }
  }
  return total
}

// better - 递归
function sizeOf_recursion(object) {
  const type = typeof object
  switch(type) {
    case 'string': {
      return object.length * 2
    }
    case 'number': {
      return 8
    }
    case 'boolean': {
      return 4
    }
    case 'object': {
      if (Array.isArray(object)) {
        return object.map(item => sizeOf_recursion(item)).reduce((total, current) => total + current, 0)
      } else {
        return getObjectSize(object)
      }
    }
  }
}

function getObjectSize(object) {
  const ws = new WeakSet()
  if (object === null) { return 0 }

  const props = Object.keys(object)
  let bytes = 0
  for (let i = 0; i < props.length; i++) {
    let k = props[i]
    bytes += sizeOf_recursion(k)
    if (typeof object[k] === 'object' && object[k] !== null) {
      if (ws.has(object[k])) {
        continue
      }
      ws.add(object[k])
    }
    bytes += sizeOf_recursion(object[k])
  }
  return bytes
}

// var b = {}
// var a = { name: 'yzh' }
// b.other = a

// console.log(sizeOf(a))
// var niu = require('object-sizeof')
// console.log(niu(123))


// -------------------------------------------
// 迭代
function sizeOf_iteration(object) {
  const type = typeof object
  switch(type) {
    case 'string': {
      return object.length * 2
    }
    case 'number': {
      return 8
    }
    case 'boolean': {
      return 4
    }
    case 'object': {
      if (Array.isArray(object)) {
        // const stack = [...object];
        // const res = [];
        // while(stack.length) {
        //   const cur = stack.pop();
        //   Array.isArray(cur) ? stack.push(...cur) : res.push(cur);
        // }
        // return res.reduce((total, item) => total + sizeOf_iteration(item), 0);

        return object.flat(Infinity).reduce((total, cur) => total + sizeOf_iteration(cur), 0)
      } else {
        return getObjectSize_iteration(object)
      }
    }
  }
}

const ws = new WeakSet();
function getObjectSize_iteration(object) {
  if (object === null) { return 0 }

  let bytes = 0;
  const props = Object.keys(object);
  const stack = props.map(k => {
    bytes += sizeOf_iteration(k);
    return object[k]
  });

  while(stack.length) {
    const cur = stack.pop();
    if (typeof cur === 'object' && cur !== null) {
      if (ws.has(cur)) {
        continue;
      }
      ws.add(cur);
      stack.push(...Object.keys(cur).map(k => {
        bytes += sizeOf_iteration(k);
        return cur[k]
      }));
    } else {
      bytes += sizeOf_iteration(cur);
    }
  }

  // for (let i = 0; i < props.length; i++) {
  //   let k = props[i];
  //   bytes += sizeOf(k);
  //   if (typeof object[k] === 'object' && object[k] !== null) {
  //     if (ws.has(object[k])) {
  //       continue;
  //     }
  //     ws.add(object[k]);
  //   }

  //   bytes += sizeOf(object[k]);
  // }
  return bytes;
}

const a = {
  name: 'yzh',
  age: 28,
  smoking: false,
  gile: {
    dz: {
      age: 22,
      home: 'guangzhou'
    }
  }
}

const b = [1,2,3,4,['123','333'],false,'123',[222,333,444,[123,3,[11]]]]

console.log(sizeOf_recursion(b))
console.log(sizeOf_iteration(b))