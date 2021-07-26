const express = require("express");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(cors());

//without moddifications

const database = {
  users: [
    {
      id: "0",
      name: "john",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "1",
      name: "sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
  login:[
    {
      id:'2',
      hash: '',
      email:'john@gmail.com'
    }
  ]
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  //bcrypt
  bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
  });
  //bcrypt
  database.users.push({
    id: "1",
    name: name,
    email: email,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if (!found) {
      res.status(400).json(' user not found');
  }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach((user) => {
      if (user.id === id) {
        found = true;
        user.entries++
        return res.json(user.entries);
      }
    })
    if (!found) {
        res.status(400).json(' user not found');
    }

})




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


