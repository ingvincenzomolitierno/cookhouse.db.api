"user strict";
var pool = require("../../config/db.config");

//Menu object create
var Menu = function (menu) {
  this.menu_pk = menu.menu_pk;
  this.menu_code = menu.menu_code;
  this.denominazione = menu.denominazione;
  this.periodo = menu.periodo;  
  this.lunedi = menu.lunedi;  
  this.martedi = menu.martedi;  
  this.mercoledi = menu.mercoledi;  
  this.giovedi = menu.giovedi;  
  this.venerdi = menu.venerdi;  
  this.sabato = menu.sabato;  
  this.domenica = menu.domenica;  
  this.menu_padre = menu.menu_padre;  
  this.menu_fk = menu.menu_fk;
  this.nota = menu.nota;
};

let sqlFindAll = "SELECT menu_anagrafica.*, " +
"menu_padre.menu_code AS menupadre_codice, " + 
"menu_padre.denominazione AS menupadre_denominazione, " + 
"menu_anagrafica.menu_padre " + 
"FROM menu_anagrafica " + 
"LEFT JOIN menu_anagrafica AS menu_padre " +
"ON menu_anagrafica.menu_fk = menu_padre.menu_pk ";

Menu.findAll = async function (result) {
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

Menu.findById = async function (id, result) {
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

Menu.findFatherMenu = async function (param, result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows,fields] = await conn.query(sqlFindAll + " WHERE menu_anagrafica.menu_padre = ?", param);
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
};

Menu.create = async function (newItem, result) {
  let conn;

  conn = await pool.getConnection();
  let queryString =
    "INSERT INTO menu_anagrafica (" +
    "menu_code, " +
    "denominazione, " +
    "periodo, " +
    "lunedi, " +
    "martedi, " +
    "mercoledi, " +
    "giovedi, " +
    "venerdi, " +
    "sabato, " +
    "domenica, " +
    "menu_padre, " +
    "menu_fk, " +
    "nota) VALUES ('" +
    newItem.menu_code +
    "', '" +
    newItem.denominazione +
    "', '" +
    newItem.periodo +
    "', '" +
    newItem.lunedi +
    "', '" +
    newItem.martedi +
    "', '" +
    newItem.mercoledi +
    "', '" +
    newItem.giovedi +
    "', '" +
    newItem.venerdi +
    "', '" +
    newItem.sabato +
    "', '" +
    newItem.domenica +
    "', '" +
    newItem.menu_padre +
    "', " +
    newItem.menu_fk +
    ", '" +
    (newItem.nota == null ? "" : newItem.nota) +
    "')";

  conn.query(queryString).then(
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

Menu.update = async function (id, item, result) {
  let conn;
  conn = await pool.getConnection();
  conn.query(
      "UPDATE menu_anagrafica SET "+
      "menu_code=?, denominazione=? , periodo=?, " + 
      "lunedi=?, martedi=?, mercoledi=?, giovedi=?, venerdi=?, sabato=?, domenica=? " +
      " menu_padre=?, menu_fk=?, nota=? WHERE menu_pk=?",
      [item.menu_code, item.denominazione, item.periodo,
        item.lunedi, item.martedi, item.mercoledi, item.giovedi, item.venerdi, item.sabato, item.domenica, item.menu_padre, item.menu_fk, item.nota, id]
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

Menu.delete = async function (id, result) {
  let conn;

  conn = await pool.getConnection();
  conn
    .query("DELETE FROM menu_anagrafica WHERE menu_pk =" + id)
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

module.exports = Menu;