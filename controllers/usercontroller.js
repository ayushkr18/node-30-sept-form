const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const User = require("../models/User");
const saltRounds = 10;

async function signUp(req, res) {
  try {
    console.log(req.body);
    console.log("------------------------");
    console.log(req.file);

    cloudinary.config({
      cloud_name: "doynk4gcv",
      api_key: "589569667338739",
      api_secret: "7_qib4pC067Hitjg6E1yJ_3w1No",
    });
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result, "result....");
    // res.end("<h1> File submission is in process </h1>");

    // console.log(req.body, "req.body");
    let password = bcrypt.hashSync(req.body.password, saltRounds); // encrypt password
    // console.log(password, "password");
    let user = new User(req.body);
    user.password = password;
    user.profileImage = result.secure_url;

    await user.save();
    // res.end("<h1> Sign Up Successfully </h1>");
    res.redirect("/");
  } catch (err) {
    console.log(err.message, "msg");
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

async function getUsers(req, res) {
  try {
    let users = await User.find({});
    console.log(users);
    res.render("userlist", {
      users: users,
    });
  } catch (err) {
    console.log(err.message, "msg");
  }
}
module.exports = {
  signUp,
  doLogin,
  getUsers,
};
