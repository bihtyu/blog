#### 1. npm install 报错： npm ERR! Unexpected end of JSON input while parsing near '...^1.1.3","conventional' (2019.06.10)
![image](https://github.com/bihtyu/Blog/blob/master/images/npm%20install%20error.png)
解决方法：
npm cache clean --force  清除cache，然后 npm install  
参考链接： [Installing ERROR | Unexpected end of JSON input while parsing near ' ](https://github.com/npm/npm/issues/19072)

#### 2. $forceUpdata 强制更新数据 (2019.06.13)
在使用[element UI](https://element.eleme.cn/#/zh-CN/component/installation) Select 选择器时，v-model绑定的数据改变，并且操作select后，视图没有实时更新。也试过更新数据使用 vm.$set(obj, attr, value)，但没有达到预期效果。  
解决方法：添加 @visible-change="$forceUpdate()"
```
<el-select
    @visible-change="$forceUpdate()"
    v-model=""
    placeholder="">
  <el-option v-for="(item, index) in data" :label="item.name" :value="item.id" :key="index"></el-option>
</el-select>
```
