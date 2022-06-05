const express = require("express");
const { login, register } = require("./controllers/auth.controller");
const app = express();
const cors = require("cors");

app.use(express.json()); // parse json
app.use(cors());

app.use("/api/artists", require("./controllers/artist.controller")); // artist routes
app.use("/api/songs", require("./controllers/song.controller")); // song routes
app.post("/register", register); // register user
app.post("/login", login); // login user

module.exports = app;
