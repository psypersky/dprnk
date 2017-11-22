const { getAssert } = require('../lib/util')

module.exports = {
  port: getAssert(process.env.RENDER_PORT),
  host: getAssert(process.env.RENDER_HOST),
}
