import express from 'express'
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from "./routes/posts.js"


const app = express()
dotenv.config()

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors());

// Connect to the database

app.use('/posts', postRoutes)

// const PORT = process.env.PORT|| 4000

app.get('/', (req, res) => {
    res.send('Hello to Memories API')
})

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(process.env.PORT|| 4000, () => console.log(`Server Running on Port: http://localhost:4000`)))
    .catch((error) => console.log(`${error} did not connect`))
