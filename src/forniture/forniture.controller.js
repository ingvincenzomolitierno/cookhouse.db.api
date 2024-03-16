"use strict";

const Forniture = require("./forniture.model.js");

exports.findAll = function (req, res) {
  Forniture.findAll(function (err, forniture) {
    if (err) res.send(err);
    res.send(forniture);
  });
};

exports.findById = function(req, res) {
  Forniture.findById(req.params.id, function(err, forniture) {
        if (err)
        res.send(err);
        res.json(forniture);
    });
};

exports.findByMenuId = function(req, res) {
  Forniture.findByMenuId(req.params.id, function(err, forniture) {
        if (err)
        res.send(err);
        res.json(forniture);
    });
};

exports.create = function (req, res) {
  const new_item = new Forniture(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Forniture.create(new_item, function (err, valueData) {
      if (err) {
        res.status(512).send(err);
      } else {
        res.json({
          error: false,
          message: "Supply added successfully!",
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
    Forniture.update(
      req.params.id,
      new Forniture(req.body),
      function (err, result) {
        if (err) res.send(err);
        else
          res.json({ error: false, message: "Supply successfully updated", data: result });
      }
    );
  }
};

exports.delete = function (req, res) {
  Forniture.delete(req.params.id, function (err, forniture) {
    if (err) res.send(err);
    else res.send(forniture);
  });
};
