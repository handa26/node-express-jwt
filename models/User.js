const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

// TODO: Create schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please, enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: [true, "Please, enter an password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

// * Fire a function after doc saved to db
userSchema.post("save", function(doc, next) {
  console.log("new user was created & saved", doc);
  next();
});

// * Fire a function before doc saved to db
userSchema.pre("save", async function(next) {
  // * generate a salt
  const salt = await bcrypt.genSalt();
  // this keyword refers to user instance
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;