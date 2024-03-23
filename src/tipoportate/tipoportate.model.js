"user strict";
var pool = require("../../config/db.config");

//TipoPortata object create
var TipoPortata = function (tipoportata) {
  this.portata_tipo_pk = tipoportata.portata_tipo_pk;
  this.portata_tipo_code = tipoportata.portata_tipo_code;
  this.denominazione = tipoportata.denominazione;
  this.descrizione = tipoportata.descrizione;
  this.ordinale = tipoportata.ordinale;
};

let sqlFindAll = "SELECT * FROM portate_tipo_anagrafica ";

TipoPortata.findAll = async function (result) {
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

// TipoPortata.findById = async function (id, result) {
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

// TipoPortata.create = async function (newItem, result) {
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

// TipoPortata.update = async function (id, item, result) {
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

// TipoPortata.delete = async function (id, result) {
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

module.exports = TipoPortata;