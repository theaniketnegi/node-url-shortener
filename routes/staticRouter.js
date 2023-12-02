const express = require("express");
const URL = require("../models/url.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const urls = await URL.find({});

  return res.render("home", {
    urls,
    port: req.app.get("port"),
    host: req.hostname,
  });
});

module.exports = router;
