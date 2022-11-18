const express = require("express");

const router = express.Router();

const uuid = require("uuid");

let depts = require("../../models/department.model");

router.get("/", (req, res) => {
  depts.find()
  .then((users) => res.json(users))
  .catch((err) => res.status(400).json('Error: ' + err)); 
});  

router.get('/', (req, res) => {
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("directory");
      dbo.collection("Department").find().then((users) => res.json(users));
  });
});



router.get("/:id", (req, res) => {

  const found = depts.some(user => user.id === parseInt(req.params.id));
 
  if (found) {

    res.json(depts.filter(user => user.id === parseInt(req.params.id)));

  } else {

    res.sendStatus(400);

  }

});

 

router.post("/", (req, res) => {

  const newUser = new depts({

    id: uuid.v4(),

    name: req.body.name,

    email: req.body.email,

    type:req.body.type,

    parent:req.body.parent,

    mobile:req.body.mobile,

    mobile2:req.body.mobile2,

    website:req.body.website,
    
    address:req.body.address,

    address2:req.body.address2,

    city:req.body.city,

    pin:req.body.pin,

    state:req.body.state

  });

 

  if (!newUser.name || !newUser.email) {

    return res.sendStatus(400);

  }


  console.log("Adding...");
  newUser
    .save()
    .then(() => res.json('Dept added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
 

});

//Update User

router.put("/:id", (req, res) => {

  const found = depts.some(user => user.id === parseInt(req.params.id));

  if (found) {

    const updateUser = req.body;

    depts.forEach(user => {

      if (user.id === parseInt(req.params.id)) {

        user.name = updateUser.name ? updateUser.name : user.name;

        user.email = updateUser.email ? updateUser.email : user.email;

        res.json({ msg: "Dept updated", user });

      }

    });

  } else {

    res.sendStatus(400);

  }

});

 

//Delete User

router.delete("/:id", (req, res) => {

  const found = depts.some(user => user.id === parseInt(req.params.id))

  if (found) {

    depts = depts.filter(user => user.id !== parseInt(req.params.id))

    res.json({

      msg: "Dept deleted",

      depts

    });

  } else {

    res.sendStatus(400);

  }

});

 

module.exports = router;