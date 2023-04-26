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

subCategorySchema.post("init", (document) => {
	document.image = `${process.env.BASE_URL}subCategory/${document.image}`;
});

const subCategoryModel: mongoose.Model<any> = mongoose.model(
	"SubCategory",
	subCategorySchema
);

export default subCategoryModel;
