"user strict";
var pool = require("../../config/db.config");

//MateriePrime object create
var MateriePrime = function (materie_prime) {
  this.materia_prima_pk = materie_prime.materia_prima_pk;
  this.materia_prima_code = materie_prime.materia_prima_code;
  this.denominazione = materie_prime.denominazione;
  this.visibile_mrp = materie_prime.visibile_mrp;
  this.alias = materie_prime.alias;
  this.fornitore = materie_prime.fornitore;
  this.udm_consumo = materie_prime.udm_consumo;
  this.udm_acquisto = materie_prime.udm_acquisto;
  this.fdc_udm = materie_prime.fdc_udm;
  this.lt_anticipo_gg = materie_prime.lt_anticipo_gg;
  this.prezzo = materie_prime.prezzo;
};

MateriePrime.findAll = async function (result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows,fields] = await conn.query("SELECT * FROM materie_prime_anagrafica");
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
};

MateriePrime.create = async function (newItem, result) {
  let conn;

  conn = await pool.getConnection();

  let queryString =
    "INSERT INTO materie_prime_anagrafica (" +
    "materia_prima_code, " +
    "denominazione, " +
    "visibile_mrp, " +
    "alias, " +
    "fornitore, " +
    "udm_consumo, " +
    "udm_acquisto, " +
    "fdc_udm, " +
    "lt_anticipo_gg, " +
    "prezzo ) VALUES (" +
    "'" +
    newItem.materia_prima_code +
    "', " +
    "'" +
    newItem.denominazione +
    "', " +
    +newItem.visibile_mrp +
    ", " +
    "'" +
    (newItem.alias == null ? "" : newItem.alias) +
    "', '" +
    newItem.fornitore +
    "', '" +
    newItem.udm_consumo +
    "', '" +
    newItem.udm_acquisto +
    "', " +
    newItem.fdc_udm +
    ", " +
    newItem.lt_anticipo_gg +
    ", " +
    (newItem.prezzo == null ? 0 : Number(newItem.prezzo)) +
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

// MateriePrime.findById = async function (id, result) {
//   console.log("id", id);
//   console.log("result", result);
//   let conn;
//   try {
//     conn = await pool.getConnection();
//     const [rows,fields] = await conn.query(
//       "SELECT * FROM materie_prime_anagrafica WHERE id = ? ",
//       id
//     );
//     result(null, rows);
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) return conn.release();
//   }
// };

MateriePrime.update = async function (id, item, result) {
  let conn;
  conn = await pool.getConnection();
  conn.query(
      "UPDATE materie_prime_anagrafica SET "+
      "materia_prima_code=?, denominazione=? "+
      ", visibile_mrp=?, alias=?, fornitore=?, "+
      " udm_consumo=?, udm_acquisto=?, fdc_udm=?, "+
      "lt_anticipo_gg=?, prezzo=? WHERE materia_prima_pk=?",
      [item.materia_prima_code, item.denominazione,
        item.visibile_mrp, item.alias, item.fornitore,
        item.udm_consumo, item.udm_acquisto, item.fdc_udm,
        item.lt_anticipo_gg, item.prezzo,
        id]
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

MateriePrime.delete = async function (id, result) {
  let conn;

  conn = await pool.getConnection();
  conn
    .query("DELETE FROM materie_prime_anagrafica WHERE materia_prima_pk =" + id)
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

module.exports = MateriePrime;
