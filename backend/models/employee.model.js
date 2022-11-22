const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    designation: {
      type: String,
    },
    department: {
      type: String,
    },
    mobile: {
      type: String,
    },
    mobile2: {
      type: String,
    },
    website: {
      type: String,
    },
    email: {
      type: String,
    },
    
    image: {
      type: String,
      default:null
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
