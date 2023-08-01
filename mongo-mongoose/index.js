import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import User from "./model/User.js";
import Post from "./model/Post.js";
import Comment from "./model/Comment.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { uploadFile, getFileStream } from "./s3.js";
import fs from "fs";
import util from "util";
import getDate from "./utils/getDate.js";
import { requireAuth } from "./auth/requireAuth.js";

// MongoDB connection configuration
const dbUser = process.env.MONGO_DB_USER;
const dbPass = process.env.MONGO_DB_PASSWORD;
const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.alr3n8g.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri);

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE", // Specify the allowed HTTP methods
    allowedHeaders: "Content-Type, Authorization",
  })
);
///////////////////////////////////////

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3001;
///////////////////////////////////////
app.get("/", (req, res) => {
  const response = {
    greeting: "Hello",
  };
  res.send(response);
});

app.post("/sign-up", async (req, res) => {
  const password = req.body.password;
  const username = req.body.email;
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    id: uuidv4(),
    username: username,
    password: hashedPassword,
    bio: "",
    pfp: "",
    likes: [],
  });
  const result = {
    serverStatus: "user has been created",
  };
  await user.save();
  res.send(result);
});

app.post("/authenticate", async (req, res) => {
  const password = req.body.password;
  const username = req.body.email;
  const user = await User.findOne({ username: username });

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      console.log(user);
      const userToken = {
        username: user.username,
        bio: user.bio,
        id: user.id,
        pfp: user.pfp,
      };
      const token = jwt.sign(userToken, process.env.JWT_SECRET);
      res.json({ token });
      console.log("Authentication successful");
    } else {
      console.log("Invalid password");
    }
  } else {
    console.log("User not found");
  }
});

app.get("/profile", requireAuth, async (req, res) => {
  try {
    const userId = req.decodedToken.id;
    const profile = await User.findOne({ id: userId });
    const userPosts = await Post.find({ userId: userId });
    res.send({
      username: profile.username,
      userPosts: userPosts.reverse(),
      bio: profile.bio,
      pfp: profile.pfp,
    });
  } catch (err) {
    res.sendStatus(401);
  }
});

app.post("/bio", requireAuth, async (req, res) => {
  const newBio = req.body.bio;
  try {
    const userBio = await User.updateOne(
      { id: req.decodedToken.id },
      { $set: { bio: newBio } }
    );
  } catch (error) {
    console.log("error updating bio");
  }
  res.send("bio saved successfully");
});
//upload logic

const upload = multer({ dest: "post/" });
const unlinkFile = util.promisify(fs.unlink);

app.post("/upload", requireAuth, upload.single("image"), async (req, res) => {
  const file = req.file;
  const result = await uploadFile(file);
  await unlinkFile(file.path);

  try {
    const user = req.decodedToken;
    const post = new Post({
      id: uuidv4(),
      userId: user.id,
      username: user.username,
      imageKey: result.Key,
      caption: req.body.alt,
      likes: [],
      postDate: getDate(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    await post.save();
  } catch (err) {
    res.sendStatus(401);
  }
  res.send("Upload Successful");
});

app.post("/pfp", requireAuth, upload.single("image"), async (req, res) => {
  const file = req.file;
  const result = await uploadFile(file);
  console.log(result);
  await unlinkFile(file.path);
  try {
    const user = req.decodedToken;
    const pfpUpdate = await User.updateOne(
      { id: user.id },
      { $set: { pfp: result.Key } }
    );
  } catch (err) {
    res.sendStatus(401);
  }
});

app.get("/home/", async (req, res) => {
  const feed = await Post.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "id",
        as: "userDetails",
      },
    },
    {
      $unwind: "$userDetails",
    },
    {
      $project: {
        _id: 0,
        id: 1,
        userId: 1,
        imageKey: 1,
        username: 1,
        caption: 1,
        likes: 1,
        postDate: 1,
        createdAt: 1,
        updatedAt: 1,
        __v: 1,
        pfp: "$userDetails.pfp",
      },
    },
  ]);

  const newFeed = feed.reverse();
  var photos = [];
  for (var i = 0; i < newFeed.length; i++) {
    photos.push({
      imageKey: newFeed[i].imageKey,
      userName: newFeed[i].username,
      postedAt: newFeed[i].postDate,
      caption: newFeed[i].caption,
      pfp: newFeed[i].pfp,
      id: newFeed[i].id,
      likes: newFeed[i].likes
    });
  }
  res.send({ photos: photos });
});

app.post("/likePost", requireAuth, async (req, res) => {
  console.log(req.body)
  const likedPost = req.body.post;
  if (req.body.action === false) {
    try {
      const likePost = await Post.updateOne(
        { id: likedPost.id },
        { $push: { likes: req.decodedToken.id } }
      );
      const addLikeToUser = User.updateOne(
        { id: req.decodedToken.id },
        { $push: { likes: likedPost.id } }
      )
    } catch (error) {
      console.log("Error liking photo");
    }
  } else {
    try {
      const unlikePost = await Post.updateOne(
        { id: likedPost.id },
        { $pull: { likes: req.decodedToken.id } }
      );
      const deleteLikeToUser = User.updateOne(
        { id: req.decodedToken.id },
        { $pull: { likes: likedPost.id } }
      )
    } catch (error) {
      console.log("Error deleting like");
    }
    console.log(likedPost)
  }


  res.send("Photo successfully liked");
})

app.post("/comment", requireAuth, async (req,res) => {
  const user = req.decodedToken
  try {
    const comment = new Comment({
      id: uuidv4(),
      userId: user.id,
      username: user.username,
      text: req.body.comment,
      photoId: req.body.id,
      postDate: getDate(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    await comment.save();
  } catch (err) {
    console.log(err)
  }

  console.log(req.body)

  res.send("you got me!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
