const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const randToken = require('rand-token');
const transporter = require('../configs/nodemailer.config')

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/view",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }


    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const confirmationCode = randToken.generate(25);

    const newUser = new User({
      username,
      password: hashPass,
      email,
      confirmationCode,
    });

    newUser.save()
      .then(() => {
        // // console.log("**************" + email + "**************")
        // // console.log(transporter)
        transporter.sendMail({
          from: `bAR <proyecto2ihpruebas@gmail.com>`,
          to: email,
          subject: "Confirmation mail",
          text: "Confirm",
          html: `<a href="http://localhost:3000/auth/activation/${confirmationCode}">Confirma tu cuenta</a>`
         
        })
          .then(info => console.log(info), res.redirect("/"))
          .catch(error => console.log(error));
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      })
  });
});

router.get("/activation/:confirmCode", (req, res) => {
  console.log("***********************" + req.params.confirmCode)
  User.findOneAndUpdate({ confirmationCode: req.params.confirmCode }, { $set: { active: true } }, { new: true })
    .then(() => {
      res.redirect("/view")
    }).catch(() => {
      console.log("Ha ocurrido un error")
    })
})





router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  }),
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/view',
    failureRedirect: '/login',
  }),
);


module.exports = router;
