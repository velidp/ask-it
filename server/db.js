const Pool = require('pg').Pool;

const pool = new Pool({
    connectionString: '',
    ssl: {
      rejectUnauthorized: false
    }
  });

module.exports = pool;
