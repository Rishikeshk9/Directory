const express = require("express");

const router = express.Router();
const multer = require("multer");
const path = require("path");
const uuid = require("uuid");
const Employee = require("../../models/employee.model");

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
  
  Employee.find()
  .then((employees) => res.json(employees))
  .catch((err) => res.status(400).json('Error: ' + err)); 

});  

router.post("/",upload.single('image'),async(req,res)=>{
  try {
    const {name,type,parent,mobile,mobile2,website,email,} = req.body;
    const image = req.file?.filename
    const employee = new Employee({id:uuid.v4(),name,type,parent,mobile,mobile2,website,email,image});
    await employee.save()
    res.send('success');

  } catch (error) {
    console.log(error)
    res.status(501).send('something went wrong')
  }
})

router.get("/:id", (req, res) => {

  const found = employees.some(employee => employee.id === parseInt(req.params.id));
 
  if (found) {

    res.json(employees.filter(employee => employee.id === parseInt(req.params.id)));

  } else {

    res.sendStatus(400);

  }

});

 

router.post("/", (req, res) => {

  const newEmployee = new employees({

    id: uuid.v4(),

    name: req.body.name,

    email: req.body.email,

    type:req.body.type,

    parent:req.body.parent,

    mobile:req.body.mobile,

    mobile2:req.body.mobile2,

    website:req.body.website,
    
    

  });

 

  if (!newEmployee.name || !newEmployee.email) {

    return res.sendStatus(400);

  }


  console.log("Adding...");
  newEmployee
    .save()
    .then(() => res.json('Employee added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
 

});

//Update User

router.put("/:id", (req, res) => {

  const found = employees.some(user => user.id === parseInt(req.params.id));

  if (found) {

    const updateUser = req.body;

    employees.forEach(employee => {

      if (employee.id === parseInt(req.params.id)) {

        employee.name = updateEmployee.name ? updateEmployee.name : employee.name;

        employee.email = updateEmployee.email ? updateEmployee.email : employee.email;

        res.json({ msg: "Employee updated", employee });

      }

    });

  } else {

    res.sendStatus(400);

  }

});

 

//Delete User

router.delete("/:id", (req, res) => {

  const found = employees.some(employee => employee.id === parseInt(req.params.id))

  if (found) {

    employees = employees.filter(employee => employee.id !== parseInt(req.params.id))

    res.json({

      msg: "Employee deleted",

      employees

    });

  } else {

    res.sendStatus(400);

  }

});

 

module.exports = router;