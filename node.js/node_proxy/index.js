// const http = require('http')

// const app = http.createServer()

// const proxyConf = {
//   hostname: 'xxx.com',
//   port: 80,
// }

// const proxyHTTPRequest = (req, res) => {
//   const hostname = proxyConf.hostname + req.url.split('/api/')[1]
//   const proxyReq = http.request(
//     {
//       hostname,
//       port: proxyConf.port,
//       path: req.url,
//       method: req.method,
//       headers: req.headers,
//     },
//     (proxyRes) => {
//       let data = ''
//       proxyRes.on('data', (chunk) => {
//         data += chunk
//       })
//       proxyRes.on('end', () => {
//         res.writeHead(200, {
//           // 这里需要动态获取响应内容类型，由于主要为了实现反向代理，所以这里就没有搞了
//           'Content-Type': 'application/json;charset=utf8',
//           'Access-Control-Allow-Origin': '*',
//         })
//         res.end(data)
//       })
//     }
//   )
//   proxyReq.on('error', function (err) {
//     console.log('proxy request err:', err.message)
//   })
//   return proxyReq
// }

// app.on('request', (req, res) => {
//   if (req.method == 'GET') {
//     proxyHTTPRequest(req, res).end()
//   } else if (req.method == 'POST') {
//     let data = ''
//     req.on('data', (chunk) => {
//       data += chunk
//     })
//     req.on('end', () => {
//       const proxyReq = proxyHTTPRequest(req, res)
//       proxyReq.write(data)
//       proxyReq.end()
//     })
//   }
// })

// app.listen(8080)
// console.log(
//   `http listening at http://localhost:8080 proxy to http://${proxyConf.hostname}:${proxyConf.port}`
// )


var express = require('express')
var { createProxyMiddleware } = require('http-proxy-middleware')
var app = express()

app.use('/', createProxyMiddleware({
  target: 'https://www.jd.com/',
  changeOrigin: true
}))

app.listen(3000)
