"user strict";
var pool = require("../../config/db.config");

// Clienti object create
var Clienti = function (clienti) {
  this.scuola_pk = clienti.cliente_pk;
  this.denominazione = clienti.denominazione;
  this.codice = clienti.codice;
  this.nota = clienti.nota;
  this.tipo_scuola_fk = clienti.tipo_scuola_fk;
  this.ordine_scuola_fk = clienti.ordine_scuola_fk;
};

let sqlFindAll = "SELECT " +
"clienti_anagrafica.cliente_pk, " +
"clienti_anagrafica.denominazione AS cliente_denominazione, " +
"clienti_anagrafica.codice AS cliente_codice, " +
"clienti_anagrafica.nota AS cliente_nota, " +
"clienti_anagrafica.tipo_scuola_fk, " +
"clienti_anagrafica.ordine_scuola_fk " +
"FROM clienti_anagrafica "; 

Clienti.findAll = async function (result) {
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

Clienti.findById = async function (id, result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows,fields] = await conn.query(sqlFindAll + " WHERE clienti_anagrafica.scuola_pk = " + id);
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
};

Clienti.create = async function (newItem, result) {
  let conn;
  conn = await pool.getConnection();
  let queryString =
    "INSERT INTO clienti_anagrafica (" +
    "codice, " +
    "denominazione, " +
    "nota," + 
    "tipo_scuola_fk," + 
    "ordine_scuola_fk) VALUES (" +
    "'" +
    newItem.codice +
    "','" +
    newItem.denominazione +
    "','" +
    newItem.nota +
    "', " +
    newItem.tipo_scuola_fk +
    ", " +
    newItem.ordine_scuola_fk +
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

let sqlUpdate = "UPDATE clienti_anagrafica SET codice = ?, denominazione = ?, nota = ?, tipo_scuola_fk = ?, ordine_scuola_fk = ? WHERE cliente_pk = ?"

Clienti.update = async function (id, item, result) {

  let conn;
  conn = await pool.getConnection();
  conn.query(sqlUpdate,
      [item.codice, item.denominazione, item.nota, item.tipo_scuola_fk, item.ordine_scuola_fk, id]
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

Clienti.delete = async function (id, result) {
  let conn;
  conn = await pool.getConnection();
  conn
    .query("DELETE FROM clienti_anagrafica WHERE cliente_pk = ?",id)
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

module.exports = Clienti;
