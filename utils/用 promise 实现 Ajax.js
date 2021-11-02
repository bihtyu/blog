const getJSON = function(url) {
  return new Promise((resolved, reject) => {
    const handler = function() {
      if (this.readyState !== 4) return
      if (this.status === 200) {
        resolved(this.response)
      } else {
        reject(this.statusText)
      }
    }
    const client = new XMLHttpRequest()
    client.open('GET', url)
    client.onreadystatechange = handler
    client.responseType = 'json'
    client.setRequestHeader('Accept', 'application/json')
    client.send()
  })
}

getJSON('xx.com/...').then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})