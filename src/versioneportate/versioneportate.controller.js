"use strict";

const TipoPortate = require("./versioneportate.model.js");

exports.findAll = function (req, res) {
  TipoPortate.findAll(function (err, versione_portata) {
    if (err) res.send(err);
    res.send(versione_portata);
  });
};

// exports.create = function (req, res) {
//   const new_item = new TipoPortate(req.body);
//   //handles null error
//   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//     res
//       .status(400)
//       .send({ error: true, message: "Please provide all required field" });
//   } else {
//     TipoPortate.create(new_item, function (err, valueData) {
//       if (err) {
//         res.status(512).send(err);
//       } else {
//         res.json({
//           error: false,
//           message: "Course added successfully!",
//           data: valueData,
//         });
//       }
//     });
//   }
// };

// exports.update = function (req, res) {
//   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//     res
//       .status(400)
//       .send({ error: true, message: "Please provide all required field" });
//   } else {
//     TipoPortate.update(
//       req.params.id,
//       new TipoPortate(req.body),
//       function (err, result) {
//         if (err) res.send(err);
//         else
//           res.json({
//             error: false,
//             message: "Course successfully updated",
//             data: result,
//           });
//       }
//     );
//   }
// };

// exports.delete = function (req, res) {
//   TipoPortate.delete(req.params.id, function (err, portata) {
//     // console.log("delete");
//     if (err) res.send(err);
//     else res.send(portata);
//   });
// };
