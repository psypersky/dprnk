const axios = require('axios')
const logger = require('./logger')
const { render: renderConfig } = require('../config')

/**
 * Calls the render server with a given state and returns the result
 **/
module.exports = async function render({ state = {}, ctx }) {
  let renderRes
  try {
    renderRes = await axios.post(
      `http://${renderConfig.host}:${renderConfig.port}/render`,
      { state }
    )
  } catch (e) {
    logger.error(
      '[Error - render.js] error calling render server',
      e.message,
      e.stack
    )
    throw e
  }

  return renderRes
}
