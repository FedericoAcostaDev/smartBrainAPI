const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test",
    database: "smartbrain",
  },
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(cors());
app.use(bodyParser.json());

//without moddifications

app.get("/", (req, res) => { res.send(database.users) })
app.post("/signin", signin.handleSignin(db, bcrypt)) //trying a cleaner look
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get("/profile/:id", (req, res)=> {profile.handleProfileGet(req, res, db)})
app.put("/image", (req, res) => { image.handleImage(req, res, db)})

/*/ Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
  // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
  // res = false
});
*/

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
