// Modules
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

// Helpers
import { AppError, asyncErrorHandler } from "../../Utilities/error_handler";
import { sendEmail } from "../../Services/Email/email.services";
import userModel from "../../../Database/Models/user.model";
import userDatabaseModel from "./user.model";
import {
	generateUserToken,
	userVerificationToken,
} from "../../Utilities/token_generator";

const userDataModel = new userDatabaseModel();
const VERIFY_SECRET = `${process.env.JWT_VERIFY_SECRET}`;
const { BCRYPT_PASSWORD } = process.env;

const registerUser = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const { email } = request.body;
		let user = await userModel.findOne({ email });
		if (user) return next(new AppError("Email already exists", 400));
		const newUser = await userDataModel.create(
			request.body,
			request.file?.filename,
			next
		);
		sendEmail(email, userVerificationToken(email));
		response
			.status(201)
			.send({ message: "User created successfully", user: newUser });
	}
);

const loginUser = asyncErrorHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;
		const found: any = await userModel.findOne({ email });
		if (!found) return next(new AppError("No user found for this email", 401));
		let correctPassword = await bcrypt.compare(
			password + BCRYPT_PASSWORD,
			found.password
		);
		if (!correctPassword)
			return next(new AppError("You have used an incorrect password", 401));
		res.status(200).send({
			message: "successfully logged in",
			name: found.name,
			token: generateUserToken(found),
		});
	}
);

const getAllUsers = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const users = await userModel.find({}, { __v: 0, password: 0 });
		response.status(200).send({ message: "success", data: users });
	}
);

const getCurrentUser = asyncErrorHandler(
	async (request: Request, response: Response) => {
		const user = await userModel.findById(response.locals.user_id, {
			__v: 0,
			password: 0,
		});
		if (user)
			return response.status(200).send({ message: "success", data: user });
	}
);

const getOneUser = asyncErrorHandler(
	async (request: Request, response: Response) => {
		const user = await userModel.findById(request.params.id, {
			__v: 0,
			password: 0,
		});
		response.status(200).send({ message: "success", data: user });
	}
);

const updateUser = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const user = await userDataModel.update(
			request.body,
			request.params.id,
			next
		);
		response
			.status(201)
			.send({ message: "User created successfully", user: user });
	}
);

const verifyUser = asyncErrorHandler(
	async (requset: Request, response: Response, next: NextFunction) => {
		let verified_user = jwt.verify(
			requset.params.token,
			VERIFY_SECRET
		) as JwtPayload;
		const user: any = await userModel.findById(verified_user._id);
		if (user.isVerified)
			return next(new AppError("User is already verified", 400));
		const updated = userModel.findOneAndUpdate(
			{ email: verified_user.email },
			{ isActive: true }
		);
		response.send({ message: "User verified successfully!", user: updated });
	}
);

const deleteUser = asyncErrorHandler(
	async (request: Request, response: Response) => {
		const user = await userModel.findByIdAndDelete(request.params.id, {
			returnOriginal: true,
		});
		response.send({ message: "User successfully deleted", user: user });
	}
);

const deactivateUser = asyncErrorHandler(
	async (request: Request, response: Response) => {
		const user = await userModel.findByIdAndUpdate(
			request.params.id,
			{
				isActive: false,
			},
			{ new: true }
		);
		response.send({ message: "User successfully deactivated", user: user });
	}
);

const changeUserPassword = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const user = await userModel.findByIdAndUpdate(
			request.params.id,
			request.body,
			{ new: true }
		);
		!user && next(new AppError("User is not found", 404));
		response.send({
			message: "User password successfully changed",
			user: user,
		});
	}
);

export {
	registerUser,
	loginUser,
	deleteUser,
	deactivateUser,
	getAllUsers,
	getCurrentUser,
	getOneUser,
	verifyUser,
	updateUser,
	changeUserPassword,
};
