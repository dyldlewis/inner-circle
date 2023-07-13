import mongoose from 'mongoose';

const {Schema, model } = mongoose;

const userSchema = new Schema({
	id: String,
	username: String,
	password: String,
	bio: String,
	pfp: String,
	likes: Array,
	createdAt: Date,
	updatedAt: Date,
})

const User = model('User', userSchema)

export default User;
