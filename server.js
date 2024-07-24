import express from "express";
import { getUsers, getUser, createUser } from "./database.js";

const app = express();

app.get("/users", async (req, res) => {
    const users = await getUsers();
    res.send(users);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});