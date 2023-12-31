const shortid = require("shortid");
const URL = require("../models/url.js");

async function generateNewShortUrl(req, res) {
  const body = req.body;
  const shortId = shortid();
  if (!body) return res.status(400).json({ status: "URL is required" });
  await URL.create({
    shortId,
    redirectUrl: body.url.trim(),
    visitHistory: [],
    createdBy: req.user.id
  });
  const urls = await URL.find({createdBy:req.user.id});

  return res.render("home", {
    id: shortId,
    urls,
    port: req.app.get("port"),
    host: req.hostname,
  });
}
module.exports = { generateNewShortUrl };
