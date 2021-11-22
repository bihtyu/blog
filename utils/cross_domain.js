// 1. JSONP（需后端配合）
const jsonp = (url, params, callback) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')

    window[callback] = data => {
      resolve(data)
      document.body.removeChild(script)
    }

    params = { ...params, callback }
    const arr = Object.keys(params).map(key => `${key}=${params[key]}`)
    script.src = `${url}?${arr.join('&')}`

    document.body.appendChild(script)
  })
}

// jsonp(url, params, callback).then(data => {
//   console.log(data)
// })

// 2. WebSocket

// 3. Cors(Cross-Origin Resource Sharing - 跨域资源共享)
// - Access-Control-Allow-Origin: 对应域名

// 4. Node.js 接口代理

// 5. postMessage

// 6. document.domain && iframe

// 参考链接：https://mp.weixin.qq.com/s/OKDKf2bg61zyqx94z7CdTg