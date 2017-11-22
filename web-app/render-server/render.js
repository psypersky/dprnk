const path = require('path')
const _ = require('lodash')
const Renderer = require('hypernova-client')
const logger = require('./lib/logger')
const htmlTemplate = require('./html')
const config = require('../config')
const initialState = require('../src/initialState')

// Hypernova node client
logger.debug('creating hypernova client')
const renderer = new Renderer({
  url: `http://localhost:${config.hypernovaPort}/batch`,
  // plugins: [
  //   devModePlugin,
  // ],
})

// '/render' route
module.exports = async function render(ctx) {
  const newState = ctx.request.body.state // TODO: Validate this shit

  const state = _.merge(initialState, newState)

  const jobs = {
    App: { name: 'app', data: state }
  }

  let reactHtml
  try {
    logger.debug('[render.js] sending render to hypernova', state)
    reactHtml = await renderer.render(jobs)
  } catch (e) {
    logger.error('[Error] rendering using renderer')
    logger.error(e.message, e.stack)
    throw e
  }

  logger.debug('[render.js] reactHMTL:', reactHtml)

  const htmlText = htmlTemplate({
    production: !config.isDeveloping,
    body: reactHtml,
  })

  ctx.response.body = { html: htmlText }
}
