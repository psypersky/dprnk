const Koa = require('koa')
const Router = require('koa-router')
const dbClient = require('./lib/db-pool-client')
const pingRoutes = require('./routes/ping')
const homeRoutes = require('./routes/home')
const config = require('./config')
const logger = require('./lib/logger')
const forwardGet = require('./lib/forwardHttp')

console.log('Starting sfb-api 🔥😎🔥 ...')

dbClient.connect(config.db)

const app = new Koa()
const router = new Router()

app.use(async function catchUncaughtErrors(ctx, next) {
  try {
    await next()
  } catch (e) {
    logger.error('[ERROR - server.js]: got bubbled error ', e.message, e.stack)
    ctx.response.status = 500
    ctx.response.body = 'INTERNAL_ERROR'
    return
  }
})

// Test ping route
router.get('/ping', pingRoutes.ping)

// API routes
router.get('/', homeRoutes.home)

// Redirect the rest of the GET calls to the render server (serve static files)
// V2: This will be handled by an http server in front of the API
router.get(
  '/*',
  forwardGet({ baseUrl: `http://${config.render.host}:${config.render.port}` })
)

app.use(router.routes()).use(router.allowedMethods())

app.listen(config.api.port, '0.0.0.0', err => {
  if (err) {
    console.log(err)
  }
  console.info(
    '==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.',
    config.api.port,
    config.api.port
  )
})
