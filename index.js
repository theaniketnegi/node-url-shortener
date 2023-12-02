const express = require("express");
const urlRoute = require("./routes/url.js");
const URL = require("./models/url.js");
const path = require('path');
const staticRoute = require('./routes/staticRouter.js');
const { connectDb } = require("./connect.js");

const PORT = 8001;
const MONGO_URL = "";

connectDb(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.set('port', PORT);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/url", urlRoute);
app.use('/', staticRoute);
app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const data = await URL.findOneAndUpdate(
    { shortId: id },
    { $push: { visitHistory: { timeStamp: Date.now() } } }
  );
  if (!data) return res.status(404).json({ msg: "Not found!" });

  const url =
    data.redirectUrl.startsWith("https://") ||
    data.redirectUrl.startsWith("http://")
      ? data.redirectUrl
      : `https://${data.redirectUrl}`;
  return res.redirect(url);
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
