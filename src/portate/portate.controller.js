"use strict";

const Portate = require("./portate.model.js");

exports.findAll = function (req, res) {
  Portate.findAll(function (err, materie_prime) {
    if (err) res.send(err);
    res.send(materie_prime);
  });
};

exports.findById = function (req, res) {
  Portate.findById(req.params.id, function (err, employee) {
    if (err) res.send(err);
    res.json(employee);
  });
};

exports.findByTypeCode = function (req, res) {
  console.log(req.params);
  Portate.findByTypeCode(req.params.typecode, function (err, employee) {
    if (err) res.send(err);
    res.json(employee);
  });
};

exports.create = function (req, res) {
  const new_item = new Portate(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Portate.create(new_item, function (err, valueData) {
      if (err) {
        res.status(512).send(err);
      } else {
        res.json({
          error: false,
          message: "Course added successfully!",
          data: valueData,
        });
      }
    });
  }
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Portate.update(
      req.params.id,
      new Portate(req.body),
      function (err, result) {
        if (err) res.send(err);
        else
          res.json({
            error: false,
            message: "Course successfully updated",
            data: result,
          });
      }
    );
  }
};

exports.delete = function (req, res) {
  Portate.delete(req.params.id, function (err, portata) {
    // console.log("delete");
    if (err) res.send(err);
    else res.send(portata);
  });
};
