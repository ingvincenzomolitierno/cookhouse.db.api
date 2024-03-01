"use strict";

const OrdineScuola = require("./ordine-scuola.model.js");

exports.findAll = function (req, res) {
  if(req.query.hasOwnProperty("scuola")){
    OrdineScuola.findByScuolaId(req.query.scuola,function (err, ordinescuola) {
      if (err) res.send(err);
      res.send(ordinescuola);
    });
  } else {
    OrdineScuola.findAll(function (err, ordinescuola) {
      if (err) res.send(err);
      res.send(ordinescuola);
    });
  }
};

exports.findById = function(req, res) {
  OrdineScuola.findById(req.params.id, function(err, ordinescuola) {
        if (err)
        res.send(err);
        res.json(ordinescuola);
    });
};

exports.create = function (req, res) {
  const new_item = new OrdineScuola(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    OrdineScuola.create(new_item, function (err, valueData) {
      if (err) {
        res.status(512).send(err);
      } else {
        res.json({
          error: false,
          message: "School Order added successfully!",
          data: valueData
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
    OrdineScuola.update(
      req.params.id,
      new OrdineScuola(req.body),
      function (err, result) {
        if (err) res.send(err);
        else
          res.json({ error: false, message: "School Order successfully updated", data: result });
      }
    );
  }
};

exports.delete = function (req, res) {
  OrdineScuola.delete(req.params.id, function (err, ordinescuola) {
    if (err) res.send(err);
    else res.send(ordinescuola);
  });
};
