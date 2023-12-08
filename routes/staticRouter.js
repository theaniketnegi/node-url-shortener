const express = require("express");
const URL = require("../models/url.js");
const { restrictToRole } = require("../middlewares/auth.js");

const router = express.Router();

router.get('/admin/urls', restrictToRole(["ADMIN"]), async (req, res)=>{
  const urls = await URL.find({});

  return res.render("home", {
    urls,
    port: req.app.get("port"),
    host: req.hostname,
  });
})

router.get("/", restrictToRole(['NORMAL', 'ADMIN']),async (req, res) => {
  const user = req.user;
  console.log(user);
  const urls = await URL.find({ createdBy: user.id });

  return res.render("home", {
    urls,
    port: req.app.get("port"),
    host: req.hostname,
  });
});

router.get('/signup', (req, res)=>{
  res.render('signup');
})

router.get('/login', (req, res)=>{
  res.render('login');
})
module.exports = router;
