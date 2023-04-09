import mongoose from "mongoose";

const userSchema: mongoose.Schema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, "User name is required!"],
			minLength: [2, "User name is too short!"],
		},
		email: {
			type: String,
			required: [true, "User email is required!"],
			unique: [true, "User email must be unique!"],
			minLength: [2, "User email is too short!"],
		},
		password: {
			type: String,
			required: true,
			minLength: [8, "User password is too short, min length 8 chars!"],
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
			required: true,
		},
		age: {
			type: Number,
			required: [true, "User age is required!"],
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		profile_picture: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
