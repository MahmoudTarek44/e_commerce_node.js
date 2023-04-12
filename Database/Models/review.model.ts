import mongoose from "mongoose";

const reviewSchema: mongoose.Schema = new mongoose.Schema(
	{
		comment: {
			type: String,
			trim: true,
			required: true,
		},
		product: {
			type: mongoose.Types.ObjectId,
			ref: "Product",
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const reviewModel: mongoose.Model<any> = mongoose.model("Review", reviewSchema);

export default reviewModel;
