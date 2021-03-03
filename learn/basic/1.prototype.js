function Person() {}

var person = new Person()

console.log(person.__proto__ === Person.prototype) // true

console.log(Person.prototype.constructor === Person) // true

console.log(Object.getPrototypeOf(person) === Person.prototype) // true

console.log(Person.prototype.__proto__ === Object.prototype) // true

console.log(person.__proto__.__proto__.__proto__) // null