"user strict";
var pool = require("../../config/db.config");

//Portate object create
var Portate = function (portata) {
  this.portata_pk = portata.portata_pk;
  this.portata_code = portata.portata_code;
  this.denominazione = portata.denominazione;
  this.descrizione = portata.descrizione;
  this.alias = portata.alias;
  this.tipo_portata_fk = portata.tipo_portata_fk;
  this.versione_portata_fk = portata.versione_portata_fk;
};

let sqlFindAll = "SELECT portate_anagrafica.*, " + 
"portate_tipo_anagrafica.portata_tipo_code as portata_tipo_codice, " +
"portate_tipo_anagrafica.denominazione as portata_tipo_denominazione, " +
"portate_versione_anagrafica.denominazione  as portata_versione " +
"FROM portate_anagrafica " +
"LEFT JOIN portate_tipo_anagrafica ON portate_anagrafica.tipo_portata_fk = portate_tipo_anagrafica.portata_tipo_pk " +
"LEFT JOIN portate_versione_anagrafica ON portate_anagrafica.versione_portata_fk = portate_versione_anagrafica.portata_versione_pk ";

Portate.findAll = async function (result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(sqlFindAll);
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
};

Portate.findById = async function (id, result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(sqlFindAll + " WHERE portate_anagrafica.portata_pk = ? ", id);
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
};


Portate.findByTypeCode = async function (typecode, result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(sqlFindAll + " WHERE portate_tipo_anagrafica.portata_tipo_code = '" + typecode + "'");
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
};

Portate.create = async function (newItem, result) {
  let conn;

  conn = await pool.getConnection();

  console.log('newItem',newItem);

  let queryString =
    "INSERT INTO portate_anagrafica (" +
    "portata_code, " +
    "denominazione, " +
    "descrizione, " +
    "alias, " +
    "tipo_portata_fk, " +
    "versione_portata_fk) VALUES ('" +
    newItem.portata_code +
    "', '" +
    newItem.denominazione +
    "', '" +
    (newItem.descrizione == null ? "" : newItem.descrizione) +
    "', '" +
    (newItem.alias == null ? "" : newItem.alias) +
    "', " +
    newItem.tipo_portata_fk +
    ", " +
    newItem.versione_portata_fk +
    ")";

    console.log('query', queryString);

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

// Portate.findById = async function (id, result) {
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

Portate.update = async function (id, item, result) {
  let conn;
  conn = await pool.getConnection();
  conn.query(
      "UPDATE portate_anagrafica SET "+
      "portata_code=?, denominazione=? "+
      ", descrizione=?, alias=?, tipo_portata_fk=?, "+
      " versione_portata_fk=? WHERE portata_pk=?",
      [item.portata_code, item.denominazione,
        item.descrizione, item.alias, item.tipo_portata_fk,
        item.versione_portata_fk,id]
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

Portate.delete = async function (id, result) {
  let conn;

  conn = await pool.getConnection();
  conn
    .query("DELETE FROM portate_anagrafica WHERE portata_pk =" + id)
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

module.exports = Portate;