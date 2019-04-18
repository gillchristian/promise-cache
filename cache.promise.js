const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

const { fullUrl, updatedUrl, getHeaders, forwardedConf } = require('./utils')

const app = express()
const port = 3000

app.use(bodyParser.raw({ type: '*/*' }))

const cache = {}

app.use((req, res) => {
  const url = updatedUrl(req)

  if (cache[url]) {
    cache[url].then(({ headers, status, body }) => {
      res.set(headers)
      res.status(status)
      res.send(body)

      console.log(`${req.method}: ${fullUrl(req)} [cached]`)
    })

    return
  }

  const toCache = Promise.resolve()
    .then(() => fetch(url, forwardedConf(req)))
    .then((r) => {
      const headers = getHeaders(r)
      const status = r.status

      return Promise.all([url, headers, status, r.text()])
    })
    .then(([url, headers, status, body]) => ({ headers, status, body }))

  cache[url] = toCache

  toCache.then(({ headers, status, body }) => {
    res.set(headers)
    res.status(status)
    res.send(body)

    console.log(`${req.method}: ${fullUrl(req)}`)
  })

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
