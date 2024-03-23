"use strict";

const Scuola = require("./scuole.model.js");

exports.findAll = function (req, res) {
  if (req.query.hasOwnProperty("cliente")) {
    // Do something
    Scuola.findByClienteId(req.query.cliente,function (err, scuola) {
      if (err) res.send(err);
      res.send(scuola);
    });
  } else {
    Scuola.findAll(function (err, scuola) {
      if (err) res.send(err);
      res.send(scuola);
    });
  }

};

exports.findById = function (req, res) {
  Scuola.findById(req.params.id, function (err, scuola) {
    if (err) res.send(err);
    res.json(scuola);
  });
};

exports.create = function (req, res) {

  const new_item = new Scuola(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Scuola.create(new_item, function (err, valueData) {
      if (err) {
        res.status(512).send(err);
      } else {
        res.json({
          error: false,
          message: "School added successfully!",
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
    Scuola.update(req.params.id, new Scuola(req.body), function (err, result) {
      if (err) res.send(err);
      else
        res.json({
          error: false,
          message: "School successfully updated",
          data: result,
        });
    });
  }
};

exports.delete = function (req, res) {
  Scuola.delete(req.params.id, function (err, scuola) {
    if (err) res.send(err);
    else res.send(scuola);
  });
};
