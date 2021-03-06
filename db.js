const Pool = require("pg").Pool;
// require("dotenv").config();

// const pool = new Pool({
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   port: process.env.PG_PORT,
// });
// const pool = new Pool({
//   user: "postgres",
//   password: "1990",
//   host: "localhost",
//   port: 5432,
//   database: "perntodo",
// });

// const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

// const proConfig = {
//   connectionString: process.env.DATABASE_URL, //heroku addons
// };

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, //heroku addons
  ssl: {
    rejectUnauthorized: false,
  },
});
// const pool = new Pool({
//   connectionString:
//     process.env.NODE_ENV === "production" ? proConfig : devConfig,
// });

module.exports = pool;
