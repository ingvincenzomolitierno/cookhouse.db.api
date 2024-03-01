"use strict";

const Option = require("./option.model.js");

exports.findAllVersioniPortate = function (req, res) {
  Option.findAllVersioniPortate(function (err, options_list) {
    if (err) res.send(err);
    res.send(options_list);
  });
};

exports.findAllTipoPortate = function (req, res) {
  Option.findAllTipoPortate(function (err, options_list) {
    if (err) res.send(err);
    res.send(options_list);
  });
};

// exports.create = function (req, res) {
//   const new_item = new Option(req.body);
//   //handles null error
//   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//     res
//       .status(400)
//       .send({ error: true, message: "Please provide all required field" });
//   } else {
//     Option.create(new_item, function (err, valueData) {
//       if (err) {
//         res.status(512).send(err);
//       } else {
//         res.json({
//           error: false,
//           message: "Bill of Material added successfully!",
//           data: valueData
//         });
//       }
//     });
//   }
// };

// exports.findById = function(req, res) {
//     Employee.findById(req.params.id, function(err, employee) {
//         if (err)
//         res.send(err);
//         res.json(employee);
//     });
// };

// exports.update = function (req, res) {
//   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//     res
//       .status(400)
//       .send({ error: true, message: "Please provide all required field" });
//   } else {
//     Option.update(
//       req.params.id,
//       new Option(req.body),
//       function (err, result) {
//         if (err) res.send(err);
//         else
//           res.json({ error: false, message: "Bill of Material successfully updated", data: result });
//       }
//     );
//   }
// };

// exports.delete = function (req, res) {
//   Option.delete(req.params.id, function (err, materie_prime) {
//     // console.log("delete");
//     if (err) res.send(err);
//     else res.send(materie_prime);
//   });
// };
