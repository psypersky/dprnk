const dbClient = require('../lib/db-pool-client')

function getTestString() {
  return dbClient.db.one(
    `
    SELECT * from test_data where id = 1
    `
  )
}

module.exports = { getTestString }
