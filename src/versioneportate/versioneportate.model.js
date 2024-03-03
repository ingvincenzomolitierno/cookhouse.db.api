"user strict";
var pool = require("../../config/db.config");

//VersionePortate object create
var VersionePortate = function (versioneportata) {
  this.portata_versione_pk = versioneportata.portata_versione_pk;
  this.portata_versione_code = versioneportata.portata_versione_code;
  this.denominazione = versioneportata.denominazione;
  this.descrizione = versioneportata.descrizione;
};

let sqlFindAll = "SELECT * FROM portate_versione_anagrafica ";

VersionePortate.findAll = async function (result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows,fields] = await conn.query(sqlFindAll);
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
};

// VersionePortate.findById = async function (id, result) {
//   let conn;
//   try {
//     conn = await pool.getConnection();
//     const [rows,fields] = await conn.query(sqlFindAll + " WHERE portate_tipo_anagrafica.portata_pk = ? ", id);
//     result(null, rows);
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) return conn.release();
//   }
// };

// VersionePortate.create = async function (newItem, result) {
//   let conn;

//   conn = await pool.getConnection();

//   console.log('newItem',newItem);

//   let queryString =
//     "INSERT INTO portate_anagrafica (" +
//     "portata_code, " +
//     "denominazione, " +
//     "descrizione, " +
//     "alias, " +
//     "tipo_portata_fk, " +
//     "versione_portata_fk) VALUES ('" +
//     newItem.portata_code +
//     "', '" +
//     newItem.denominazione +
//     "', '" +
//     (newItem.descrizione == null ? "" : newItem.descrizione) +
//     "', '" +
//     (newItem.alias == null ? "" : newItem.alias) +
//     "', " +
//     newItem.tipo_portata_fk +
//     ", " +
//     newItem.versione_portata_fk +
//     ")";

//     console.log('query', queryString);

//   conn
//     .query(queryString)
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

// VersionePortate.update = async function (id, item, result) {
//   let conn;
//   conn = await pool.getConnection();
//   conn.query(
//       "UPDATE portate_anagrafica SET "+
//       "portata_code=?, denominazione=? "+
//       ", descrizione=?, alias=?, tipo_portata_fk=?, "+
//       " versione_portata_fk=? WHERE portata_pk=?",
//       [item.portata_code, item.denominazione,
//         item.descrizione, item.alias, item.tipo_portata_fk,
//         item.versione_portata_fk,id]
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

// VersionePortate.delete = async function (id, result) {
//   let conn;

//   conn = await pool.getConnection();
//   conn
//     .query("DELETE FROM portate_anagrafica WHERE portata_pk =" + id)
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

module.exports = VersionePortate;