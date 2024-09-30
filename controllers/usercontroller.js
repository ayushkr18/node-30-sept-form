const bcrypt = require("bcrypt");
const User = require("../models/User");
const saltRounds = 10;

async function signUp(req, res) {
  try {
    // console.log(req.body, "req.body");
    let password = bcrypt.hashSync(req.body.password, saltRounds); // encrypt password
    // console.log(password, "password");
    let user = new User(req.body);
    user.password = password;

    await user.save();
    // res.end("<h1> Sign Up Successfully </h1>");
    res.redirect("/");
  } catch (err) {
    console.log(err.message);
  }
}

async function doLogin(req, res) {
  try {
    console.log(req.body, "req.body");

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.end("<h1> No such user Exists</h1>");
    } else {
      let isMatch = await bcrypt.compare(req.body.password, user.password); //decrypted password
      console.log(isMatch, "isMatch");

      if (isMatch) {
        // console.log("<h1> Login Successfull</h1>");
        res.end("<h1>Login Successfull</h1>");
      } else {
        // console.log("<h1>Incorrect Password</h1>");
        res.end("<h1>Incorrect Password</h1>");
      }
    }
    // res.end("<h1> Login is in process </h1>");
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  signUp,
  doLogin,
};
