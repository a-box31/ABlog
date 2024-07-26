import express from "express";
import cors from "cors";
import { getUsers, getUser, createUser } from "./database.js";

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

app.post('/login', (req, res) => {
  const { email, password } = req.body;

});

app.post('/register', async (req, res) => {
  const {username, email, password} = req.body
  const user = await createUser(username, password, email);
  if(user != null) {
    // user created successfully 
    res.sendStatus(201);
  }else{
    // failed to create user
    res.sendStatus(500);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});