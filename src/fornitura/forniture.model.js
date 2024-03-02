"user strict";
var pool = require("../../config/db.config");

//Forniture object create
var Forniture = function (forniture) {
  this.fornitura_pk = forniture.fornitura_pk;
  this.denominazione = forniture.denominazione;
  this.codice = forniture.codice;
  this.descrizione = forniture.descrizione;

  this.data_inizio = forniture.data_inizio;
  this.data_fine = forniture.data_fine;

  this.turno_fk = forniture.turno_fk;
  this.menu_fk = forniture.menu_fk;
};

let sqlFindAll = "SELECT " + 
"forniture_cross.fornitura_pk, " +
"forniture_cross.denominazione AS fornitura_denominazione, " +
"forniture_cross.codice AS fornitura_codice, " +
"forniture_cross.descrizione AS fornitura_descrizione, " +
"forniture_cross.data_inizio, " +
"forniture_cross.data_fine, " +

"turni_anagrafica.denominazione AS turno_denominazione, " +
"turni_anagrafica.codice AS turno_codice, " +

"plessi_anagrafica.denominazione AS plessi_denominazione, " +
"plessi_anagrafica.codice AS plessi_codice, " +

"ordinescuola_anagrafica.denominazione AS ordinescuola_denominazione, " +
"ordinescuola_anagrafica.codice AS ordinescuola_codice, " +

"scuole_anagrafica.denominazione AS scuole_denominazione, " +
"scuole_anagrafica.codice AS scuole_codice, " +

"clienti_anagrafica.cliente_pk, " +
"clienti_anagrafica.denominazione AS cliente_denominazione, " +
"clienti_anagrafica.codice AS cliente_codice, " +

"menu_anagrafica.menu_pk " +

"FROM forniture_cross " +
"LEFT JOIN turni_anagrafica ON forniture_cross.turno_fk = turni_anagrafica.turno_pk " +
"LEFT JOIN plessi_anagrafica ON turni_anagrafica.plesso_fk = plessi_anagrafica.plesso_pk " +
"LEFT JOIN ordinescuola_anagrafica ON plessi_anagrafica.ordinescuola_fk = ordinescuola_anagrafica.ordinescuola_pk " +
"LEFT JOIN scuole_anagrafica ON ordinescuola_anagrafica.scuola_fk = scuole_anagrafica.scuola_pk " +
"LEFT JOIN clienti_anagrafica ON scuole_anagrafica.cliente_fk = clienti_anagrafica.cliente_pk " +
"LEFT JOIN menu_anagrafica ON forniture_cross.menu_fk = menu_anagrafica.menu_pk ";

Forniture.findAll = async function (result) {
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

Forniture.findById = async function (id, result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows,fields] = await conn.query(sqlFindAll + " WHERE forniture_cross.fornitura_pk = ?", id);
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
};

Forniture.findByMenuId = async function (id, result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows,fields] = await conn.query(sqlFindAll + " WHERE menu_anagrafica.menu_pk = ?", id);
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
};

Forniture.create = async function (newItem, result) {
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

Forniture.update = async function (id, item, result) {

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

Forniture.delete = async function (id, result) {
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

module.exports = Forniture;
