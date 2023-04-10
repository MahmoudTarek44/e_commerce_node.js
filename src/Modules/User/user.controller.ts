// Modules
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

// Helpers
import { generateUserToken, userVerificationToken } from "../../Utilities/token_generator";
import { AppError, asyncErrorHandler } from "../../Utilities/error_handler";
import { sendEmail } from "../../Services/Email/email.services";
import userModel from "../../../Database/Models/user.model";
import userDatabaseModel from "./user.model";

const VERIFY_SECRET = `${process.env.JWT_VERIFY_SECRET}`;
const { BCRYPT_PASSWORD } = process.env;
const userDataModel = new userDatabaseModel();

const registerUser = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const { email } = request.body;
		await userModel.findOne({ email }, {  __v: 0, password: 0 })
			.catch((error)=> { return next(new AppError( "This email is already is use, please try another valid email", 400, error))})
		const newUser = await userDataModel.create( request.body, request.file?.filename, next);
		sendEmail(email, userVerificationToken(email));
		response.status(201).send({ message: "User created successfully", user: newUser });
	}
);

const loginUser = asyncErrorHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;
		const found = await userModel.findOne({ email },{  __v: 0, password: 0 })
			.catch((error)=> { return next(new AppError(error.message, 400, error))})
		if(found){
			let correctPassword = await bcrypt.compare( password + BCRYPT_PASSWORD, found.password );
			if (!correctPassword) return next(new AppError("You have used an incorrect password", 401));
			res.status(200).send({ message: "successfully logged in", name: found.name, token: generateUserToken(found) });
		}
	}
);

const getAllUsers = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const users = await userModel.find({},{ __v: 0, password: 0 })
			.catch((error)=> { return next(new AppError(error.message, 400, error))})
		response.status(200).send({ message: "success", data: users });
	}
);

const getCurrentUser = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const user = await userModel.findById(response.locals.user_id,{  __v: 0, password: 0 })
			.catch((error)=> { return next(new AppError(error.message, 400, error))})
		if (user) return response.status(200).send({ message: "success", data: user });
	}
);

const getOneUser = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const user = await userModel.findById(request.params.id,{  __v: 0, password: 0 })
			.catch((error)=> { return next(new AppError(error.message, 400, error))})
		response.status(200).send({ message: "success", data: user });
	}
);

const updateUser = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const user = await userDataModel.update(request.body, response.locals.user_id, next)
		response.status(201).send({ message: "User created successfully", user: user });
	}
);

const verifyUser = asyncErrorHandler(
	async (requset: Request, response: Response, next: NextFunction) => {
		let verified_user = jwt.verify( requset.params.token, VERIFY_SECRET ) as JwtPayload;
		const user: any = userModel.findById(verified_user._id)
		if(user.isActive) 
			return response.send({ message: "User is already verified!"});
		const updated = userModel.findOneAndUpdate({ email: verified_user.email },{ isActive: true })
		response.send({ message: "User verified successfully!", user: updated});
	}
);

const deleteUser = asyncErrorHandler(
	async (request: Request, response: Response) => {
		const user = await userModel.findByIdAndDelete(response.locals.user_id, { returnOriginal: true })
		response.send({ message: "User successfully deleted", user: user })
	}
);

const deactivateUser = asyncErrorHandler(
	async (request: Request, response: Response) => {
		const user = await userModel.findByIdAndUpdate(response.locals.user_id, { isActive: false })
		response.send({ message: "User successfully deactivated", user: user })
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
};
