const express = require("express");
const URL = require("../models/url.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const user = req.user;
  if(!user) return res.redirect('/login');
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
