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

brandSchema.post("init", (document) => {
	document.logo = `${process.env.BASE_URL}brand/${document.logo}`;
});

const brandModel: mongoose.Model<any> = mongoose.model("Brand", brandSchema);

export default brandModel;
