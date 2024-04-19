const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
app.use(express.json());

app.get("/", (req, res) => {
    res.send("backend intern  create");
})

app.listen(port, (req, res) => {
    console.log("working fine on port " + port);
})