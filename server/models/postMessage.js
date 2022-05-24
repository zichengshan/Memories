import mongoose from "mongoose"

//A Mongoose schema defines the structure of the document, default values, validators, etc.,
// whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.
const postSchema = mongoose.Schema({
    name: String,
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage