# css
#### 三栏布局方案

方案 | 优点 | 缺点
---|--- | ---
浮动布局 | 兼容性好 | 脱离文档流（需要清理浮动以及处理好浮动周边的关系） |
绝对定位 | 快捷 | 脱离文档流，使其子元素也必须脱离文档流，可用性较差 |
flex布局 | 解决上面两个出现的问题，多用于移动端 |不能兼容IE8及以下浏览器 |
表格布局 | 兼容性好 | 当其中一个单元格高度超出的时，其他高度也会变化。技术老旧，不建议使用 |
Grid布局 | 新技术，代码量少 |兼容性较差 |

![image](https://images2015.cnblogs.com/blog/1008386/201608/1008386-20160830160542949-371754668.png)
参考文档：  
[flex弹性布局学习总结](https://www.cnblogs.com/nuannuan7362/p/5823381.html)

#### CSS盒模型
![image](https://github.com/bihtyu/Blog/blob/master/images/CSS%E7%9B%92%E6%A8%A1%E5%9E%8B.png)

标准模型width不计算padding和border；
IE模型width计算padding和border。
```
// 设置盒模型
box-sizing: content-box;  // 标准模型
box-sizing: border-box;   // IE模型
```

```
// 获取宽高
dom.style.width  // 只能取内联宽高
dom.currentStyle.width // 浏览器渲染后的取值，only IE
window.getComputedStyle(dom).width // 浏览器渲染后的取值，兼容性更好
dom.getBoundingClientRect().width/height/left/top // 常用于计算位置
```

#### BFC（Block Fromatting Context）边距重叠解决方案
1. BFC的基本概念：块级格式化上下文  

2. BFC的原理：BFC的渲染规则    
- 在BFC这个元素的垂直方向的边距会发生重叠；  
- BFC的区域不会与浮动元素的box重叠；  
- BFC在页面上是一个独立的容器，外面的元素不会影响里面的元素，里面的元素也不会影响外面的元素；  
- 计算BFC高度时，浮动元素也会参与计算  

3. 如何创建BFC  
- float不为none；  
- position不为static或relative；  
- display为inline-block或者是table相关的；  
- overflow不为visible

4. BFC的使用场景  
- 解决垂直方向的边距问题  
- 清除浮动  
- 不与浮动元素重叠  

# JavaScript

#### DOM事件
1. DOM事件模型：冒泡、捕获  
2. DOM事件类：  
- 事件级别  
    - DOM1设计时没有设计跟事件相关的标准  
    - DOM2  element.addEventListener('click', function(){},false) 来源于DOM2  
    - DOM3 element.addEventListener('keyup', function(){}, false) 添加了许多事件类型  
        > 当addEventListener的第三个参数为true的时候，代表是在捕获阶段绑定，当第三个参数为false或者为空的时候，代表在冒泡阶段绑定

- 事件模型：捕获从上往下，冒泡从下往上  
- 事件流：一个完整的事件流分3个阶段（捕获 -> 目标-> 冒泡） 
- 事件捕获的具体流程：window->document->html(document.documentElement)->body(document.body)->html结构->目标元素  
- 冒泡：捕获反过来

3. Event对象的常见应用  
- event.preventDefault()：阻止默认事件，例如a标签跳转；  
- event.stopPropagation()：阻止冒泡事件；  
- event.stoplmmediatePropagation()：事件响应优先级（在当前响应函数中使用该方法可以阻止其他响应函数）；  
- event.currentTarget：事件代理绑定的事件（父级）；  
- event.target：当前被点击的元素；  
> currentTarget始终是监听事件者，而target是事件的真正发出者（范围：currentTarget >= target）==  

> 事件委托可以为新添加的DOM元素动态地添加事，当用事件委托的时候，不需要去遍历元素的子节点，只需要给父级元素添加事件就好了，其他的都是在js里面的执行，这样可以大大地减少dom操作，这就是事件委托的精髓所在。  

4. 自定义事件
```
var eve = new Event('test');
dom.addEventListener('test', function () {
    console.log('test dispatch');
});
setTimeout(function () {
    dom.dispatchEvent(eve);
}, 1000);
```

参考文档：  
[深入理解e.target与e.currentTarget](https://juejin.im/post/59f16ffaf265da43085d4108)  

#### 类型转换
1. 数据类型  
原始类型：boolean, null, undefined, number, string, symbol(ES6新增)  
对象（复合类型）：object  
2. 转换  
2.1 显式类型转换 Number()函数  
    >原始类型转换  
    >>数值-> 不变  
    字符串 -> 数值（可以解析为数值时），NaN（不能），0（空字符串）  
    布尔值 -> 1（true），0（false）  
    undefined -> NaN  
    null -> 0  
    
    >对象类型转换  
    >> 调用valueOf() -> 原始类型的值 -> Number(a)  
    >> var a = {b: 1};  
    >> a.valueof() -> 复合类型的值 -> a.toString() -> 原始类型的值 -> number(a)  
    >> a.valueof() -> 复合类型的值 -> a.toString() -> 复合类型的值 -> 报错（转换失败）
    
    2.2 显式类型转换 String()函数
    ```
      <script type="text/javascript">
        // 数值：转为相应的字符串
        console.log(String(123)); // "123"
        // 字符串：转换后还是原来的值
        console.log(String('abc')); // "abc"
        // 布尔值：true转为“true”，false转为“false”
        console.log(String(true)); // "true"
        // undefined：转为“undefined”
        console.log(String(undefined)); // "undefined"
        // null：转为“null”
        console.log(String(null)); // "null"
        // 先调用toString方法，如果toString方法返回的是原始类型的值，则对该值使用String方法;
        // 如果toString方法返回的是复合类型的值，再调用valueOf方法，如果valueOf方法返回的是原始类型的值，则对该值使用String方法
        var b = {
            b: 1,
            toString: function () {
                return {
                    b: 2,
                };
            },
            valueOf: function () {
                return 'b';
            },
        };
        console.log('b: ', String(b));  // "b: b"
      </script>
    ```

    2.3 显示类型转换Boolean()函数  
    > 原始类型转换
    >> Boolean(undefined) -> false  
    >> Boolean(0) -> false  
    >> Boolean(null) -> false  
    >> Boolean('') -> false  
    >> Boolean(NaN) -> false  
    ==Boolean('除了上面的五个，其它都为true')，如：Boolean({}) -> true; Boolean([]) -> true==
    
    2.4 隐式类型转换  
    四则运算、判断语句、Native调用（console.log()，alert()等）
    
    2.5 js进行加法运算  
    先来看一条在js里的隐式的rule，js在进行加法运算的时候， 
    - 会先推测两个操作数是不是number，如果是，则直接相加得出结果；   
    - 如果其中有一个操作数为string，则将另一个操作数隐式的转换为string，然后进行字符串拼接得出结果；   
    - 如果操作数为对象或者是数组这种复杂的数据类型，那么就将两个操作数都转换为字符串，进行拼接；   
    - 如果操作数是像boolean这种的简单数据类型，那么就将操作数转换为number相加得出结果。
    ```
    // 以下结果均在Chrome下输出
    {} + {} -> [object Object][object Object] (fireFox中为NaN)
    
    {} + [] -> 0
    
    [] + [] -> ""
    
    [] + {} -> [object Object]
    
    true + true -> 2
    
    1 + {a:1} -> 1[object Object]
    ```
    
    2.6 typeof、{}.toString、instanceof的区别
    - typeof适合基本类型及function检测，遇到null失效（输出为object）
    - 通过{}.toString（如：Object.prototype. .toString()）拿到，适合内置对象和基元类型，遇到null和undefined失效（IE678等返回[object Object]）
    - 适合自定义对象，也可以用来检测原生对象，在不同iframe和window间检测时失效

#### HTTP协议类
1. HTTP协议的主要特点：
- 简单快速：每个资源都是固定的URI
- 灵活：通过一个HTTP协议可以完成不同的数据类型的传输
- 无连接：连接一次就会断开，不会保持连接
- 无状态：客服端和服务端是两种身份，一次连接后就断开，下次再连接，服务端无法区分两次是否由同一客户端发起的请求

2. HTTP报文的组成部分（请求报文、响应报文）：
- 请求报文：请求行、请求头、空行、请求体
- 响应报文：状态行，响应头、空行、响应体  
`请求行包含：http方法 、页面地址、http协议以及版本`  
`请求头：key\value值 告诉服务端我要什么内容，要注意什么类型`        
`空行：遇到空行就能知道 不是请求头的部分`  
`请求体：空行是用来分隔请求头和请求体`

3. HTTP方法
- GET -> 获取资源
- POST -> 传输资源
- PUT -> 更新资源
- DELETE -> 删除资源
- HEAD -> 获取报文头部

4. GET和POST的区别  
- GET在浏览器回退时无害，POST会被重新请求
- GET的请求会被浏览器主动缓存，POST默认不会，可以手动设置
- GET的请求相对POST不安全，参数明文显示，不适合传送隐私数据
- GET参数通过URL传递，POST通过Request Body
- GET请求参数有字节限制，2kb，POST没有
- GET产生的URL地址可以被收藏，POST不可以
- GET请求只能进行url编码，POST支持多种编码方式
- GET请求参数会被完整保留在浏览器历史记录中，而POST中的参数不会被保留
- 对参数的数据类型，GET只接受ASCII字符，而POST没有限制

5. HTTP状态码
> 1xx: 指示信息-表示请求已接收，继续处理  

> 2xx: 成功-表示请求已被成功接收  
>> 200 ok: 客户端请求成功  
>> 206 Partial Content: 客户发送了带有Range(范围)头的GET请求，服务器完成了它

> 3xx: 重定向-要完成请求必须进行更进一步的操作    
>> 301: Moved Permanently: 所请求的页面已经转移至新的url  
>> 302: Found: 所请求的页面已经临时转移至新的url  
>> 304: Not Modified: 有缓存可用，无需再次请求

> 4xx: 客户端错误-请求有语法错误或请求无法实现  
>> 400: Bad Request: 客户端请求有语法错误，不能被服务器所理解    
>> 401: Unauthorized: 请求未经授权，这个状态码必须和WWWW-Authenticate报头域一起使用  
>> 403: Forbidden: 对被请求页面的访问被禁止  
>> 404: Not Found: 请求资源不存在

> 5xx: 服务器错误-服务器未能实现合法的请求
>> 500: Internal Server Error: 服务器发生不可预期的错误，原来缓冲的文档还可以继续使用  
>> 503: Server Unavailable: 请求未完成，服务器临时过载或宕机，一段时间后可能恢复正常

6. 持久连接和管线化  
`http协议是支持持久连接的（必须是http1.1版本），可以避免重新建立连接`    
- 持久连接：请求1 -》响应1-》请求2-》响应2-》请求3 -》响应3  
- 管线化：请求1-》请求2-》请求3-》响应1-》响应2-》响应3（把现在的请求一次打包传输过去，响应也是一次性返回过来，并且是在持久连接的情况下完成的）  
`注意：GET和HEAD请求支持管线化，POST有所限制`

#### 通信类
1. 同源策略及限制  
同源策略限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的关键的安全机制，限制：   
- Cookie、LocalStorage和IndexDB无法读取
- DOM无法获得
- Ajax请求不能发送

2. 前后端通信
- Ajax
- WebSocket
- CORS

```
// 原生实现Ajax
function success(text) {
    var textarea = document.getElementById('test-ie-response-text');
    textarea.value = text;
}

function fail(code) {
    var textarea = document.getElementById('test-ie-response-text');
    textarea.value = 'Error code: ' + code;
}

var request = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP'); // 对于低版本的IE，需要换一个ActiveXObject对象

request.onreadystatechange = function () { // 状态发生变化时，函数被回调
    if (request.readyState === 4) { // 成功完成
        // 判断响应结果:
        if (request.status === 200) {
            // 成功，通过responseText拿到响应的文本:
            return success(request.responseText);
        } else {
            // 失败，根据响应码判断失败原因:
            return fail(request.status);
        }
    } else {
        // HTTP请求还在继续...
    }
}

const URL = '/api/...';
// 发送请求:
request.open('GET', URL);
request.send();

alert('请求已发送，请等待响应...');
```

3. 如何创建Ajax
- XMLHttpRequest对象的工作流程
- 兼容性处理
- 事件的触发事件
- 事件的触发顺序

4. 跨域通信
- JSONP(优点：简单适用，老式浏览器全部支持，服务器改造小。不需要XMLHttpRequest或ActiveX的支持。缺点：只支持GET请求。
- Hash
- postMessage
- WebSocket(WebSocket是一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。)
- CORS(新出的通信标准，可以理解为支持跨域请求的Ajax)  
`CORS与JSONP的使用目的相同，但是比JSONP更强大`    
`JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据`

参考文档  
[前端跨域问题及解决方案](https://github.com/wengjq/Blog/issues/2)  
[浏览器同源政策及其规避方法--阮一峰](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)  
[跨域资源共享 CORS 详解--阮一峰](http://www.ruanyifeng.com/blog/2016/04/cors.html)

#### 对象
1. 创建对象  
- 字面量  
- new/原型链
- 对象创建-Object.create
```
var obj = Object.create({x:1});
obj.x; // 1;
typeof obj.toString;      // "function"
obj.hasOwnProperty("x");  // false，从原型链继承，不是对象本身的属性

var obj = Object.cerate(null);
typeof obj.toString  // undefined
```
- 属性标签
```
var person = {};
Object.defineProperty(person, 'name', {
    configurable: false,
    writable: false,
    enumerable: true,
    value: "Bosn Ma"
});

person.name;  // "Bosn Ma"
person.name = 1;
person.name;  // still "Bosn Ma"
delete person.name;  // false
```

#### 安全类
1. cross-site request forgery 跨站请求伪造  
    攻击原理：   
    在B网站引诱用户访问A网站（用户之前登陆过A网站，浏览器cookie缓存了身份验证信息），调用A网站的接口攻击A网站。
      
    防御措施：  
     - token验证：登陆成功后服务器下发token令牌存到用户本地，再次访问时要主动发送token，浏览器只能主动发cookie，做不到主动发token;  
     - referer验证：判断页面来源是否自己站点的页面，不是不执行请求;  
     - 隐藏令牌： 令牌放在http header头中，而不是链接中;  

2. xss 跨站脚本攻击  

    攻击原理：  
    
    XSS 攻击是指攻击者在网站上注入恶意的客户端代码，通过恶意脚本对客户端网页进行篡改，从而在用户浏览网页时，对用户浏览器进行控制或者获取用户隐私数据的一种攻击方式。  
    攻击者对客户端网页注入的恶意脚本一般包括 JavaScript，有时也会包含 HTML 和 Flash。有很多种方式进行 XSS 攻击，但它们的共同点为：将一些隐私数据像 cookie、session 发送给攻击者，将受害者重定向到一个由攻击者控制的网站，在受害者的机器上进行一些恶意操作  。
    XSS攻击可以分为3类：反射型（非持久型）、存储型（持久型）、基于DOM。
     
    防御措施： 
    - 编码：字符用转义字符显示。字符，十进制，转义字符  
    - 过滤：（1）移除用户上传的dom属性，如onerror等。（2）移除用户上传的style节点、script节点、iframe节点。  
    - 校正：（1）避免直接对html entity解码。（2）使用dom parse转换，校正不配对的dom标签。

#### 算法
1. [十大经典排序算法（动图演示）](https://www.cnblogs.com/onepixel/p/7674659.html#!comments)

## 零散
1. 严格模式--一种特殊的运行模式，它修复了部分语言上的不足，提供更强的错误检查，并增加安全性  
- 不允许使用with (SyntaxError)
- 不允许未声明的变量被赋值 （ReferenceError）
- arguments变为参数的静态副本
```
!functiton(a) {
    arguments[0] = 100;
    console.log(a);    // 100
}(1);

!function(a) {
    'use strict';
    arguments[0] = 100;
    console.log(a);    // 1
}(1);

!function(a) {
    'use strict';
    arguments[0].x = 100;
    console.log(a.x);  // 100
}({a: 1})
```
- delete参数、函数名报错
```
!function(a) {
    console.log(delete a);
}(1);   // false

!functioin(a) {
    'use strict';
    delete a;
}(1);   // SyntaxError
```
- 对象字面量重复属性名报错
```
!function() {
    var obj = {x:1, x:2};
    console.log(obj.x);
}()  // 2

!function() {
    'use strict';
    var obj = {x:1, x:2};
}();  // SyntaxError
```
- 禁止八进制字面量
```
!function() {
    console.log(0123);
}() // 83

!function() {
    'use strict';
    console.log(0123);
}() // SyntaxError
```
- eval, arguments变为关键字，不能作为变量、函数名（SyntaxError）
- eval变为独立作用域

2. 有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣：Object.prototype.toString.call()、instanceof、Array.isArray()
- Object.prototype.toString.call()：每一个继承 Object 的对象都有 toString 方法，如果 toString 方法没有重写的话，会返回 [Object type]，其中 type 为对象的类型。但当除了 Object 类型的对象外，其他类型直接使用 toString 方法时，会直接返回都是内容的字符串，所以我们需要使用call或者apply方法来改变toString方法的执行上下文。==常用于判断浏览器内置对象==

- instanceof 的内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。
使用 instanceof判断一个对象是否为数组，instanceof 会判断这个对象的原型链上是否会找到对应的 Array 的原型，找到返回 true，否则返回 false。但 instanceof
只能用来判断对象类型，原始类型不可以。并且所有对象类型 instanceof Object 都是 true。

- Array.isArray()：用来判断对象是否为数组。Array.isArray()是ES5新增的方法，当不存在 Array.isArray() ，可以用 Object.prototype.toString.call() 实现。
```
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```

3. 介绍下重绘和回流（Repaint & Reflow）
    - 重绘   
    由于节点的几何属性发生改变或者由于样式发生改变而不会影响布局的，称为重绘，例如outline, visibility, color、background-color等，重绘的代价是高昂的，因为浏览器必须验证DOM树上其他节点元素的可见性。
    - 回流  
    布局或者几何属性需要改变就称为回流。回流是影响浏览器性能的关键因素，因为其变化涉及到部分页面（或是整个页面）的布局更新。一个元素的回流可能会导致了其所有子元素以及DOM中紧随其后的节点、祖先节点元素的随后的回流。  
    `回流必定会发生重绘，重绘不一定会引发回流`

参考资料  
[【半月刊 2】前端高频面试题及答案汇总--木易杨说](https://juejin.im/post/5c7bd72ef265da2de80f7f17#heading-1)

4. requestAnimationFrame  
[requestAnimationFrame 知多少？](https://www.cnblogs.com/onepixel/p/7078617.html)

5. 渲染机制  
- 当用户输入一个URL，浏览器就会发送一个请求，请求URL对应的资源  
- HTML解析器会将这个文件解析，构建成一棵DOM树  
- 构建DOM树时，遇到JS和CSS元素，HTML解析器就将控制权转让给JS或者CSS解析器  
- JS或者CSS解析器解析完这个元素时候，HTML又继续解析下个元素，直到整棵DOM树构建完成  
- DOM树构建完之后，浏览器把DOM树中的一些不可视元素去掉，然后与CSSOM合成一棵render树  
- 接着浏览器根据这棵render树，计算出各个节点(元素)在屏幕的位置。这个过程叫做layout，输出的是一棵layout树  
- 最后浏览器根据这棵layout树，将页面渲染到屏幕上去  
