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
  host: 'containers-us-west-186.railway.app',
  password: 'ufdrMiV4osmJkS5Md3Yc',
  port: 6928,
  user: 'postgres',
})
module.exports = pool
