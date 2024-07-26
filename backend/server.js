import { getUsers, getUserByID, getUserByEmail, createUser } from "./database.js";

import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// app.get("/users", async (req, res) => {
//     const users = await getUsers();
//     res.send(users);
// });

// app.get("/users/:id", async (req, res) => {
//   const id = req.params.id;
//   const user = await getUser(id);
//   res.send(user);
// });

// app.post("/users", async (req, res) => {
//     const { username, password, email, gender } = req.body
//     const user = await createUser(username, password, email, gender);
//     res.status(201).send(user);
// })

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    // user not found
    if (user == null) {
      res.status(404).send("Email not found");
      return;
    }
    // check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    // if the password is correct, send the user object
    if (passwordMatch) {
      // create a new session for the user 

      // return the to the cookie of the session to the client 
      
      res.status(200).send(user);
    } else {
      res.status(401).send("Incorrect password");
    }

  } catch (e) {
    console.error(e);
    // internal server error
    res.sendStatus(500);
  }

});

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, hashedPassword, email);
    if (user != null) {
      // user created successfully
      res.sendStatus(201);
    } else {
      // failed to create user / email already exists
      res.status(403).send("Email already exists");
    }
  } catch (e) {
    console.error(e);
    // internal server error
    res.status(500).send("Internal server error");  
  }

});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});