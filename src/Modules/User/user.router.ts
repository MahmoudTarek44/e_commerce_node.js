import checkAuthentication from "../../Middlewares/authentication.middleware";
import validation from "../../Middlewares/validation.middleware";
import { uploadSingle } from "../../Utilities/file_uploader";
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
	.get(User.getAllUsers)
	.post(
		uploadSingle("profile_picture", "Users"),
		validation(signUpSchema, "body"),
		User.registerUser
	);
userRouter
	.route("/:id")
	.get(checkAuthentication, User.getOneUser)
	.delete(checkAuthentication, User.deleteUser)
	.patch(checkAuthentication, User.deactivateUser)
	.put(
		checkAuthentication,
		uploadSingle("profile_picture", "Users"),
		validation(updateInfoSchema, "body"),
		User.updateUser
	);
userRouter.post("/login", validation(signInSchema, "body"), User.loginUser);
userRouter.get("/profile", checkAuthentication, User.getCurrentUser);
userRouter.patch("/changePassword/:id", User.changeUserPassword);
userRouter.get("/verify/:token", User.verifyUser);

export default userRouter;
