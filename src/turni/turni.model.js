"user strict";
var pool = require("../../config/db.config");

//Turni object create
var Turni = function (turni) {
  this.turno_pk = turni.turno_pk;
  this.denominazione = turni.denominazione;
  this.codice = turni.codice;
  this.ordinescuola_fk = turni.ordinescuola_fk;
};

let sqlFindAll = "SELECT " +
"turni_anagrafica.turno_pk, " +
"turni_anagrafica.denominazione AS turno_denominazione, " +
"turni_anagrafica.codice AS turno_codice, " +
"ordinescuola_anagrafica.ordinescuola_pk, " +
"ordinescuola_anagrafica.denominazione AS ordinescuola_denominazione, " +
"ordinescuola_anagrafica.codice AS ordinescuola_codice, " +
"plessi_anagrafica.plesso_pk, " +
"plessi_anagrafica.denominazione AS plesso_denominazione, " +
"plessi_anagrafica.codice AS plesso_codice, " +
"scuole_anagrafica.scuola_pk, " +
"scuole_anagrafica.denominazione AS scuola_denominazione, " +
"scuole_anagrafica.codice AS scuola_codice, " +
"clienti_anagrafica.cliente_pk, " +
"clienti_anagrafica.denominazione AS cliente_denominazione, " +
"clienti_anagrafica.codice AS cliente_codice " +
"FROM turni_anagrafica " +
"LEFT JOIN  ordinescuola_anagrafica ON turni_anagrafica.ordinescuola_fk = ordinescuola_anagrafica.ordinescuola_pk " +
"LEFT JOIN plessi_anagrafica ON ordinescuola_anagrafica.plesso_fk = plessi_anagrafica.plesso_pk " +
"LEFT JOIN scuole_anagrafica ON plessi_anagrafica.scuola_fk = scuole_anagrafica.scuola_pk " +
"LEFT JOIN clienti_anagrafica ON scuole_anagrafica.cliente_fk = clienti_anagrafica.cliente_pk ";

Turni.findAll = async function (result) {
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

Turni.findById = async function (id, result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows,fields] = await conn.query(sqlFindAll + " WHERE turni_anagrafica.turno_pk = " + id);
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
};

// Turni.findByPlessoId = async function (id, result) {
//   let conn;
//   try {
//     conn = await pool.getConnection();
//     const [rows,fields] = await conn.query(sqlFindAll + " WHERE plessi_anagrafica.plesso_pk = " + id);
//     result(null, rows);
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) return conn.release();
//   }
// };

Turni.create = async function (newItem, result) {
  let conn;
  conn = await pool.getConnection();
  let queryString =
    "INSERT INTO turni_anagrafica (" +
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

let sqlUpdate = "UPDATE turni_anagrafica SET denominazione = ?, codice = ?, ordinescuola_fk = ? WHERE turno_pk = ?"

Turni.update = async function (id, item, result) {

  let conn;
  conn = await pool.getConnection();
  conn.query(sqlUpdate,
      [item.denominazione, item.codice, item.ordinescuola_fk, id]
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
      if (conn) return conn.release();
    });
};

module.exports = Turni;
