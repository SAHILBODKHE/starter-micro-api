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
  host: 'containers-us-west-133.railway.app',
  password: 'LAXIVzON8VXNL9ChDeH2',
  port: 7694,
  user: 'postgres',
})
module.exports = pool
