####  1. npm install 报错： npm ERR! Unexpected end of JSON input while parsing near '...^1.1.3","conventional' (2019.06.10)
![image](https://github.com/bihtyu/Blog/blob/master/images/npm%20install%20error.png)
解决方法：
npm cache clean --force  清除cache，然后 npm install  
参考链接： [Installing ERROR | Unexpected end of JSON input while parsing near ' ](https://github.com/npm/npm/issues/19072)

####  2. $forceUpdata 强制更新数据 (2019.06.13)
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

####  3. v-if 引起的 u.$scopedSlots.default is not a function (2019.06.13)
使用 v-if 和 v-else 时，vue.js 为了提高性能，不会重复绘制已有的组件，从而导致报错，如下图：
![image](https://github.com/bihtyu/Blog/blob/master/images/u.%24scopedSlots.default%20is%20not%20a%20function.png)  
解决方法：  
+ 使用 v-show  
+ 添加 key，强制重新渲染
```
<el-table-column
      v-if="isMultiple"
      key="multipleSelect"
      type="selection">
</el-table-column>
<el-table-column
      v-else
      label="操作"
      key="radioSelect"
      width="80">
    <template slot-scope="scope">
      <el-checkbox
              @change="handleRadioChange($event, scope.row)"
              v-model="radioArr[scope.row.id]">
      </el-checkbox>
    </template>
</el-table-column>
```

####  4. 解决 elementUI 的 table 抖动 bug（chrome 75 下出现）(2019.07.05)
重现：![image](https://github.com/bihtyu/Blog/blob/master/images/table_shaking.gif)

解决方法：  
1.强制宽度：el-table 加 width:99.9% ! important; 但不保证会不会影响其它内容

2.使用 el-scrollbar 包裹内容，并添加相应样式（推荐）  
第一步：修改 layout 结构
```
<el-main style="overflow: hidden">
    <el-scrollbar style="width:100%;height:100%;overflow:hidden;">
      <!--主要内容-->
    </el-scrollbar>
</el-main>
```

第二步：添加 el-scrollbar 后，页面底部也会出现滚动条，重写相关样式
```
.el-scrollbar .el-scrollbar__wrap {
  overflow: auto;
}
```
该 bug 感谢 [wxhccc](https://github.com/wxhccc) 提供思路
