import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
    try {
        // .find() is used to find particular data from the MongoDB database
        const postMessage = await PostMessage.find()
        console.log(postMessage)

        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
    const post = req.body

    const newPost = new PostMessage(post)

    try {
        // used to save the document to the database
        await newPost.save()

        res.status(201).json(newPost)
    }catch (error){
        res.status(409).json({message: error.message})
    }
}