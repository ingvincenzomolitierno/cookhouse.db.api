"user strict";
var pool = require("../../config/db.config");

//Option object create
var Option = function (option) {
  this.pk = option._pk;
  this.code = option._code;
  this.denominazione = option.denominazione;
  this.descrizione = option.descrizione;
};

Option.findAllVersioniPortate = async function (result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows,fields] = await conn.query("SELECT * FROM portate_versione_anagrafica");
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
};

Option.findAllTipoPortate = async function (result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows,fields] = await conn.query("SELECT * FROM portate_tipo_anagrafica");
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
};

// Option.create = async function (newItem, result) {
//   let conn;

//   conn = await pool.getConnection();

//   let queryString =
//     "INSERT INTO distinte_base_anagrafica (" +
//     "distinta_base_code, " +
//     "portata_fk," + 
//     "denominazione ) VALUES (" +
//     "'" +
//     newItem.distinta_base_code +
//     "', " +
//     "'" +
//     newItem.portata_fk +
//     "', " +
//     newItem.denominazione +
//     ")";

//   conn.query(queryString)
//     .then(
//       (value) => {
//         let valore = JSON.parse(JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v));
//         result(null, valore);
//       },
//       (reason) => {
//         result(reason, null);
//       }
//     )
//     .catch((reason) => {
//       result(reason, null);
//     })
//     .finally(() => {
//       if (conn) return conn.release();
//     });
// };

// Option.findById = async function (id, result) {
//   console.log("id", id);
//   console.log("result", result);
//   let conn;
//   try {
//     conn = await pool.getConnection();
//     const [rows,fields] = await conn.query(
//       "SELECT * FROM materie_prime_anagrafica WHERE id = ? ",
//       id
//     );
//     result(null, rows);
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) return conn.release();
//   }
// };

// Option.update = async function (id, item, result) {
//   let conn;
//   conn = await pool.getConnection();
//   conn.query(
//       "UPDATE distinte_base_anagrafica SET " +
//       "distinta_base_code=?, portata_fk=?, denominazione=? " +
//       "WHERE distinta_base_pk=?",
//       [item.distinta_base_code, item.portata_fk,item.denominazione,id]
//     )
//     .then(
//       (value) => {
//         let valore = JSON.parse(JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v));
//         result(null, valore);
//       },
//       (reason) => {
//         result(reason, null);
//       }
//     )
//     .catch((reason) => {
//       result(reason, null);
//     })
//     .finally(() => {
//       if (conn) return conn.release();
//     });
// };

// Option.delete = async function (id, result) {
//   let conn;

//   conn = await pool.getConnection();
//   conn
//     .query("DELETE FROM distinte_base_anagrafica WHERE distinta_base_pk =" + id)
//     .then((value) => {
//       result(null, value);
//     })
//     .catch((err) => {
//       result(null, err);
//     })
//     .finally(() => {
//       if (conn) return conn.release();
//     });
// };

module.exports = Option;
