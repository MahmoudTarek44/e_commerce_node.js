import { asyncErrorHandler } from "../Utilities/error_handler";
import { NextFunction, Request, Response } from "express";
import userModel from "../../Database/Models/user.model";
import { AppError } from "../Utilities/error_handler";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = `${process.env.JWT_SECRET}`;

const checkAuthentication = asyncErrorHandler(
	async (
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<AppError | void> => {
		if (!request.headers.authorization)
			return next(new AppError("Authorization token is missing", 401));

		let decoded = (await jwt.verify( request.headers.authorization, SECRET )) as JwtPayload;
		let user = await userModel.findById(decoded.user["_id"]);

		if (!user)
			return next(
				new AppError("Invalid token is used, User is not found", 409)
			);
		if (decoded.iat && user.changePassTime > decoded.iat)
			return next(
				new AppError("Invalid token is userd, User data is updated", 401)
			);
		if (decoded.iat && user.logOutTime > decoded.iat)
			return next(
				new AppError("Invalid token is userd, User has logged out", 401)
			);

		response.locals.user_id = decoded.user["_id"];
		next();
	}
);

export default checkAuthentication;
