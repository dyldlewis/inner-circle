import mongoose from 'mongoose'
import cors from 'cors'
import express from 'express'
import User from './model/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const dbUser = process.env.MONGO_DB_USER
const dbPass = process.env.MONGO_DB_PASSWORD

const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.alr3n8g.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri)

const app = express();
app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE', // Specify the allowed HTTP methods
  allowedHeaders: 'Content-Type, Authorization'
}));

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

const port = 3001;

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
      const userToken = {
        username: user.username,
        bio: user.bio,
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


