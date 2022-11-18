const express = require("express");

const router = express.Router();

const multer = require("multer");
const path = require("path");
const uuid = require("uuid");
const Types = require("../../models/types.model");

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
  Types.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/",upload.single('image'), async (req, res) => {
  console.log("here");
  const { name } = req.body;
  const image = req.file.filename
  try {
    const type = new Types({ name: name, id: uuid.v4() ,image:image});
    await type.save();
    res.status(201).send("success");
  } catch (error) {
    res.status(501).send("something went wrong");
  }
});

// router.get("/:id", (req, res) => {
//   const found = types.some((type) => type.id === parseInt(req.params.id));

//   if (found) {
//     res.json(types.filter((type) => type.id === parseInt(req.params.id)));
//   } else {
//     res.sendStatus(400);
//   }
// });

// router.post("/", (req, res) => {
//   const newType = {
//     id: uuid.v4(),

//     name: req.body.name,

//     email: req.body.email,
//   };

//   if (!newType.name || !newType.email) {
//     return res.sendStatus(400);
//   }

//   types.push(newType);

//   res.json(types);
// });

//Update type

router.put("/:id", (req, res) => {
  const found = types.some((type) => type.id === parseInt(req.params.id));

  if (found) {
    const updateType = req.body;

    types.forEach((type) => {
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
  const found = types.some((type) => type.id === parseInt(req.params.id));

  if (found) {
    types = types.filter((type) => type.id !== parseInt(req.params.id));

    res.json({
      msg: "type deleted",

      types,
    });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
