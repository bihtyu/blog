
(function() {
  console.log('1.原型链继承-----------------------------')
  function SuperType() {
    this.property = true;
  }

  SuperType.prototype.getSuperValue = function() {
    return this.property
  }

  function SubType() {
    this.subProperty = false;
  }

  SubType.prototype = new SuperType()
  SubType.prototype.getSubTypeValue = function () {
    return this.subProperty
  }

  let p1 = new SubType()
  console.log(p1.getSuperValue())
  console.log(p1.getSubTypeValue())

  // 缺点
  // 1.引用类型的属性被所有实例共享
  // 2.子类型在实例化时不能给父类型的构造函数传参
})();

(function() {
  console.log('2.借用构造函数（经典继承或对象伪装）-----------------------------')
  function SuperType(name) {
    this.name = name
    this.color = ['blue', 'red', 'green']
  }

  function SubType(name) {
    // 相当于新的 SubType 对象上运行了 SuperType 函数中的所有初始化代码
    SuperType.call(this, name)
  }

  let p1 = new SubType('p1-name')
  p1.color.push('p1-color')

  let p2 = new SubType('p2-name')
  p2.color.push('p2-color')

  console.log(p1.name)
  console.log(p1.color)
  console.log(p2.name)
  console.log(p2.color)

  // 优点
  // 1.避免了引用类型的属性被所有实例共享
  // 2.可以在子类构造函数中向父类构造函数传参

  // 缺点
  // 1.方法都在构造函数中定义，每次创建实例都会创建一遍方法
  // 2.子类也不能访问父类原型上定义的方法
})();

(function() {
  console.log('3.组合继承（最常用的继承方式，也叫伪经典继承）-------')

  function SuperType(name) {
    this.name = name
    this.color = ['red', 'blue']
  }

  Super.prototype.sayName = function() {
    console.log(this.name)
  }

  function SubType(name, age) {
    SuperType.call(this, name)
    this.age = age
  }

  SubType.prototype = new SuperType()
  SubType.prototype.constructor = SubType

  SubType.prototype.sayAge = function() {
    console.log(this.age)
  }

  const p1 = new SubType('yzh', 28)
  const p2 = new SubType('dz', 30)

  p1.color.push('green')
  p2.color.push('gold')

  // 优点：融合原型链继承和构造函数继承的优点

  // 缺点
  // 1.会调用两次父构造函数
  // 第一次：SubType.prototype = new SuperType()
  // 第二次：p1 = new SubType('yzh', 28)

  // 2.实例和原型上存在两份相同的属性（name 和 color），
  //  一组在实例上，另一组在 SubType 的原型（SubType.prototype）上，这是两次条用 SuperType 构造函数的结果
})();

(function() {
  console.log('4.原型式继承-----------------------------')

  // ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型
  function createObj(o) {
    function F() {}
    F.prototype = o
    return new F()
  }

  var person = {
    name: 'kevin',
    friends: ['jack', 'tom']
  }

  var person1 = createObj(person)
  var person2 = createObj(person)

  person1.name = 'person1 name'
  console.log(person1.name) // person1 name
  console.log(person2.name) // kevin
  // 修改 person1.name 的值，person2.name 的值并未发生改变，并不是因为 person1 和 person2 有独立的 name 值，
  // 而是因为 person1.name = 'person1 name' 是给 person1 添加了 name 值，并非修改了原型上的 name

  person1.friends.push('taylor')
  console.log(person2.friends)

  // 优点：原型式继承非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合
  // 缺点：属性中包含的引用值始终会在相关对象间共享，跟使用原型模式是一样的
})();

(function() {
  console.log('5.寄生式继承-----------------------------')

  // 创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象
  function createObj(o) {
    var clone = Object.create(o)
    clone.sayName = function() {
      console.log('hi')
    }
    return clone
  }
  // 缺点：跟接用构造函数模式一样，每次创建对象都会创建一遍方法
})();

(function() {
  console.log('6.寄生组合式继承（最理想的继承方式）-----------------------------')

  function object(o) {
    function F() {}
    F.prototype = o
    return new F()
  }
  // 寄生式组合继承的核心逻辑
  function inheritPrototype(subType, superType) {
    let prototype = object(superType.prototype) // 创建父类原型副本
    prototype.constructor = subType // 解决由于重写导致默认 constructor 丢失的问题
    subType.prototype = prototype // 新创建的对象赋值给子类型的原型
  }

  function SuperType(name) {
    this.name = name
    this.color = ['red', 'blue']
  }

  SuperType.prototype.sayName = function() {
    console.log(this.name)
  }
  function SubType(name, age) {
    SuperType.call(this, name)
    this.age = age
  }

  inheritPrototype(SubType, SuperType)

  SubType.prototype.sayAge = function() {
    console.log(this.age)
  }

  // 这种继承方式的【高效率】体现在它只调用一次 SuperType 构造函数，
  // 避免了在 SuperType.prototype 上面创建不必要、多余的属性。
  // 同时，原型链还能保持不变，可以正常使用 instanceof 和 isPrototypeOf
})();