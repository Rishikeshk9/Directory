const express = require("express");

const router = express.Router();

const uuid = require("uuid");

let types = require("../../Types");

 

router.get("/", (req, res) => {

  res.json(types);

});

 

router.get("/:id", (req, res) => {

  const found = types.some(type => type.id === parseInt(req.params.id));

 

  if (found) {

    res.json(types.filter(type => type.id === parseInt(req.params.id)));

  } else {

    res.sendStatus(400);

  }

});

 

router.post("/", (req, res) => {

  const newType = {

    id: uuid.v4(),

    name: req.body.name,

    email: req.body.email

  };

 

  if (!newType.name || !newType.email) {

    return res.sendStatus(400);

  }

  types.push(newType);

  res.json(types);

});

//Update type

router.put("/:id", (req, res) => {

  const found = types.some(type => type.id === parseInt(req.params.id));

  if (found) {

    const updateType = req.body;

    types.forEach(type => {

      if (type.id === parseInt(req.params.id)) {

        type.name = updateType.name ? updateType.name : type.name;

        type.email = updateType.email ? updateType.email : type.email;

        res.json({ msg: "type updated", type });

      }

    });

  } else {

    res.sendStatus(400);

  }

});

 

//Delete type

router.delete("/:id", (req, res) => {

  const found = types.some(type => type.id === parseInt(req.params.id))

  if (found) {

    types = types.filter(type => type.id !== parseInt(req.params.id))

    res.json({

      msg: "type deleted",

      types

    });

  } else {

    res.sendStatus(400);

  }

});

 

module.exports = router;