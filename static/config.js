var config = {
  // httpBaseUrl: 'http://129.28.45.106:8087',
  httpBaseUrl: 'http://139.155.34.118:8087'
}

function a () {
  return function b () {
    console.log(c)
    var c = 's'
  }
}
a()
