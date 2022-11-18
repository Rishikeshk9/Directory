const express = require("express");
const cors = require('cors');
var mongoose = require('mongoose');
const { MongoClient } = require('mongodb');



const app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri).then(()=>{
    console.log('connected to mongodb')
}).catch((err)=>{
    console.log(err)
})
const dbName = 'directory';

app.use("/api/users", require("./routes/api/users"));
app.use("/api/depts", require("./routes/api/depts"));
app.use("/api/types", require("./routes/api/types"));

app.listen(3005, () => console.log('Server started'));