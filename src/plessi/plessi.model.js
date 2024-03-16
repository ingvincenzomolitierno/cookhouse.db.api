"user strict";
var pool = require("../../config/db.config");

//Plessi object create
var Plessi = function (plessi) {
  this.plesso_pk = plessi.plesso_pk;
  this.denominazione = plessi.denominazione;
  this.codice = plessi.codice;
  this.scuola_fk = plessi.scuola_fk;
};

let sqlFindAll = "SELECT " +
"plessi_anagrafica.plesso_pk, " +
"plessi_anagrafica.denominazione AS plesso_denominazione, " +
"plessi_anagrafica.codice AS plesso_codice, " +
"scuole_anagrafica.scuola_pk, " +
"scuole_anagrafica.denominazione AS scuola_denominazione, " +
"scuole_anagrafica.codice AS scuola_codice, " +
"clienti_anagrafica.cliente_pk, " +
"clienti_anagrafica.denominazione AS cliente_denominazione, " +
"clienti_anagrafica.codice AS cliente_codice " +
"FROM plessi_anagrafica " +
"LEFT JOIN scuole_anagrafica ON plessi_anagrafica.scuola_fk = scuole_anagrafica.scuola_pk " +
"LEFT JOIN clienti_anagrafica ON scuole_anagrafica.cliente_fk = clienti_anagrafica.cliente_pk ";

Plessi.findAll = async function (result) {
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

Plessi.findById = async function (id, result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows,fields] = await conn.query(sqlFindAll + " WHERE plessi_anagrafica.plesso_pk = " + id);
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
};

// Plessi.findByOrdineId = async function (id, result) {
//   let conn;
//   try {
//     conn = await pool.getConnection();
//     const [rows,fields] = await conn.query(sqlFindAll + " WHERE ordinescuola_anagrafica.ordinescuola_pk = " + id);
//     result(null, rows);
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) return conn.release();
//   }
// };

Plessi.create = async function (newItem, result) {
  let conn;
  conn = await pool.getConnection();
  let queryString =
    "INSERT INTO plessi_anagrafica (" +
    "denominazione, " +
    "codice," + 
    "scuola_fk) VALUES (" +
    "'" +
    newItem.denominazione +
    "','" +
    newItem.codice +
    "', " +
    newItem.scuola_fk +
    ")";

  conn
    .query(queryString)
    .then(
      (value) => {
        let valore = JSON.parse(JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v));
        result(null, valore);
      },
      (reason) => {
        result(reason, null);
      }
    )
    .catch((reason) => {
      result(reason, null);
    })
    .finally(() => {
      if (conn) return conn.release();
    });
};

let sqlUpdate = "UPDATE plessi_anagrafica SET denominazione = ?, codice = ?, scuola_fk = ? WHERE plesso_pk = ?"

Plessi.update = async function (id, item, result) {

  let conn;
  conn = await pool.getConnection();
  conn.query(sqlUpdate,
      [item.denominazione, item.codice, item.scuola_fk, id]
    )
    .then(
      (value) => {
        let valore = JSON.parse(JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v));
        result(null, valore);
      },
      (reason) => {
        result(reason, null);
      }
    )
    .catch((reason) => {
      result(reason, null);
    })
    .finally(() => {
      if (conn) return conn.release();
    });
};

Plessi.delete = async function (id, result) {
  let conn;
  conn = await pool.getConnection();
  conn
    .query("DELETE FROM plessi_anagrafica WHERE plesso_pk = ?",id)
    .then((value) => {
      result(null, value);
    })
    .catch((err) => {
      result(null, err);
    })
    .finally(() => {
      if (conn) return conn.release();
    });
};

module.exports = Plessi;
