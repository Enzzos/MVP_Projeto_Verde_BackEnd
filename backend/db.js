const { Pool } = require('pg');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

module.exports = pool;
