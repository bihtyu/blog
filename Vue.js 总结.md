####  Axios跨域设置
在访问某些api时经常会报下面的错误
![images](https://github.com/bihtyu/Blog/blob/master/images/axios%20error.png)
example.com 访问 searve.com，由于不同源（域名、端口或协议不同），使用以下配置可以解决
1. 在 index.js 中设置 proxyTable，配置代理

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

2. main.js 添加BaseUrl
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
4. 重启服务
