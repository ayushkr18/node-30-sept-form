const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamps");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  mobileNo: { type: String },
  createdAt: Date,
  updatedAt: Date,
});

UserSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model("User", UserSchema);
