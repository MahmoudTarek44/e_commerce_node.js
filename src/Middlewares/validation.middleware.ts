import { NextFunction, Request, Response } from "express";
import { AppError } from "../Utilities/error_handler";
import Joi from "Joi";

const validation = (schema: Joi.ObjectSchema<any>, request_part: string) => {
	return (request: Request, response: Response, next: NextFunction) => {
		const { error } = schema.validate(request[request_part as keyof Object], { abortEarly: false });
		return error
			? next(new AppError("Input validation error", 400, error.details))
			: next();
	};
};

export default validation;
