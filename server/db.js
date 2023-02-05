const Pool = require('pg').Pool;

const pool = new Pool({

      user: 'velidp',
      host: 'ep-broad-forest-934451.eu-central-1.aws.neon.tech',
      database: 'neondb',
      password: 'pfWlLxkZ6G0e',
      

    connectionString: 'postgres://velidp:pfWlLxkZ6G0e@ep-broad-forest-934451.eu-central-1.aws.neon.tech/neondb',
    ssl: {
      rejectUnauthorized: false
    }
  });

module.exports = pool;
