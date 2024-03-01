const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "Ing@2023",
  connectionLimit: 5,
  database: 'conigliodoro'
});

module.exports = pool;
