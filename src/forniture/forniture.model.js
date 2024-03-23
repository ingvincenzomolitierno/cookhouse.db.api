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

  this.valore_default = forniture.valore_default;
};

let sqlFindAll = "SELECT forniture_cross.fornitura_pk, " +
"forniture_cross.denominazione AS fornitura_denominazione, " +
"forniture_cross.codice AS fornitura_codice, " +
"forniture_cross.descrizione AS fornitura_descrizione, " +
"forniture_cross.data_inizio, " +
"forniture_cross.data_fine, " +
"forniture_cross.valore_default, " +
"turni_anagrafica.turno_pk AS turno_fk, " +
"turni_anagrafica.denominazione AS turno_denominazione, " +
"turni_anagrafica.codice AS turno_codice, " +
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
"clienti_anagrafica.codice AS cliente_codice, " +
"menu_anagrafica.menu_pk AS menu_fk, " +
"menu_anagrafica.menu_code AS menu_codice, " +
"menu_anagrafica.denominazione AS menu_denominazione " +
"FROM forniture_cross " +
"LEFT JOIN turni_anagrafica ON forniture_cross.turno_fk = turni_anagrafica.turno_pk " +
"LEFT JOIN ordinescuola_anagrafica ON turni_anagrafica.ordinescuola_fk = ordinescuola_anagrafica.ordinescuola_pk " +
"LEFT JOIN plessi_anagrafica ON ordinescuola_anagrafica.plesso_fk = plessi_anagrafica.plesso_pk " +
"LEFT JOIN scuole_anagrafica ON plessi_anagrafica.scuola_fk = scuole_anagrafica.scuola_pk " +
"LEFT JOIN clienti_anagrafica ON scuole_anagrafica.cliente_fk = clienti_anagrafica.cliente_pk " +
"LEFT JOIN menu_anagrafica ON forniture_cross.menu_fk = menu_anagrafica.menu_pk ";

Forniture.findAll = async function (result) {
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
    "INSERT INTO forniture_cross (" +
    "codice, " +
    "denominazione, " +
    "descrizione, " +
    "data_inizio," + 
    "data_fine," + 
    "valore_default," + 
    "turno_fk," + 
    "menu_fk) VALUES (" +
    "'" +
    newItem.codice +
    "','" +
    newItem.denominazione +
    "','" +
    newItem.descrizione +
    "','" +    
    newItem.data_inizio +
    "','" +  
    newItem.data_fine +
    "', " +  
    newItem.valore_default +
    ", " +      
    newItem.turno_fk +
    ", " +      
    newItem.menu_fk +
    ")";

    console.log(queryString);

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

let sqlUpdate = "UPDATE forniture_cross SET codice = ?, denominazione = ?, descrizione = ?, data_inizio = ?, data_fine = ?, valore_default = ?, turno_fk = ?, menu_fk = ? WHERE fornitura_pk = ?"

Forniture.update = async function (id, item, result) {

  let conn;
  conn = await pool.getConnection();
  conn.query(sqlUpdate,
      [item.codice, item.denominazione, item.descrizione, item.data_inizio, item.data_fine, item.valore_default, item.turno_fk, item.menu_fk, id]
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
    .query("DELETE FROM forniture_cross WHERE fornitura_pk = ?",id)
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
