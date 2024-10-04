const express = require("express");
const multer = require("multer");
const usercontroller = require("../controllers/usercontroller");
const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({}),
  limits: {fileSize: 10 * 1024 * 1024 },
});

router.use(express.urlencoded({ extended: false }));
router.get("/", (req, res) => {
  res.render("home");
});

router.get("/signup/window", (req, res) => {
  res.render("signuppage.ejs");
});

router.post("/signup", upload.single('profileImage'), (req, res) => {
  usercontroller.signUp(req, res);
});

router.post("/login", (req, res) => {
  usercontroller.doLogin(req, res);
});

router.get("/users", (req,res)=>{
  usercontroller.getUsers(req, res);
})
module.exports = router;
