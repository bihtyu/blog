const getEtag = require('./qetag.js')
var fs = require('fs')

fs.readFile('test.html', function(err, buf) {
  getEtag(buf, function(v) {
    console.log(v)
  })
})