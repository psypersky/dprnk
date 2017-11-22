const { getAssert } = require('../lib/util')

module.exports = {
  isDeveloping: getAssert(process.env.NODE_ENV) === 'development',
  hypernovaPort: getAssert(process.env.HYPERNOVA_PORT),
  serverPort: getAssert(process.env.SERVER_PORT),
  logLevel: getAssert(process.env.LOG_LEVEL),
}
