#### 1. npm install 报错： npm ERR! Unexpected end of JSON input while parsing near '...^1.1.3","conventional'
![image](https://github.com/bihtyu/Blog/blob/master/images/npm%20install%20error.png)
解决方法：
npm cache clean --force  清除cache，然后 npm install  
参考链接： [Installing ERROR | Unexpected end of JSON input while parsing near ' ](https://github.com/npm/npm/issues/19072)
