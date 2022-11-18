const express = require("express");

const router = express.Router();
const multer = require("multer");
const path = require("path");
const uuid = require("uuid");
const Department = require("../../models/department.model");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuid.v4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req,file,cb)=>{
  const allowedFileTypes = ['image/jpeg','image/jpg','image/png'];
  if(allowedFileTypes.includes(file.mimetype)){
    cb(null,true)
  }else{
    cb(null,false)
  }
}

let upload = multer({storage,fileFilter})

router.get("/", (req, res) => {
  
  Department.find()
  .then((users) => res.json(users))
  .catch((err) => res.status(400).json('Error: ' + err)); 

});  

router.post("/",upload.single('image'),async(req,res)=>{
  try {
    const {name,type,parent,mobile,mobile2,website,email,address1,address2,pincode,state} = req.body;
    const image = req.file.filename
    const depart = new Department({id:uuid.v4(),name,type,parent,mobile,mobile2,website,email,address1,address2,pincode,state,image});
    await depart.save()
    res.send('success');

  } catch (error) {
    console.log(error)
    res.status(501).send('something went wrong')
  }
})

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