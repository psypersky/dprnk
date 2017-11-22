const dbClient = require('../lib/db-pool-client')

function getDatabaseTime() {
  return dbClient.db.one(
    `
    SELECT NOW()
    `
  )
}

module.exports = { getDatabaseTime }
