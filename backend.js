const express = require('express')
const bodyParser = require('body-parser')

const { fullUrl } = require('./utils')

const app = express()
const port = 9000

app.use(bodyParser.json({ type: '*/*' }))

const rand = () => Math.floor(Math.random() * (2000 - 200)) + 200

app.use((req, res) => {
  const delay = rand()

  setTimeout(() => {
    res.send('Hello there =D')

    console.log(`${req.method}: ${fullUrl(req)} (delay: ${delay}ms)`)
  }, delay)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
