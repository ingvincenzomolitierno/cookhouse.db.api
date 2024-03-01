"use strict";

const Plessi = require("./plessi.model.js");

exports.findAll = function (req, res) {
  if(req.query.hasOwnProperty("ordinescuola")){
    Plessi.findByOrdineId(req.query.ordinescuola,function (err, plessi) {
      if (err) res.send(err);
      res.send(plessi);
    });
  } else {
    Plessi.findAll(function (err, plessi) {
      if (err) res.send(err);
      res.send(plessi);
    });
  }
};

exports.findById = function(req, res) {
  Plessi.findById(req.params.id, function(err, plessi) {
        if (err)
        res.send(err);
        res.json(plessi);
    });
};

exports.create = function (req, res) {
  const new_item = new Plessi(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Plessi.create(new_item, function (err, valueData) {
      if (err) {
        res.status(512).send(err);
      } else {
        res.json({
          error: false,
          message: "School Site added successfully!",
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
    Plessi.update(
      req.params.id,
      new Plessi(req.body),
      function (err, result) {
        if (err) res.send(err);
        else
          res.json({ error: false, message: "School Site successfully updated", data: result });
      }
    );
  }
};

exports.delete = function (req, res) {
  Plessi.delete(req.params.id, function (err, plessi) {
    if (err) res.send(err);
    else res.send(plessi);
  });
};
