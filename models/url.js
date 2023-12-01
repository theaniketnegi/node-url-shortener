const mongoose = require("mongoose");
const shortid = require('shortid');

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
    default: shortid()
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  visitHistory: [{ timeStamp: { type: Number } }],
}, {timestamps:true});

const URL = mongoose.model("url", urlSchema);

module.exports = URL;