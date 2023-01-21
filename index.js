const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require("cors");

//import routers
const news = require("./routes/news");
const category = require("./routes/category");
const User = require("./routes/signin_signup");

//middleware
app.use(bodyParser());
app.use(cors());

// app.all('/*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });


app.use("/system",User)
app.use("/news", news);
app.use("/category", category);

//connect to DB
mongoose.connect(process.env.MYDB);
let db = mongoose.connection;

db.on("error", console.error.bind(console, "Database Connect Error"));
db.once("open", () => {
  console.log("Database Is Connect");
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`server is running in ${process.env.PORT || 3001}`);
});
