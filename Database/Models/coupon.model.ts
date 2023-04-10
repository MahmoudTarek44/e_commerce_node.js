import mongoose from "mongoose";

const couponSchema: mongoose.Schema = new mongoose.Schema(
	{
		code: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		discount: {
			type: Number,
			min: 0,
			required: true,
		},
		expire: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true }
);

const couponModel = mongoose.model("Coupon", couponSchema);

export default couponModel;
