import mongoose from 'mongoose'
import cors from 'cors'
import express from 'express'
import User from './model/User.js'
import Post from './model/Post.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer'
import { uploadFile, getFileStream } from './s3.js'
import fs from 'fs'
import util from 'util'
import getDate from './utils/getDate.js'


// MongoDB connection configuration
const dbUser = process.env.MONGO_DB_USER
const dbPass = process.env.MONGO_DB_PASSWORD
const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.alr3n8g.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(uri)

const app = express();
app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE', // Specify the allowed HTTP methods
  allowedHeaders: 'Content-Type, Authorization'
}));
///////////////////////////////////////

// Express configuration
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const port = 3001;
///////////////////////////////////////
app.get('/', (req, res) => {
  const response = {
    greeting: "Hello"
  }
  res.send(response)
})

app.post('/sign-up', async (req, res) => {

  const password = req.body.password
  const username = req.body.email

  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = new User({
    id: uuidv4(),
    username: username,
    password: hashedPassword,
    bio: "",
  })

  const result = {
    serverStatus: "user has been created"
  }
  await user.save();
  res.send(result)
})

app.post('/authenticate', async (req, res) => {

  const password = req.body.password
  const username = req.body.email

  const user = await User.findOne({ username: username })

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (passwordMatch) {
      console.log(user)
      const userToken = {
        username: user.username,
        bio: user.bio,
        id: user.id
      }
      const token = jwt.sign(userToken, process.env.JWT_SECRET)
      res.json({ token })
      console.log('Authentication successful')
    } else {
      console.log("Invalid password")
    }
  } else {
    console.log("User not found")
  }
})

app.get('/profile', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  try {
    const dt = jwt.verify(token, process.env.JWT_SECRET)
    const user = {
      id: dt.id,
      username: dt.username,
      bio: dt.bio,
    }
    const userPosts = await Post.find({ userId: user.id })
    console.log(userPosts)
    res.send({ username: user.username, userPosts: userPosts, bio: user.bio })
  } catch (err) {
    res.sendStatus(401)
  }
})


app.post('/bio', async (req, res) => {

  const token = req.headers.authorization.split(' ')[1]
  const newBio = req.body.bio
  try {
    const dt = jwt.verify(token, process.env.JWT_SECRET)
    const user = {
      id: dt.id,
    }
    const userBio = await User.updateOne(
      { id: user.id },
      { $set: { bio: newBio } }
    );
  } catch (error) {
    console.log('error updating bio')
  }


  res.send('bio saved successfully')



})
//upload logic

const upload = multer({ dest: 'post/' })
const unlinkFile = util.promisify(fs.unlink)

app.post('/upload', upload.single('image'), async (req, res) => {
  const file = req.file
  const result = await uploadFile(file)
  console.log(result)
  await unlinkFile(file.path)

  const token = req.headers.authorization.split(' ')[1]



  try {
    const dt = jwt.verify(token, process.env.JWT_SECRET)
    const user = {
      id: dt.id,
      username: dt.username,
      bio: dt.bio,
    }
    const post = new Post({
      id: uuidv4(),
      userId: user.id,
      username: user.username,
      imageKey: result.Key,
      caption: "",
      postDate: getDate(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    await post.save();
  } catch (err) {
    res.sendStatus(401)
  }
})

app.get('/home/', async (req, res) => {
  const feed = await Post.find();
  const newFeed = feed.reverse();

  var photos = [];
  for (var i = 0; i < newFeed.length; i++) {
    photos.push({ imageKey: newFeed[i].imageKey, userName: newFeed[i].username, postedAt: newFeed[i].postDate })
  }
  res.send({ photos: photos })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
