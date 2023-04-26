import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

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
		changePassTime: {
			type: Date,
			default: 0,
		},
		logOutTime: {
			type: Date,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.post("init", (document) => {
	if (document.profile_picture)
		document.profile_picture = `${process.env.BASE_URL}Users/${document.profile_picture}`;
});

userSchema.pre("save", function () {
	this.password = bcrypt.hashSync( this.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS as string, 10));
});

userSchema.pre("findOneAndUpdate", function () {
	console.log(this);
	// if(this._update.password)
	// 	this.update.password = bcrypt.hashSync( this._update.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS as string, 10));
});

const userModel: mongoose.Model<any> = mongoose.model("User", userSchema);

export default userModel;
