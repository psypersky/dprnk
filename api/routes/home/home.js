const homeQueries = require('../../queries/home')
const logger = require('../../lib/logger')
const render = require('../../lib/render')

module.exports = async ctx => {
  logger.info('/ route called')
  // const {data: testString} = await homeQueries.getTestString()

  const state = {
    testData: 'This is some state string :)',
  }

  // TODO: handle errors
  logger.debug('[home.js] calling render');
  const renderRes = await render({ state, ctx })
  logger.debug('[home.js] render response', renderRes)

  ctx.response.type = 'html'
  ctx.response.body = renderRes.data.html
}
