import { NextFunction, Request, Response } from "express";
import { AppError } from "../Utilities/error_handler";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = `${process.env.JWT_SECRET}`;

export const getAuthHeader = (
	request: Request,
	response: Response,
	next: NextFunction
): void | boolean => {
	if (!request.headers.authorization)
		return next(new AppError("Authorization token is missing", 401));
	try {
		let jwt_data = jwt.verify(
			request.headers.authorization,
			SECRET
		) as JwtPayload;
		response.locals.user_id = jwt_data.user["_id"];
		next();
	} catch (error) {
		return next(
			new AppError("Error occured checking Authorization token", 401, error)
		);
	}
};
