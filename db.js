const { Pool } = require('pg')
// const pool = new Pool({

//   user: 'postgres',
//   password: 'Sahil@264',
//   host: 'localhost',
//   port: 5432,
//   database: 'orgtrans',
// })
const pool = new Pool({
  database: 'postgres',
  host: 'database-1.couyblghllc8.us-east-1.rds.amazonaws.com',
  password: 'britishtyphoon',
  port: 5432,
  user: 'postgres',
})
module.exports = pool
