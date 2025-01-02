/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "ep-bitter-frog-a57ugcmi.us-east-2.aws.neon.tech", 
      user: "jobportaldb_owner",
      password: "J4njD3bWwBPz", 
      database: "jobportaldb", 
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
