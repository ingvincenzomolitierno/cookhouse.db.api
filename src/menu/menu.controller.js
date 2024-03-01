"use strict";

const Menu = require("./menu.model.js");

exports.findAll = function (req, res) {
  Menu.findAll(function (err, menu) {
    if (err) res.send(err);
    res.send(menu);
  });
};

exports.create = function (req, res) {
  const new_item = new Menu(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Menu.create(new_item, function (err, valueData) {
      if (err) {
        res.status(512).send(err);
      } else {
        res.json({
          error: false,
          message: "Menu added successfully!",
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
    Menu.update(
      req.params.id,
      new Menu(req.body),
      function (err, result) {
        if (err) res.send(err);
        else
          res.json({ error: false, message: "Menu successfully updated", data: result });
      }
    );
  }
};

exports.delete = function (req, res) {
  Menu.delete(req.params.id, function (err, portata) {
    // console.log("delete");
    if (err) res.send(err);
    else res.send(portata);
  });
};
