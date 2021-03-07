var data = []

for (var i = 0; i < 3; i++) {
  data[i] = function() {
    console.log(i)
  }
}

// data[0]() 3
// data[1]() 3
// data[2]() 3

var data2 = []

for (var j = 0; j < 3; j++) {
  data2[j] = (function(j) {
    return function() {
      console.log(j)
    }
  })(j)
}

for (var k = 0; k < 3; k++) {
  (data[k] = function() {
    console.log(arguments.callee.i)
  }).i = i;
}

data2[0]() // 0
data2[1]() // 1
data2[2]() // 2
