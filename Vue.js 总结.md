### Axios跨域设置
1. main.js 添加配置
```
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json'
```
2. 在index.js中设置proxyTable
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

3. 调用接口时省略api前缀
```
// axios.post('https://baobab.kaiyanapp.com/api/v2/feed')
      //   .then(this.getHomeListSucc)
axios.post('/api/v2/feed')
  .then(this.getHomeListSucc)
```
