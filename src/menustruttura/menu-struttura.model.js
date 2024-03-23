"user strict";
var pool = require("../../config/db.config");

//MenuStruttura object create
var MenuStruttura = function (menuStruttura) {
  // info menu

  this.id = menuStruttura.id;

  this.menu_pk = menuStruttura.menu_pk;
  this.menu_code = menuStruttura.menu_code;
  this.menu_denominazione = menuStruttura.menu_denominazione;

  this.settimana = menuStruttura.settimana;
  this.giorno = menuStruttura.giorno;

  this.portata_pk = menuStruttura.portata_pk;
  this.portata_code = menuStruttura.portata_code;
  this.portata_denominazione = menuStruttura.portata_denominazione;
  this.portata_descrizione = menuStruttura.portata_descrizione;
  this.portata_alias = menuStruttura.portata_alias;

  this.tipo_portata_pk = menuStruttura.tipo_portata_pk;
  this.tipo_portata_code = menuStruttura.tipo_portata_code;
  this.tipo_portata_denominazione = menuStruttura.tipo_portata_denominazione;
};

let sqlFindAll = "SELECT portata_menu_cross.id, menu_anagrafica.menu_pk, " + 
"menu_anagrafica.menu_code, " +
"menu_anagrafica.denominazione AS menu_denominazione, " +
"portata_menu_cross.settimana, " + 
"portata_menu_cross.giorno, " + 
"portate_anagrafica.portata_pk, " +
"portate_anagrafica.portata_code, " +
"portate_anagrafica.denominazione AS portata_denominazione, " +
"portate_anagrafica.descrizione AS portata_descrizione, " +
"portate_anagrafica.alias AS portata_alias, " +
"portate_tipo_anagrafica.portata_tipo_pk AS tipo_portata_pk, " + 
"portate_tipo_anagrafica.portata_tipo_code AS tipo_portata_code, " + 
"portate_tipo_anagrafica.denominazione AS tipo_portata_denominazione, " +
"portate_tipo_anagrafica.ordinale AS tipo_portata_ordinale " +
"FROM menu_anagrafica " +
"INNER JOIN portata_menu_cross " +
"ON menu_anagrafica.menu_pk = portata_menu_cross.menu_fk " +
"LEFT JOIN portate_anagrafica " +
"ON portata_menu_cross.portata_fk = portate_anagrafica.portata_pk " +
"LEFT JOIN portate_tipo_anagrafica " +
"ON portate_anagrafica.tipo_portata_fk = portate_tipo_anagrafica.portata_tipo_pk "
"ORDER BY portata_menu_cross.settimana ASC, portata_menu_cross.giorno ASC, portata_menu_cross.tipo_portata_fk ";

MenuStruttura.findAll = async function (result) {
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

MenuStruttura.create = async function (newItem, result) {
  let conn;

  conn = await pool.getConnection();
  let queryString = "INSERT INTO portata_menu_cross (portata_fk, menu_fk, tipo_portata_fk, settimana, giorno) " +
    "VALUES (" +				
    newItem.portata_pk +
    ", " +
    newItem.menu_pk +
    ", " +
    newItem.tipo_portata_pk +
    ", '" +
    newItem.settimana +
    "', '" +
    newItem.giorno +    
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

MenuStruttura.findByMenuPK = async function (id, result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows,fields] = await conn.query(sqlFindAll + " WHERE menu_anagrafica.menu_pk = ? ORDER BY portata_menu_cross.settimana ASC, portata_menu_cross.giorno ASC, tipo_portata_ordinale ", id);
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
};

MenuStruttura.findByWeekAndDay = async function (settimana, giorno, menupk, result) {

  let conn;
  try {
    conn = await pool.getConnection();
    const [rows,fields] = await conn.query(sqlFindAll + " WHERE portata_menu_cross.settimana = " + settimana 
    + " AND portata_menu_cross.giorno = " + giorno 
    + " AND menu_anagrafica.menu_pk = " + menupk  
    + " ORDER BY portata_menu_cross.settimana ASC, portata_menu_cross.giorno ASC, tipo_portata_ordinale ");
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
};


MenuStruttura.findById = async function (id, result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows,fields] = await conn.query(sqlFindAll + " WHERE id = ? ", id);
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
};

MenuStruttura.update = async function (id, item, result) {

  console.log('id',id);
  console.log('item',item);

  let conn;
  conn = await pool.getConnection();
  conn.query(
      "UPDATE portata_menu_cross SET "+
      "portata_fk=?, menu_fk=? , tipo_portata_fk=?, settimana=?, giorno=? WHERE id=?",
      [item.portata_pk, item.menu_pk, item.tipo_portata_pk, item.settimana, item.giorno, id]
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

MenuStruttura.delete = async function (id, result) {
  let conn;
  conn = await pool.getConnection();
  conn
    .query("DELETE FROM portata_menu_cross WHERE id =" + id)
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

MenuStruttura.deleteByMenuPK = async function (id, result) {
  let conn;
  conn = await pool.getConnection();
  conn
    .query("DELETE FROM portata_menu_cross WHERE menu_fk =" + id)
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

module.exports = MenuStruttura;