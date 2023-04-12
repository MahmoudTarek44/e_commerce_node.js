import mongoose from "mongoose";

const productSchema: mongoose.Schema = new mongoose.Schema(
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
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		priceAfterDiscount: {
			type: Number,
			min: 0,
		},
		ratingAvg: {
			type: Number,
			min: 0,
			max: 5,
		},
		ratingCount: {
			type: Number,
			default: 0,
			min: 0,
		},
		description: {
			type: String,
			minLength: 5,
			maxLength: 300,
			required: true,
			trim: true,
		},
		quantity: {
			type: Number,
			default: 0,
			min: 0,
			required: true,
		},
		sold: {
			type: Number,
			default: 0,
			min: 0,
		},
		cover_img: {
			type: String,
		},
		random_imgs: [{ type: String }],
		category: {
			type: mongoose.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		subCategory: {
			type: mongoose.Types.ObjectId,
			ref: "SubCategory",
			required: true,
		},
	},
	{ timestamps: true }
);

const productModel: mongoose.Model<any> = mongoose.model(
	"Product",
	productSchema
);

export default productModel;
