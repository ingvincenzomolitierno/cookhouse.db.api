"use strict";

const DistintaBase = require("./distinte-base.model.js");

exports.findAll = function (req, res) {
  DistintaBase.findAll(function (err, materie_prime) {
    if (err) res.send(err);
    res.send(materie_prime);
  });
};

exports.create = function (req, res) {
  const new_item = new DistintaBase(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    DistintaBase.create(new_item, function (err, valueData) {
      if (err) {
        res.status(512).send(err);
      } else {
        res.json({
          error: false,
          message: "Bill of Material added successfully!",
          data: valueData
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
    DistintaBase.update(
      req.params.id,
      new DistintaBase(req.body),
      function (err, result) {
        if (err) res.send(err);
        else
          res.json({ error: false, message: "Bill of Material successfully updated", data: result });
      }
    );
  }
};

exports.delete = function (req, res) {
  DistintaBase.delete(req.params.id, function (err, materie_prime) {
    if (err) res.send(err);
    else res.send(materie_prime);
  });
};
