// Object.defineProperty(global, 'a', {
let _default = 0
Object.defineProperty(global, 'a', {
  get() {
    return ++_default
  }
})

if (a === 1 && a === 2 && a === 3) {
  console.log('finish')
}

// const a = {
//   _default: 0,
//   toString() {
//     return ++this._default
//   }
// }

// if (a == 1 && a == 2 && a == 3) {
//   console.log('finish')
// }