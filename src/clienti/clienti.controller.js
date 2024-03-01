"use strict";

const Clienti = require("./clienti.model.js");

exports.findAll = function (req, res) {
  Clienti.findAll(function (err, clienti) {
    if (err) res.send(err);
    res.send(clienti);
  });
};

exports.findById = function(req, res) {
  Clienti.findById(req.params.id, function(err, clienti) {
        if (err)
        res.send(err);
        res.json(clienti);
    });
};

exports.create = function (req, res) {

  const new_item = new Clienti(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Clienti.create(new_item, function (err, valueData) {
      if (err) {
        res.status(512).send(err);
      } else {
        res.json({
          error: false,
          message: "Customer added successfully!",
          data: valueData
        });
      }
    });
  }
};

exports.update = function (req, res) {

  console.log(req.body);

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Clienti.update(
      req.params.id,
      new Clienti(req.body),
      function (err, result) {
        if (err) res.send(err);
        else
          res.json({ error: false, message: "Customer successfully updated", data: result });
      }
    );
  }
};

exports.delete = function (req, res) {
  Clienti.delete(req.params.id, function (err, clienti) {
    if (err) res.send(err);
    else res.send(clienti);
  });
};
