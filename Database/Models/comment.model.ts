import mongoose from "mongoose";

const commentSchema: mongoose.Schema = new mongoose.Schema(
	{
		comment: {
			type: String,
			required: true,
			minLength: [2, "comment content is too short!"],
		},
		createdBy: { type: mongoose.Types.ObjectId, ref: "user", required: true },
		postId: { type: mongoose.Types.ObjectId, ref: "post", required: true },
	},
	{
		timestamps: true,
	}
);

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
