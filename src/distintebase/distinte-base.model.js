"user strict";
var pool = require("../../config/db.config");

//DistintaBase object create
var DistintaBase = function (distinta_base) {
  this.distinta_base_pk = distinta_base.distinta_base_pk;
  this.distinta_base_code = distinta_base.distinta_base_code;
  this.portata_fk = distinta_base.portata_fk;
  this.materia_prima_fk = distinta_base.materia_prima_fk;
  this.quantita = distinta_base.quantita;
  this.nota = distinta_base.nota;
};

DistintaBase.findAll = async function (result) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows,fields] = await conn.query(
      "SELECT distinte_base.*, portate_anagrafica.portata_code, portate_anagrafica.denominazione as portata_denominazione, " +
			"materie_prime_anagrafica.materia_prima_code, materie_prime_anagrafica.denominazione as materia_prima_denominazione, materie_prime_anagrafica.udm_consumo " +
"FROM distinte_base " +
"LEFT JOIN portate_anagrafica " +
"ON distinte_base.portata_fk = portate_anagrafica.portata_pk " +
"LEFT JOIN materie_prime_anagrafica " +
"ON distinte_base.materia_prima_fk = materie_prime_anagrafica.materia_prima_pk"
    );
    result(null, rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
};

DistintaBase.create = async function (newItem, result) {
  let conn;

  conn = await pool.getConnection();
  let queryString =
    "INSERT INTO distinte_base (" +
    "distinta_base_code, " +
    "portata_fk," + 
    "materia_prima_fk," + 
    "quantita," + 
    "nota ) VALUES (" +
    "'" +
    newItem.distinta_base_code +
    "', " +
    newItem.portata_fk +
    ", " +
    newItem.materia_prima_fk +
    ", " +
    newItem.quantita +
    ", '" +
    newItem.nota +
    "')";

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

// DistintaBase.findById = async function (id, result) {
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

DistintaBase.update = async function (id, item, result) {
  let conn;
  conn = await pool.getConnection();
  conn.query(
      "UPDATE distinte_base_anagrafica SET " +
      "distinta_base_code=?, portata_fk=?, materia_prima_fk=? " +
      "quantita=?, nota=? " +
      "WHERE distinta_base_pk=?",
      [item.distinta_base_code, item.portata_fk, item.materia_prima_fk,item.quantita,item.nota,id]
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

DistintaBase.delete = async function (id, result) {
  let conn;

  conn = await pool.getConnection();
  conn
    .query("DELETE FROM distinte_base WHERE distinta_base_pk =" + id)
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

module.exports = DistintaBase;
