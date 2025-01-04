/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: "pg",
    connection: {
      host: "ep-morning-wave-a59lq455.us-east-2.aws.neon.tech", 
      user: "jobportal_db_owner",
      password: "6DFql5CfmGOL", 
      database: "jobportal_db", 
      ssl: { rejectUnauthorized: false }, 
    },
    pool: {
      min: 2, 
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
