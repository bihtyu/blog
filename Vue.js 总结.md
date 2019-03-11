####  Axios跨域设置

1. 在index.js中设置proxyTable

![images](https://github.com/bihtyu/Blog/blob/master/images/axios%E8%B7%A8%E5%9F%9F_01.png)
```
proxyTable: {
      '/api': {
        target: "https://baobab.kaiyanapp.com",
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
```

2. main.js 添加配置
![images](https://github.com/bihtyu/Blog/blob/master/images/axios%E8%B7%A8%E5%9F%9F_02.png)
```
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json'
```

3. 调用接口时省略api前缀
```
// axios.post('https://baobab.kaiyanapp.com/api/v2/feed')
      //   .then(this.getHomeListSucc)
axios.post('/api/v2/feed')
  .then(this.getHomeListSucc)
```
