import mongoose from "mongoose";

const postSchema: mongoose.Schema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
			minLength: [2, "Post content is too short!"],
		},
		image: { type: String },
		likes: { type: Number, default: 0 },
		status: {
			type: String,
			enum: ["public", "private"],
			default: "public",
			required: true,
		},
		createdBy: { type: mongoose.Types.ObjectId, ref: "user", required: true },
		comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
	},
	{
		timestamps: true,
	}
);

const postModel = mongoose.model("post", postSchema);

export default postModel;
