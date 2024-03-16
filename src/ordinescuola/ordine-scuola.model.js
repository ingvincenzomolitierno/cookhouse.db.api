"user strict";
var pool = require("../../config/db.config");

//OrdineScuola object create
var OrdineScuola = function (ordinescuola) {
  this.ordinescuola_pk = ordinescuola.ordinescuola_pk;
  this.denominazione = ordinescuola.denominazione;
  this.codice = ordinescuola.codice;
  this.plesso_fk = ordinescuola.plesso_fk;
};

let sqlFindAll = "SELECT ordinescuola_anagrafica.ordinescuola_pk, " +
"ordinescuola_anagrafica.denominazione AS ordinescuola_denominazione, " +
"ordinescuola_anagrafica.codice AS ordinescuola_codice, " +
"plessi_anagrafica.plesso_pk, " +
"plessi_anagrafica.denominazione AS plesso_denominazione, " +
"plessi_anagrafica.codice AS plesso_codice, " +
"scuole_anagrafica.scuola_pk, " +
"scuole_anagrafica.denominazione AS scuola_denominazione, " +
"scuole_anagrafica.codice AS scuola_codice, " +
"clienti_anagrafica.cliente_pk, " +
"clienti_anagrafica.codice AS cliente_codice, " +
"clienti_anagrafica.denominazione AS cliente_denominazione " +
"FROM ordinescuola_anagrafica " +
"LEFT JOIN plessi_anagrafica ON ordinescuola_anagrafica.plesso_fk = plessi_anagrafica.plesso_pk " +
"LEFT JOIN scuole_anagrafica ON plessi_anagrafica.scuola_fk = scuole_anagrafica.scuola_pk " +
"LEFT JOIN clienti_anagrafica ON scuole_anagrafica.cliente_fk = clienti_anagrafica.cliente_pk ";

OrdineScuola.findAll = async function (result) {
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

OrdineScuola.findById = async function (id, result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows,fields] = await conn.query(sqlFindAll + " WHERE ordinescuola_anagrafica.ordinescuola_pk = " + id);
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
};

// OrdineScuola.findByScuolaId = async function (id, result) {
//   let conn;
//   try {
//     conn = await pool.getConnection();
//     const [rows,fields] = await conn.query(sqlFindAll + " WHERE scuole_anagrafica.scuola_pk = " + id);
//     result(null, rows);
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) return conn.release();
//   }
// };

OrdineScuola.create = async function (newItem, result) {
  let conn;
  conn = await pool.getConnection();
  let queryString =
    "INSERT INTO ordinescuola_anagrafica (" +
    "denominazione, " +
    "codice," + 
    "plesso_fk) VALUES (" +
    "'" +
    newItem.denominazione +
    "','" +
    newItem.codice +
    "', " +
    newItem.plesso_fk +
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

let sqlUpdate = "UPDATE ordinescuola_anagrafica SET denominazione = ?, codice = ?, plesso_fk = ? WHERE ordinescuola_pk = ?"

OrdineScuola.update = async function (id, item, result) {

  let conn;
  conn = await pool.getConnection();
  conn.query(sqlUpdate,
      [item.denominazione, item.codice, item.plesso_fk, id]
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

OrdineScuola.delete = async function (id, result) {
  let conn;
  conn = await pool.getConnection();
  conn.query("DELETE FROM ordinescuola_anagrafica WHERE ordinescuola_pk = ?",id)
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

module.exports = OrdineScuola;
