import { getAuthHeader } from "../../Middlewares/authentication.middleware";
import validation from "../../Middlewares/validation.middleware";
import fileUpload from "../../Utilities/file_uploader";
import * as User from "./user.controller";
import express from "express";
import {
	signUpSchema,
	signInSchema,
	updateInfoSchema,
} from "./user.validation";

const userRouter = express.Router();

userRouter
	.route("/")
	.get(getAuthHeader, User.getAllUsers)
	.post(
		fileUpload("profile_picture", "Users"),
		validation(signUpSchema, "body"),
		User.registerUser
	);

userRouter
	.route("/:id")
	.get(getAuthHeader, User.getOneUser)
	.delete(getAuthHeader, User.deleteUser)
	.put(
		getAuthHeader,
		fileUpload("profile_picture", "Users"),
		validation(updateInfoSchema, "body"),
		User.updateUser
	);

userRouter.post("/login", validation(signInSchema, "body"), User.loginUser);
userRouter.put("/deactivate/:id", getAuthHeader, User.deactivateUser);
userRouter.get("/profile", getAuthHeader, User.getCurrentUser);
userRouter.get("/verify", User.verifyUser);

export default userRouter;
