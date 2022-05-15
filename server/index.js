import express from 'express'
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from 'cors'

import postRoutes from "./routes/posts.js"

const app = express()

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors());

// Connect to the database
const CONNECTION_URL = 'mongodb+srv://zichengS:1234567890@cluster0.dega9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT|| 4000

app.use('/posts', postRoutes)

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`))
