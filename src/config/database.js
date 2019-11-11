// require("dotenv").config();
// change src/database/postgres.js to use
module.exports = {
  dialect: "postgres",
  host: process.env.DATABASE_URL,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  define: {
    timestamps: true,
    underscored: true
  },
  production: {
    use_env_variable: "DATABASE_URL"
  }
};
