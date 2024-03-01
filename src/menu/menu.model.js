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
  this.cliente_fk = menu.cliente_fk;
  this.menu_fk = menu.menu_fk;
  this.nota = menu.nota;
};

Menu.findAll = async function (result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT menu_anagrafica.* FROM menu_anagrafica ");

    console.log('rows',rows);
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
};

Menu.create = async function (newItem, result) {
  let conn;

  conn = await pool.getConnection();

  console.log('newMenu',newItem);

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
    "cliente_fk, " +
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
    "', " +
    newItem.cliente_fk +
    ", " +
    newItem.menu_fk +
    ", '" +
    (newItem.nota == null ? "" : newItem.nota) +
    "')";

    console.log('query', queryString);

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
      if (conn) return conn.end();
    });
};

// Menu.findById = async function (id, result) {
//   console.log("id", id);
//   console.log("result", result);
//   let conn;
//   try {
//     conn = await pool.getConnection();
//     const rows = await conn.query(
//       "SELECT * FROM materie_prime_anagrafica WHERE id = ? ",
//       id
//     );
//     result(null, rows);
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) return conn.end();
//   }
// };

Menu.update = async function (id, item, result) {
  let conn;
  conn = await pool.getConnection();
  conn.query(
      "UPDATE menu_anagrafica SET "+
      "menu_code=?, denominazione=? , periodo=?, " + 
      "lunedi=?, martedi=?, mercoledi=?, giovedi=?, venerdi=?, sabato=?, domenica=? " +
      " cliente_fk=?, menu_fk=?, nota=? WHERE menu_pk=?",
      [item.menu_code, item.denominazione, item.periodo,
        item.lunedi, item.martedi, item.mercoledi, item.giovedi, item.venerdi, item.sabato, item.domenica,
        item.cliente_fk, item.nota, id]
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
      if (conn) return conn.end();
    });
};

module.exports = Menu;