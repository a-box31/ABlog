

import {
  getUserByID,
  getUserByEmail,
  createUser,
  deleteUserByID,
  getSession,
  createSession,
  deleteSession,
  updateUserAvatar,
  updateUserBio,
  getBlogs,
  createBlog,
  getUserBlogs,
  getBlogByID,
  updateBlog,
  followUser,
  unfollowUser,
  getUserFollowers,
  getUserFollowing,
} from "./database.js";

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import fs from "fs";

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const SERVER_DOMAIN = process.env.SERVER_DOMAIN;

const app = express();
dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, "public/images");
    } else if (file.mimetype.includes("video")) {
      cb(null, "public/videos");
    } else {
      cb(null, "public");
    }
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

// const storage = multer.memoryStorage();  // multer configuration
const upload = multer({ storage: storage }); // multer configuration


app.use(express.static("public"));
app.use(express.json());
app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

function isVideo(path){
  if(
    path.includes("mp4") ||
    path.includes("MP4") ||
    path.includes("webm") ||
    path.includes("WEBM") ||
    path.includes("ogg") ||
    path.includes("OGG") ||
    path.includes("ogv") ||
    path.includes("OGV") ||
    path.includes("avi") ||
    path.includes("AVI") ||
    path.includes("mov") ||
    path.includes("MOV") ||
    path.includes("flv") ||
    path.includes("FLV") ||
    path.includes("wmv") ||
    path.includes("WMV") ||
    path.includes("3gp") ||
    path.includes("3GP") ||
    path.includes("mkv") ||
    path.includes("MKV") ||
    path.includes("m4v") ||
    path.includes("M4V") ||
    path.includes("m4a") ||
    path.includes("M4A")
  ){
    return true;
  }else{
    return false;
  }
}

app.get("/myaccount", async (req, res) => {
  try {
    const sessionID = req.cookies.sessionID;
    const session = await getSession(sessionID);
    if (session == null) {
      res.status(401).send("Unauthorized");
      return;
    }
    const user = await getUserByID(session.user_id);
    if (user == null) {
      res.status(401).send("Unauthorized");
      return;
    }
    user.avatar = SERVER_DOMAIN + "/images/" + user.avatar;
    res.status(200).send(user);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});


app.delete("/myaccount", async (req, res) => {
  try {
    const { password } = req.body;

    // find the user session
    const sessionID = req.cookies.sessionID;
    const session = await getSession(sessionID);
    // ensure a session exists
    if (session == null) {
      res.status(401).send("Session Not Found");
      return;
    }

    // check if the password matches the sessionID
    const passwordMatch = await bcrypt.compare(password, session.token);
    if (!passwordMatch) {
      res.status(401).send("Wrong Password");
      return;
    }

    const blogsAreDeleted = await deleteUserBlogs(session.user_id);
    if (!blogsAreDeleted) {
      res.status(404).send("Blogs Not Found");
      return;
    }

    const sessionIsDeleted = await deleteSession(session.user_id);
    if (!sessionIsDeleted) {
      res.status(404).send("Session Not Found");
      return;
    } else {
      res.clearCookie("sessionID");
    }

    const userIsDeleted = await deleteUserByID(session.user_id);
    if (!userIsDeleted) {
      res.sendStatus(404).send("User Not Found");
      return;
    }

    res.status(200).send("User Deleted Successfully").end();
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});


app.put("/myaccount/avatar", upload.single("avatar"), async (req, res) => {
  try {
    const sessionID = req.cookies.sessionID;
    const session = await getSession(sessionID);
    if (session == null) {
      res.status(401).send("Session Not Found");
      return;
    }
    const userID = session.user_id;

    // delete the old avatar from the file system storage
    const user = await getUserByID(userID);
    if (user.avatar !== "default.png") {
      const oldAvatarPath = path.join(
        process.cwd(),
        "public/images",
        user.avatar
      );
      await fs.unlink(oldAvatarPath, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }
    // update the user avatar in the database
    const isUpdated = await updateUserAvatar(userID, req.file.filename);
    if (!isUpdated) {
      res.status(404).send("Something went wrong");
      return;
    }
    res.status(200).send("Profile Updated Successfully");
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});


app.put("/myaccount/bio", async (req, res) => {
  try {
    const sessionID = req.cookies.sessionID;
    const session = await getSession(sessionID);
    if (session == null) {
      res.status(401).send("Session Not Found");
      return;
    }
    const userID = session.user_id;

    const { bio } = req.body;
    const isUpdated = await updateUserBio(userID, bio);
    if (!isUpdated) {
      res.status(404).send("Something went wrong");
      return;
    }
    res.status(200).send("Bio Updated Successfully");
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.get("/myaccount/followers", async (req, res) => {
  try {
    const sessionID = req.cookies.sessionID;
    const session = await getSession(sessionID);
    if (session == null) {
      res.status(401).send("Session Not Found");
      return;
    }
    const userID = session.user_id;
    const followers = await getUserFollowers(userID);
    if (followers == null) {
      res.status(404).send("No Followers Found");
      return;
    }
    res.status(200).send(followers);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.get("/myaccount/following", async (req, res) => {
  try {
    const sessionID = req.cookies.sessionID;
    const session = await getSession(sessionID);
    if (session == null) {
      res.status(401).send("Session Not Found");
      return;
    }
    const userID = session.user_id;
    const following = await getUserFollowing(userID);
    if (following == null) {
      res.status(404).send("No Following Found");
      return;
    }
    res.status(200).send(following);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await getUserByID(req.params.id);
    if (user == null) {
      res.status(404).send("User Not Found");
      return;
    }
    user.avatar = SERVER_DOMAIN + "/images/" + user.avatar;
    res.send(user);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});


app.get("/users/:id/avatar", async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await getUserByID(userID);
    if (user == null) {
      res.status(404).send("User Not Found");
      return;
    }
    res.send(SERVER_DOMAIN + "/images/" + user.avatar);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});



app.get("/users/:id/bio", async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await getUserByID(userID);
    if (user == null) {
      res.status(404).send("User Not Found");
      return;
    }
    res.send(user.bio);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.post("/users/:id/follow", async (req, res) => {
  try {
    const sessionID = req.cookies.sessionID;
    const session = await getSession(sessionID);
    if (session == null) {
      res.status(401).send("Session Not Found");
      return;
    }
    const userID = session.user_id;
    const followedID = req.params.id;

    //user can not follow themselves
    if (userID == followedID) {
      res.status(400).send("You can not follow yourself");
      return;
    }

    // check if the user is already following the other user
    const isFollowing = await followUser(userID, followedID);
    if (isFollowing) {
      res.status(200).send("Followed Successfully");
    } else {
      res.status(404).send("Something went wrong");
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.post("/users/:id/unfollow", async (req, res) => {
  try {
    const sessionID = req.cookies.sessionID;
    const session = await getSession(sessionID);
    if (session == null) {
      res.status(401).send("Session Not Found");
      return;
    }
    const userID = session.user_id;
    const followedID = req.params.id;

    //user can not unfollow themselves
    if (userID == followedID) {
      res.status(400).send("You can not unfollow yourself");
      return;
    }

    // un-follow the user
    const unFollowed = await unfollowUser(userID, followedID);
    if (unFollowed) {
      res.status(200).send("Unfollowed Successfully");
    } else {
      res.status(404).send("Something went wrong");
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }

});

app.get("/users/:id/followers", async (req, res) => {
  try {
    const followedID = req.params.id;
    const followers = await getUserFollowers(followedID);
    if (followers == null) {
      res.status(404).send("No Followers Found");
      return;
    }
    res.status(200).send(followers);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.get("/users/:id/following", async (req, res) => {
  try {
    const userID = req.params.id;
    const following = await getUserFollowing(userID);
    if (following == null) {
      res.status(404).send("No Following Found");
      return;
    }
    res.status(200).send(following);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});


// BLOGS ######################################################################

app.get("/users/:id/blogs", async (req, res) => {
  try {
    const userID = req.params.id;
    const blogs = await getUserBlogs(userID);
    if (blogs == null) {
      res.status(404).send("No Blogs Found");
      return;
    }
    for (let i = 0; i < blogs.length; i++) {
      if ( isVideo(blogs[i].media) ) {
        blogs[i].media = SERVER_DOMAIN + "/videos/" + blogs[i].media;
      } else {
        blogs[i].media = SERVER_DOMAIN + "/images/" + blogs[i].media;
      }
    }
    res.status(200).send(blogs);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.get("/blogs", async (req, res) => {
  try {
    const search = req.query.search;
    const blogs = await getBlogs(search);
    if (blogs == null) {
      res.status(404).send("No Blogs Found");
      return;
    }
    for (let i = 0; i < blogs.length; i++) {
      if ( isVideo(blogs[i].media) ) {
        blogs[i].media = SERVER_DOMAIN + "/videos/" + blogs[i].media;
        blogs[i].avatar = SERVER_DOMAIN + "/images/" + blogs[i].avatar;
      } else {
        blogs[i].media = SERVER_DOMAIN + "/images/" + blogs[i].media;
        blogs[i].avatar = SERVER_DOMAIN + "/images/" + blogs[i].avatar;
      }
    }
    res.status(200).send(blogs);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.post("/blogs", upload.single("media"), async (req, res) => {
  try {
    const sessionID = req.cookies.sessionID;
    const session = await getSession(sessionID);
    if (session == null) {
      res.status(401).send("Session Not Found");
      return;
    }
    const userID = session.user_id;
    const user = await getUserByID(userID);
    if (user == null) {
      res.status(404).send("User Not Found");
      return;
    }
    const { title, content } = req.body;
    // save the post to the database
    const blog = await createBlog(userID, title, req.file.filename, content);
    if (blog == null) {
      res.status(404).send("Post not created");
      return;
    }
    res.status(201).send(blog);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.put("/blogs/:id", upload.single("media"), async (req, res) => {
  try {
    // find the user session to see if they have logged in
    const sessionID = req.cookies.sessionID;
    const session = await getSession(sessionID);
    if (session == null) {
      res.status(401).send("Session Not Found");
      return;
    }
    // get the user id of the session
    const userID = session.user_id;
    const user = await getUserByID(userID);
    if (user == null) {
      res.status(404).send("User Not Found");
      return;
    }
    // get the blog id from the request
    const blogID = req.params.id;
    // get the title and content from the request
    const { title, content } = req.body;

    // get the blog from the database
    const blog = await getBlogByID(blogID);
    if (blog == null) {
      res.status(404).send("Post Not Found");
      return;
    }

    // check if the user is the owner of the blog
    if (blog.owner_id != userID) {
      res.status(401).send("Unauthorized");
      return;
    }

    // delete the old media from the file system storage
    let oldMediaPath = "";
    // if the media is a video, delete it from the videos folder
    if (isVideo(blog.media)) {
      oldMediaPath = path.join(process.cwd(), "public/videos", blog.media);
    } else {
      oldMediaPath = path.join(process.cwd(), "public/images", blog.media);
    }
    await fs.unlink(oldMediaPath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    // save the post to the database
    const isUpdated = await updateBlog(
      blogID,
      title,
      req.file.filename,
      content
    );
    if (!isUpdated) {
      res.status(404).send("Post Not Updated");
      return;
    }
    res.status(200).send("Blog Successfully Updated!");
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// Authentication ##############################################################

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
        .cookie("sessionID", session.token, {
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

app.delete("/session", async (req, res) => {
  try {
    const sessionID = req.cookies.sessionID;
    const session = await getSession(sessionID);
    if (session == null) {
      res.status(404).send("Session Not Found");
      return;
    }
    const result = await deleteSession(session.user_id);
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

app.listen( PORT || 3000, () => {
  console.log(`Server is running on Server Domain: ${SERVER_DOMAIN}`);
});
