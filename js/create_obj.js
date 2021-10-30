// 1. 工厂模式
function createPerson(name) {
  var o = new Object()
  o.name = name
  o.getName = function() {
    console.log(this.name)
  }
  return o
}
var person1 = createPerson('yzh')
var person2 = createPerson('dz')
// 缺点：对象无法识别，所有的实例都指向一个原型
// console.log(person1.__proto__ === person2.__proto__) // true
// console.log(person1.__proto__ === Object.prototype) // true

// 2. 构造函数模式
function Person(name) {
  this.name = name
  this.getName = getName
}
function getName() {
  console.log(this.name);
}
var person3 = new Person('yzh')
var person4 = new Person('dz')
// 缺点：方法多时不好处理

// 3. 原型模式
function Person2(name) {}
Person2.prototype.name = 'yzh'
Person2.prototype.getName = function() {
  console.log(this.name)
}
// 优点：方法不会重复创建
// 缺点：1.所有的属性和方法都共享；2.不能初始化参数

// 4. 组合模式
function Person2(name) {
  this.name = name
}
Person.prototype = {
  constructor: Person2,
  getName: function() {
    console.log(this.name)
  }
}
var person5 = new Person2('yzh')
// 优点：共享和私有的分开，使用较为广泛
// 缺点：封装性较差