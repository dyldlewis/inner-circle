import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const postSchema = new Schema({
	id: String,
	userId: String,
	imageKey: String,
	username: String,
	caption: String,
	postDate: String,
	createdAt: Date,
	updatedAt: Date,
})

const Post = model('Post', postSchema)

export default Post;
