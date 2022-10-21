const Pool = require('pg').Pool;

const pool = new Pool({
    connectionString: 'postgres://iedyfpbtnkknsi:97864558f906a16235feae81f99a52e125d8fe49a2b187ac968697c70f6bccb6@ec2-52-209-171-51.eu-west-1.compute.amazonaws.com:5432/d8p40kt94gbbka',
    ssl: {
      rejectUnauthorized: false
    }
  });

module.exports = pool;