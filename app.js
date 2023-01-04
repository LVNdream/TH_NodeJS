const express = require("express");
const cros = require("cors");
const app = express();
app.use(cros());
app.use(express.json())
app.get("/", (req, res) => {
res.json({message:"Welcome contact book application."});
});

const contactsRouter = require("./app/routes/contact.route.js");

app.use("/api/contacts",contactsRouter)


module.exports = app;