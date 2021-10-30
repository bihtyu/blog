## ES6
1. 箭头函数 
- 1.1 箭头函数 this 为父作用域的 this，不是调用时的 this，箭头函数的 this 永远指向其父作用域，任何方法都不能改变，包括 call、apply、bind
- 1.2 箭头函数不能作为构造函数，不能使用new
```
// 构造函数如下：
function Person(p){
    this.name = p.name;
}
//如 果用箭头函数作为构造函数，则如下
var Person = (p) => {
    this.name = p.name;
}
// 由于this必须是对象实例，而箭头函数是没有实例的，此处的this指向别处，不能产生person实例，自相矛盾。
```  
- 1.3 箭头函数没有arguments，caller，callee
```
let B = (b)=>{
  console.log(arguments);
}
B(2,92,32,32);   // Uncaught ReferenceError: arguments is not defined

// 箭头函数本身没有arguments，如果箭头函数在一个function内部，它会将部函数的arguments拿过来使用。箭头函数中要想接收不定参数，应该使用rest参数...解决。
let C = (...c) => {
  console.log(c);
}
C(3,82,32,11323);  // [3, 82, 32, 11323]
```
- 1.4 箭头函数通过 call 和 apply 调用，不会改变 this 指向，只会传入参数
```
let obj2 = {
    a: 10,
    b: function(n) {
        let f = (n) => n + this.a;
        return f(n);
    },
    c: function(n) {
        let f = (n) => n + this.a;
        let m = {
            a: 20
        };
        return f.call(m,n);
    }
};
console.log(obj2.b(1));  // 11
console.log(obj2.c(1));  // 11
```
- 1.5 箭头函数没有原型属性
```
var a = ()=>{
  return 1;
}

function b(){
  return 2;
}

console.log(a.prototype);  // undefined
console.log(b.prototype);   // {constructor: ƒ}
```
- 1.6 箭头函数返回对象时，要加一个小括号
```
var func = () => ({ foo: 1 }); //正确
var func = () => { foo: 1 };   //错误
```
- 1.7 多重箭头函数就是一个高阶函数，相当于内嵌函数
```
const add = x => y => y + x;
//相当于
function add(x){
  return function(y){
    return y + x;
  };
}
```
- 1.8 箭头函数在ES6 class中声明的方法为实例方法，不是原型方法
```
//deom1
class Super{
    sayName(){
        //do some thing here
    }
}
// 通过Super.prototype可以访问到sayName方法，这种形式定义的方法，都是定义在prototype上
var a = new Super()
var b = new Super()
a.sayName === b.sayName //true
//所 有实例化之后的对象共享prototypy上的sayName方法


// demo2
class Super{
    sayName =()=>{
        //do some thing here
    }
}
// 通过Super.prototype访问不到sayName方法，该方法没有定义在prototype上
var a = new Super()
var b = new Super()
a.sayName === b.sayName //false
// 实例化之后的对象各自拥有自己的sayName方法，比demo1需要更多的内存空间
// 因此，在class中尽量少用箭头函数声明方法。
```
- 1.9 箭头函数常见错误
```
let a = {
  foo: 1,
  bar: () => console.log(this.foo)
}

a.bar()  // undefined
// bar 函数中的 this 指向父作用域，而 a 对象没有作用域，因此 this 不是 a，打印结果为 undefined
```
```
function A() {
  this.foo = 1
}

A.prototype.bar = () => console.log(this.foo)

let a = new A()
a.bar()  // undefined
// 原型上使用箭头函数，this 指向是其父作用域，并不是对象 a，因此得不到预期结果
```


参考文档  
[ES6箭头函数总结](https://www.cnblogs.com/mengff/p/9656486.html)

    
2. let、var、const
- 通过 var 定义的变量，它的作用域是在 function 或任何外部已经被声明的 function，是全域的
- 用 let 声明的变量，不存在变量提升，let声明的全局变量不是全局对象的属性。而且要求必须 等let声明语句执行完之后，变量才能使用，不然会报Uncaught ReferenceError错误。在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone），简称 TDZ
```
console.log(aicoder);    // 错误：Uncaugh ReferenceError: a is not defined ...
let a = '123';
// 这里就可以安全使用 a
```
- 我们应该用 let 替代 var 吗？
```
不是的，let 是新的块作用域。语法强调在 var 已经是区块作用域时时，let 应该替换 var ，否则请不要。  
let 改善了在 JS 作用域的选项，而不是取代。var 对于变量依旧是有用的，可被用在整个 function 之中
```
- const声明的变量只可以在声明时赋值，不可随意修改，否则会导致SyntaxError（语法错误；用const声明变量后必须要赋值，否则也抛出语法错误
```
const a = {a:'a'}; // 绑定的是对象指针
a = {a:'b'};   // 这里绑定新对象的指针给 a，重新赋值当然是行不通的
a.a = 'b'      // 对象指针没变，指针指向的内容可以随意改变
```
