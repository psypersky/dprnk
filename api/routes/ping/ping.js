const pingQueries = require('../../queries/ping')
const logger = require('../../lib/logger')

module.exports = async ctx => {
  logger.info('/ping route called')
  const {now: dbTime} = await pingQueries.getDatabaseTime()
  const serverTime = Date.now()

  ctx.body = `dbTime=${dbTime}, serverTime=${serverTime}`
}
