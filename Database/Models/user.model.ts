import mongoose from "mongoose";

const userSchema: mongoose.Schema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			minLength: 2,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			minLength: 2,
		},
		password: {
			type: String,
			required: true,
			minLength: 8,
		},
		phone: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
			required: true,
		},
		age: {
			type: Number,
			required: true,
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

const userModel = mongoose.model("User", userSchema);

export default userModel;
