// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'customer_db',
  password: 'David@123',
  port: 5433,
});

module.exports = pool;
