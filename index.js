const express = require("express");
const jwt = require("jsonwebtoken")
const jwtpassword = "123456";
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const mongourl = process.env.MONGO_URI;

app.use(express.json());

mongoose.connect(mongourl)
const User = mongoose.model('Users', { name: String, email: String, password: String });
const user = new User({
    email: "hero332@gmail.com",
    password: "abcd",
        name: "hero 3"
})
user.save();
function userExists(username, password) {
    let userExists = false;
    for (let i = 0; i < ALL_USERS.length; i++){
        if (ALL_USERS[i].username == username && ALL_USERS[i].password == password) {
            userExists=true
        }
    }


    return userExists;
}
app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!userExists(username, password)) {
        return res.status(403).json({
            msg: " user doesn's exist in database",
        });
    }
    var token = jwt.sign({ username: username},jwtpassword);
    return res.json({
        token,
    });
});

app.get("/users", (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, jwtpassword);
  const username = decoded.username;
  res.json({
      users: ALL_USERS.filter((value) => {
          if (value.username == username) {
              return false;
          }
          else {
              return true;
          }
      })
  })
})


app.listen(3001, (req, res) => {
    console.log("running the server");
})