// const mariadb = require("mariadb");

// const pool = mariadb.createPool({
//   host: "localhost",
//   user: "root",
//   password: "Ing@2023",
//   connectionLimit: 5,
//   database: 'conigliodoro'
// });

// ############################

var fs = require('fs');
var mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: "conogliodoro-db-server.mysql.database.azure.com",
  user: "dadmin",
  password: "Vinc@1977",
  connectionLimit: 5,
  database: 'conigliodoro',
  port: 3306,
  ssl  : {
    ca : fs.readFileSync('./config/DigiCertGlobalRootCA.crt.pem'),
    rejectUnauthorized: true
  }
});

module.exports = pool;

