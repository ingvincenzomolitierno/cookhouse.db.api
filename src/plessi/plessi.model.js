"user strict";
var pool = require("../../config/db.config");

//Plessi object create
var Plessi = function (plessi) {
  this.plesso_pk = plessi.plesso_pk;
  this.denominazione = plessi.denominazione;
  this.codice = plessi.codice;
  this.ordinescuola_fk = plessi.ordinescuola_fk;
};

let sqlFindAll = "SELECT " +
"plessi_anagrafica.plesso_pk, " +
"plessi_anagrafica.denominazione AS plesso_denominazione, " +
"plessi_anagrafica.codice AS plesso_codice, " +
"ordinescuola_anagrafica.ordinescuola_pk, " +
"ordinescuola_anagrafica.denominazione AS ordinescuola_denominazione, " +
"ordinescuola_anagrafica.codice AS ordinescuola_codice, " +
"scuole_anagrafica.scuola_pk, " +
"scuole_anagrafica.denominazione AS scuola_denominazione, " +
"scuole_anagrafica.codice AS scuola_codice, " +
"clienti_anagrafica.cliente_pk, " +
"clienti_anagrafica.denominazione AS cliente_denominazione, " +
"clienti_anagrafica.codice AS cliente_codice " +
"FROM plessi_anagrafica " +
"LEFT JOIN ordinescuola_anagrafica ON plessi_anagrafica.ordinescuola_fk = ordinescuola_anagrafica.ordinescuola_pk " +
"LEFT JOIN scuole_anagrafica ON ordinescuola_anagrafica.scuola_fk = scuole_anagrafica.scuola_pk " +
"LEFT JOIN clienti_anagrafica ON scuole_anagrafica.cliente_fk = clienti_anagrafica.cliente_pk ";

Plessi.findAll = async function (result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows,fields] = await conn.query(sqlFindAll);
    console.log(rows);
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

Plessi.findByOrdineId = async function (id, result) {
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

Plessi.create = async function (newItem, result) {
  let conn;
  conn = await pool.getConnection();
  let queryString =
    "INSERT INTO plessi_anagrafica (" +
    "denominazione, " +
    "codice," + 
    "ordinescuola_fk) VALUES (" +
    "'" +
    newItem.denominazione +
    "','" +
    newItem.codice +
    "', " +
    newItem.ordinescuola_fk +
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

let sqlUpdate = "UPDATE plessi_anagrafica SET denominazione = ?, codice = ?, ordinescuola_fk = ? WHERE plesso_pk = ?"

Plessi.update = async function (id, item, result) {

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
