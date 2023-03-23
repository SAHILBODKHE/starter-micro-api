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
  host: 'containers-us-west-205.railway.app',
  password: 'a8Xn84eDbGVs8KlNXQQ6',
  port: 6055,
  user: 'postgres',
})
module.exports = pool
