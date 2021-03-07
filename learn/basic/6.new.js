/**
 * new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一
 */

function Otaku(name, age) {
  this.name = name
  this.age = age
  this.habit = 'games'
}

Otaku.prototype.strength = 60
Otaku.prototype.sayYouName = function() {
  console.log('I am ' + this.name)
}

// v1
function objectFactory(context) {
  // 1. 用 new Object() 的方式新建了一个对象 obj
  var obj = new Object()
  // 2. 取出第一个参数，就是我们要传入的构造函数。
  // 此外因为 shift 会修改原数组，所以 arguments 会被去掉第一个参数
  var Constructor = [].shift.call(arguments)
  // 3. 将 obj 的原型指向构造函数，这样 obj 就可以访问到构造函数原型中的属性
  console.log(Constructor.prototype)
  obj.__proto__ = Constructor.prototype
  // 4. 使用 apply 改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
  Constructor.apply(obj, arguments)
  return obj
}

var person = objectFactory(Otaku, 'yzh', '22')
console.log(person.sayYouName())
console.log(person.habit)
console.log(person.strength)

// v2
function objectFactory2(context) {
  var obj = new Object()
  Constructor = [].shift.call(arguments)
  obj.__proto__ = Constructor.prototype
  var ret = Constructor.apply(obj, arguments)
  // 5. 判断返回的值是不是一个对象
  return typeof ret === 'object' ? ret : obj
}