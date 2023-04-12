import mongoose from "mongoose";

const subCategorySchema: mongoose.Schema = new mongoose.Schema(
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
		category: {
			type: mongoose.Types.ObjectId,
			ref: "Category",
		},
	},
	{ timestamps: true }
);

const subCategoryModel: mongoose.Model<any> = mongoose.model(
	"SubCategory",
	subCategorySchema
);

export default subCategoryModel;
