const express = require("express");
const URL = require("./models/url.js");
const path = require('path');
const { connectDb } = require("./connect.js");
const cookieParser = require('cookie-parser');
const {restrictToLoggedInUser, checkAuth} = require('./middlewares/auth');
const urlRoute = require("./routes/url.js");
const staticRoute = require('./routes/staticRouter.js');
const userRoute = require("./routes/user.js");

const PORT = 8001;
const MONGO_URL = "mongodb://127.0.0.1:27017";

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
app.use(cookieParser());
app.use("/url", restrictToLoggedInUser, urlRoute);
app.use('/', checkAuth,staticRoute);
app.use('/user', userRoute);

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
