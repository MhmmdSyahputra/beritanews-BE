const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//import routers
const news = require("./routes/news");
const category = require("./routes/category");
const registrasi = require("./routes/signin_signup");

//middleware
app.use(bodyParser());
app.use(cors());

// app.all('/*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

// router.post("/login", async (req, res) => {
//   // Cari pengguna dengan email yang diberikan
//   const user = await User.findOne({ email: req.body.email });

//   // Jika pengguna tidak ditemukan, kirimkan pesan error
//   if (!user) return res.status(400).send("Email or password is invalid");

//   // Jika pengguna ditemukan, lakukan verifikasi password
//   const validPassword = await bcrypt.compare(req.body.password, user.password);

//   // Jika password tidak cocok, kirimkan pesan error
//   if (!validPassword) return res.status(400).send("Email or password is invalid");

//   // Jika password cocok, buat token dan kirimkan kembali ke client
//   const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
//   res.send(token);
// });


app.use("/system",registrasi)
app.use("/news", news);
app.use("/category", category);

//connect to DB
mongoose.connect("mongodb://localhost:27017/PortalBerita");
let db = mongoose.connection;

db.on("error", console.error.bind(console, "Database Connect Error"));
db.once("open", () => {
  console.log("Database Is Connect");
});

app.listen(3003, () => {
  console.log("server is running in 3003");
});
