const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const mount = require('koa-mount')
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const convert = require('koa-convert')
const webpack = require('webpack')
const webpackMiddleware = require('koa-webpack-dev-middleware')
const logger = require('./lib/logger')
const render = require('./render')
const config = require('../config')

console.log('Starting sfb-web-app 🔥😎🔥 ...')

const app = new Koa()
const router = new Router()

// Serve compiled javascript client file on development
if (config.isDeveloping) {
  // Create webpack compiler for the client APP
  const webpackConfig = require('../webpack_config/dev')
  // console.log('webpackConfig', webpackConfig)
  const compiler = webpack(webpackConfig)
  // console.log('compiler', compiler)
  // Wrap the compiler in a a middleware that listen for changes and recompile
  // delays requests until compiled
  const middleware = webpackMiddleware(compiler, {
    publicPath: '/',
    // stats: {
    //   colors: true, // TODO: what is this exactly?
    // },
  })
  app.use(middleware)
}

// Serve production files
if (!config.isDeveloping) {
  app.use(mount('/', serve(path.resolve(__dirname, '../build'))))
}

// Serve public static files
app.use(mount('/public', serve(path.resolve(__dirname, '../public'))))

// Body parser
app.use(bodyParser())

// Render
router.post('/render', render)

// Server app router
app.use(router.routes()).use(router.allowedMethods())

app.listen(config.serverPort, '0.0.0.0', err => {
  if (err) {
    console.log(err)
  }
  console.info(
    '==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.',
    config.serverPort,
    config.serverPort
  )
})
