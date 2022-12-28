const express = require("express");
const cros = require("cors");
const app = express();
app.use(cros());
app.use(express.json())
app.get("/", (req, res) => {
res.json({message:"Welcome contact book application."});
});
module.exports = app;