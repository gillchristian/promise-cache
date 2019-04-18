// FP helpers

const replace = (what) => (rplz) => (s) => s.replace(what, rplz)

const compose = (f, g) => (x) => f(g(x))

// express helpers

const fullUrl = (req) =>
  `${req.protocol}://${req.get('host')}${req.originalUrl}`

const getHeaders = (res) =>
  [...res.headers.entries()].reduce((acc, [key, value]) => {
    acc[key] = value
    return acc
  }, {})

const replacePort = replace('3000')('9000')

const updatedUrl = compose(
  replacePort,
  fullUrl,
)

const updateHeaders = (req) => ({
  ...req.headers,
  host: replacePort(req.headers.host),
})

const forwardedConf = (req) =>
  ['GET', 'HEAD'].includes(req.method)
    ? {
        headers: updateHeaders(req),
        method: req.method,
      }
    : {
        headers: updateHeaders(req),
        method: req.method,
        body: req.body,
      }

module.exports = {
  replace,
  compose,
  fullUrl,
  getHeaders,
  replacePort,
  updatedUrl,
  forwardedConf,
}
