"user strict";
var pool = require("../../config/db.config");

//Scuole object create
var Scuole = function (scuola) {
  this.scuola_pk = scuola.scuola_pk;
  this.denominazione = scuola.denominazione;
  this.codice = scuola.codice;
  this.cliente_fk = scuola.cliente_fk;
};

let sqlFindAll = "SELECT " +                
                "scuole_anagrafica.scuola_pk, " +
                "scuole_anagrafica.denominazione AS scuola_denominazione, " +
                "scuole_anagrafica.codice AS scuola_codice, " +
                "clienti_anagrafica.cliente_pk, " +
                "clienti_anagrafica.denominazione AS cliente_denominazione, " +
                "clienti_anagrafica.codice AS cliente_codice " +
                "FROM scuole_anagrafica " +
                "LEFT JOIN clienti_anagrafica " +
                "ON scuole_anagrafica.cliente_fk = clienti_anagrafica.cliente_pk ";

Scuole.findAll = async function (result) {
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

Scuole.findById = async function (id, result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows,fields] = await conn.query(sqlFindAll + " WHERE scuole_anagrafica.scuola_pk = " + id);
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
};

Scuole.findByClienteId = async function (cliente_pk, result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows,fields] = await conn.query(sqlFindAll + " WHERE clienti_anagrafica.cliente_pk = " + cliente_pk);
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
};

Scuole.create = async function (newItem, result) {
  
  let conn;
  conn = await pool.getConnection();
  let queryString = "INSERT INTO scuole_anagrafica (" +
  "denominazione, " +
  "codice," +
  "cliente_fk) VALUES (" +
  "'" +
  newItem.denominazione +
  "', '" +
  newItem.codice +
  "', " +
  newItem.cliente_fk +
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

let sqlUpdate = "UPDATE scuole_anagrafica SET denominazione = ?, codice = ?, cliente_fk = ? WHERE scuola_pk = ?"

Scuole.update = async function (id, item, result) {

  let conn;
  conn = await pool.getConnection();
  conn.query(sqlUpdate,
      [item.denominazione, item.codice, item.cliente_fk, id]
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

Scuole.delete = async function (id, result) {
  let conn;
  conn = await pool.getConnection();
  conn
    .query("DELETE FROM scuole_anagrafica WHERE scuola_pk = ?",id)
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

module.exports = Scuole;
