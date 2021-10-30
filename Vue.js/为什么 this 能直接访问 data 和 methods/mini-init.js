function noop(a, b, c) {}

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

function initData(vm) {
  const data = vm._data = vm.$options.data
  const keys = Object.keys(data)
  let i = keys.length
  while(i--) {
    const key = keys[i]
    proxy(vm, '_data', key)
  }
}

function initMethods(vm, methods) {
  for (let key in methods) {
    vm[key] = typeof methods[key] !== 'function' ? noop : methods[key].bind(vm)
  }
}

function Person(options) {
  let vm = this
  vm.$options = options
  var opts = vm.$options
  if (opts.data) {
    initData(vm)
  }
  if (opts.methods) {
    initMethods(vm, opts.methods)
  }
}

const p = new Person({
  data: {
    name: 'bihtyu'
  },
  methods: {
    sayName() {
      console.log(this.name)
    }
  }
})

p.sayName()
p.name = 'dz'
p.sayName()