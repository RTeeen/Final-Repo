const mongoose = require("mongoose");
const {Schema} = mongoose;
const userModel = new Schema({
  first_name: {type: String},
  last_name: {type: String},
  profession: {type: String},
  hasDegree: {type: Boolean, default: false},
});
module.exports = mongoose.model("User", userModel);