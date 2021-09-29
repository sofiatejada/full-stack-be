import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.HEROKU_POSTGRESQL_WHITE_URL,
  ssl: process.env.PGSSLMODE && { rejectUnauthorized: false },
});

pool.on('connect', () => console.log('Postgres connected'));

export default pool;
