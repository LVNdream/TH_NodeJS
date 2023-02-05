const express = require("express");
const cros = require("cors");
const app = express();
const ApiError = require("./app/api-error")
app.use(cros());
app.use(express.json())
app.get("/", (req, res) => {
    res.json({ message: "Welcome contact book application." });
});

const contactsRouter = require("./app/routes/contact.route.js");

app.use("/api/contacts", contactsRouter);

//  cai dat cac xu li loi
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found !!!"));
});

app.use((err, req, res, next) => {

    return res.status(Error.statusCode || 500).json({ message: Error.message || "Internal Server Error", });
});

module.exports = app;