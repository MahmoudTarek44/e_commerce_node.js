import { asyncErrorHandler } from "../Utilities/error_handler";
import modifiedRequest from "../Utilities/interfaces";
import { AppError } from "../Utilities/error_handler";
import { NextFunction, Response } from "express";

const checkAuthorization = (...roles: string[]) => {
	return asyncErrorHandler(
		async (
			request: modifiedRequest,
			response: Response,
			next: NextFunction
		) => {
			if (!roles.includes(request.user.role))
				return next(
					new AppError(
						`You are not authorized to perform such action, Your user type is: ${request.user.role}`,
						401
					)
				);
			next();
		}
	);
};

export default checkAuthorization;
