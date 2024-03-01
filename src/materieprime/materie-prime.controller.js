"use strict";

const MateriePrime = require("./materie-prime.model.js");

exports.findAll = function (req, res) {
  MateriePrime.findAll(function (err, materie_prime) {
    // console.log("controller");
    if (err) res.send(err);
    // console.log("res", materie_prime);
    res.send(materie_prime);
  });
};

exports.create = function (req, res) {
  const new_rawMaterial = new MateriePrime(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    MateriePrime.create(new_rawMaterial, function (err, rawMaterial) {
      if (err) {
        res.status(512).send(err);
      } else {
        res.json({
          error: false,
          message: "Raw Material added successfully!",
          data: rawMaterial
        });
      }
    });
  }
};

// exports.findById = function(req, res) {
//     Employee.findById(req.params.id, function(err, employee) {
//         if (err)
//         res.send(err);
//         res.json(employee);
//     });
// };

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    MateriePrime.update(
      req.params.id,
      new MateriePrime(req.body),
      function (err, result) {
        if (err) res.send(err);
        else
          res.json({ error: false, message: "Raw Material successfully updated", data: result });
      }
    );
  }
};

exports.delete = function (req, res) {
  MateriePrime.delete(req.params.id, function (err, materie_prime) {
    // console.log("delete");
    if (err) res.send(err);
    else res.send(materie_prime);
  });
};
