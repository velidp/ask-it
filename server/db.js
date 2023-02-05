const Pool = require('pg').Pool;

const pool = new Pool({

      user: 'ask_it_user',
      host: 'dpg-cffommo2i3mg6p9f3r70-a',
      database: 'ask_it',
      password: 'FtS5tsFxL64wi2uZGxAVfgd5lxPN1jMM',
      

    connectionString: 'postgres://ask_it_user:FtS5tsFxL64wi2uZGxAVfgd5lxPN1jMM@dpg-cffommo2i3mg6p9f3r70-a.oregon-postgres.render.com/ask_it',
    ssl: {
      rejectUnauthorized: false
    }
  });

module.exports = pool;
