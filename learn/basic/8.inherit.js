
(function() {
  console.log('1.原型链继承-----------------------------')

  function Parent() {
    this.names = ['yzh', 'dz']
  }
  
  Parent.prototype.getName = function() {
    console.log(this.name)
  }
  
  function Child() {}
  Child.prototype = new Parent()
  
  var child1 = new Child()
  child1.names.push('test')
  console.log(child1.names)
  
  var child2 = new Child()
  console.log(child2.names)

  // 问题
  // 1.引用类型的属性被所有实例共享
  // 2.在创建 Child 的实例时，不能向 Parent 传参

})();

(function() {
  console.log('2.借用构造函数（经典继承）-----------------------------')

  function Parent() {
    this.names = ['yzh', 'dz']
  }

  // 子类型的构造函数中，调用要继承的构造函数
  function Child() {
    Parent.call(this)
  }
  
  var child1 = new Child()
  
  child1.names.push('test2')
  
  console.log(child1.names)
  
  var child2 = new Child()
  
  console.log(child2.names)

  // 优点
  // 1.避免了引用类型的属性被所有实例共享
  // 2.可以在 Child 中向 Parent 传参

  // 缺点：方法都在构造函数中定义，每次创建实例都会创建一遍方法

})();

(function() {
  console.log('3.组合继承（最常用的继承方式）-----------------------------')

  function Parent(name) {
    this.name = name
    this.colors = ['red', 'black', 'green']
  }

  Parent.prototype.getName = function() {
    console.log(this.name)
  }

  function Child(name, age) {
    Parent.call(this, name)
    this.age = age
  }

  Child.prototype = new Parent()
  // 还原 Child 的构造函数
  Child.prototype.constructor = Child

  var child1 = new Child('kevin', '18')

  child1.colors.push('blue')

  console.log(child1.name)
  console.log(child1.age)
  console.log(child1.colors)

  var child2 = new Child('jack', '22')

  console.log(child2.name)
  console.log(child2.age)
  console.log(child2.colors)

  // 优点：融合原型链继承和构造函数继承的优点

  // 缺点
  // 1.会调用两次父构造函数
  // 第一次：Child.prototype = new Parent()
  // 第二次：var child1 = new Child('kevin', '18')

  // 2.实例和原型上存在两份相同的属性（name 和 colors）

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

  // 缺点：包含引用类型的属性值始终都会共享相应的值，这点和原型链继承一样

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

  // 这种继承方式的高效率体现在它只调用一次 Parent 函数，避免了在 Parent.prototype 上面创建不必要、多余的属性。
  // 同时，原型链还能保持不变，可以正常使用 instanceof 和 isPrototypeOf

  function object(o) {
    function F() {}
    F.prototype = o
    return new F()
  }

  function prototype(child, parent) {
    var prototype = object(parent.prototype)
    prototype.constructor = child
    child.prototype = prototype
  }

  // 使用
  prototype(Child, Parent)

})();