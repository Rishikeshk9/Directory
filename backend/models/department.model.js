const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  }, 
  
} ,{ timestamps: true });

const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;