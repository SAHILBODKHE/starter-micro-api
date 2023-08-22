const { Pool } = require('pg')
// const pool = new Pool({

//   user: 'postgres',
//   password: 'Sahil@264',
//   host: 'localhost',
//   port: 5432,
//   database: 'orgtrans',
// })
const pool = new Pool({
  database: 'railway',
  host: 'containers-us-west-142.railway.app',
  password: '3rfELoMJ7hSuijNYTULG',
  port: 6369,
  user: 'postgres',
})
module.exports = pool
