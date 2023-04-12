import mongoose from "mongoose";

const categorySchema: mongoose.Schema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			unique: true,
			required: true,
			minLength: 2,
		},
		slug: {
			type: String,
			lowercase: true,
			required: true,
		},
		image: {
			type: String,
		},
	},
	{ timestamps: true }
);

const categoryModel: mongoose.Model<any> = mongoose.model(
	"Category",
	categorySchema
);

export default categoryModel;
