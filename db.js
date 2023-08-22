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
  host: 'containers-us-west-112.railway.app',
  password: 'hoBEYu8Upw7BatYmxfAr',
  port: 7699,
  user: 'postgres',
})
module.exports = pool
