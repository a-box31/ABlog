import { getUsers, getUserByID, getUserByEmail, createUser, deleteUserByID, getSession, createSession, deleteSession } from "./database.js";

import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
    const account = await getUserByEmail(email);

    // user not found
    if (account == null) {
      res.status(404).send("Email not found");
      return;
    }
    // check if the password is correct
    const passwordMatch = await bcrypt.compare(password, account.password);

    // if the password is correct, send the user object
    if (passwordMatch) {
      // create a new session for the user 
      const sessionID = await bcrypt.hash(password, 10);
      const session = await createSession(account.id, sessionID);

      // return the to the cookie of the session to the client 
      res
        .cookie("sessionID", session.token , {
          // expires: new Date( Date.now() + process.env.COOKIE_EXPIRY * 1 ),
          httpOnly: false,
          secure: true,
          withCredentials: true,
          sameSite: "none",
        })
        .status(200)
        .send(`Authenticated as ${account.username}`);

      
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

app.delete("/users", async (req, res) => {
  try {
    const { password } = req.body;

    // find the user session
    const sessionID = req.cookies.sessionID;
    const session = await getSession(sessionID);

    // ensure a session exists
    if (session == null) {
      res.status(401).send("Unauthorized");
      return;
    }

    // check if the password matches the sessionID
    const passwordMatch = await bcrypt.compare(password, session.token);
    if(!passwordMatch){
      res.status(401).send("Wrong Password");
      return;
    }

    const sessionIsDeleted = await deleteSession(sessionID);
    if (!sessionIsDeleted) {
      res.status(404).send("Session Not Found");
      return;
    }else{
      res.clearCookie("sessionID");
    }

    const userIsDeleted = await deleteUserByID(session.user_id);
    if (!userIsDeleted) {
      res.sendStatus(404).send("User Not Found")
      return;
    }

    res.status(200).send("User Deleted Successfully").end();

  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.delete("/session", async (req, res) => {
  try {
    const sessionID = req.cookies.sessionID;
    const result = await deleteSession(sessionID);
    if (result) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen( PORT || 3000 , () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
