const fetch = require('node-fetch')

const f = () => fetch('http://localhost:3000')
  .then(r => r.text())
  .then(v => console.log(v))

f()
f()
f()
f()
f()
f()
