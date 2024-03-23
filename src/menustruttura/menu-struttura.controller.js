"use strict";

const MenuStruttura = require("./menu-struttura.model.js");

exports.findAll = function (req, res) {

  if(req.query.hasOwnProperty("settimana") && req.query.hasOwnProperty("giorno") && req.query.hasOwnProperty("menupk")){
    MenuStruttura.findByWeekAndDay(req.query.settimana, req.query.giorno, req.query.menupk, function (err, menu) {
      if (err) res.send(err);
      res.send(menu);
    });
  } else if(req.query.hasOwnProperty("settimana")){

  } else if (req.query.hasOwnProperty("giorno")){

  } else {
    MenuStruttura.findAll(function (err, menu) {
      if (err) res.send(err);
      res.send(menu);
    });
  }

};

exports.create = function (req, res) {
  const new_item = new MenuStruttura(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    MenuStruttura.create(new_item, function (err, valueData) {
      if (err) {
        res.status(512).send(err);
      } else {
        res.json({
          error: false,
          message: "Menu Structure added successfully!",
          data: valueData
        });
      }
    });
  }
};

exports.findByMenuPK = function(req, res) {
  MenuStruttura.findByMenuPK(req.params.id, function(err, menustruttura) {
        
        if (err) res.send(err);
        res.json(menustruttura);
    });
};

exports.findById = function(req, res) {
  MenuStruttura.findById(req.params.id, function(err, menustruttura) {
        
        if (err) res.send(err);
        res.json(menustruttura);
    });
};

exports.update = function (req, res) {  
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    MenuStruttura.update(
      req.params.id,
      req.body,
      function (err, result) {
        if (err) res.send(err);
        else
          res.json({ error: false, message: "Menu Structure successfully updated", data: result });
      }
    );
  }
};

exports.delete = function (req, res) {
  MenuStruttura.delete(req.params.id, function (err, menustruttura) {
    if (err) res.send(err);
    else res.json({ error: false, message: "Menu Structure successfully deleted", data: menustruttura });
  });
};

exports.deleteByMenuPK = function (req, res) {
  MenuStruttura.deleteByMenuPK(req.params.id, function (err, menustruttura) {
    if (err) res.send(err);
    else res.json({ error: false, message: "Full Menu Structure successfully deleted", data: menustruttura });
  });
};
