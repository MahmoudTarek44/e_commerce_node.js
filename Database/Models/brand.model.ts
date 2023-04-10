import mongoose from "mongoose";

const brandSchema: mongoose.Schema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			minLength: 2,
			unique: true,
		},
		slug: {
			type: String,
			lowercase: true,
			required: true,
		},
		logo: {
			type: String,
		},
	},
	{ timestamps: true }
);

const brandModel = mongoose.model("Brand", brandSchema);

export default brandModel;
