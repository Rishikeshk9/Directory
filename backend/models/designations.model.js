const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const designationSchema = new Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    image: {
      type: String,
      default:null
    },
  },
  { timestamps: true }
);

const Designations = mongoose.model("designations", designationSchema);
module.exports = Designations;
