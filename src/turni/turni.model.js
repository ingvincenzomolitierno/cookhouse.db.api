"user strict";
var pool = require("../../config/db.config");

//Turni object create
var Turni = function (turni) {
  this.turno_pk = turni.turno_pk;
  this.denominazione = turni.denominazione;
  this.codice = turni.codice;
  this.plesso_fk = turni.plesso_fk;
};

let sqlFindAll = "SELECT " +
"turni_anagrafica.turno_pk, " +
"turni_anagrafica.denominazione AS turno_denominazione, " +
"turni_anagrafica.codice AS turno_codice, " +
"plessi_anagrafica.plesso_pk,  " +
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
"FROM turni_anagrafica " +
"LEFT JOIN  plessi_anagrafica ON turni_anagrafica.plesso_fk = plessi_anagrafica.plesso_pk " +
"LEFT JOIN ordinescuola_anagrafica ON plessi_anagrafica.ordinescuola_fk = ordinescuola_anagrafica.ordinescuola_pk " +
"LEFT JOIN scuole_anagrafica ON ordinescuola_anagrafica.scuola_fk = scuole_anagrafica.scuola_pk " +
"LEFT JOIN clienti_anagrafica ON scuole_anagrafica.cliente_fk = clienti_anagrafica.cliente_pk ";

Turni.findAll = async function (result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(sqlFindAll);
    console.log(rows);
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
};

Turni.findById = async function (id, result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(sqlFindAll + " WHERE turni_anagrafica.turno_pk = " + id);
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
};

Turni.findByPlessoId = async function (id, result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(sqlFindAll + " WHERE plessi_anagrafica.plesso_pk = " + id);
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
};

Turni.create = async function (newItem, result) {
  console.log(newItem);
  let conn;
  conn = await pool.getConnection();
  let queryString =
    "INSERT INTO turni_anagrafica (" +
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
      if (conn) return conn.end();
    });
};

let sqlUpdate = "UPDATE turni_anagrafica SET denominazione = ?, codice = ?, plesso_fk = ? WHERE turno_pk = ?"

Turni.update = async function (id, item, result) {

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
      if (conn) return conn.end();
    });
};

Turni.delete = async function (id, result) {
  let conn;
  conn = await pool.getConnection();
  conn
    .query("DELETE FROM turni_anagrafica WHERE turno_pk = ?",id)
    .then((value) => {
      result(null, value);
    })
    .catch((err) => {
      result(null, err);
    })
    .finally(() => {
      if (conn) return conn.end();
    });
};

module.exports = Turni;
