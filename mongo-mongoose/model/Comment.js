import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const commentSchema = new Schema({
	id: String,
	userId: String,
	photoId: String,
	text: String,
	postDate: String,
	createdAt: Date,
	updatedAt: Date,
})

const Comment = model('Comment', commentSchema)

export default Comment;
