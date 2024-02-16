const express = require("express");
const path = require("path");
const cors = require("cors");
const volleyball = require("volleyball");
const app = express();

// middleware
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use(cors());
app.use(volleyball);

// api router
app.use("/api", require("./api"));

// catch-all
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// error handling here

module.exports = app;
