const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeSchema = new Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Types = mongoose.model("types", typeSchema);
module.exports = Types;
