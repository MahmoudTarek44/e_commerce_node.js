import { NextFunction, Request, Response } from "express";
import { AppError } from "../Utilities/error_handler";

const globalErrorHandler = (
	error: AppError,
	request: Request,
	response: Response,
	next: NextFunction
) => {
	response.status(error.code || 500).send({
		error: error.message,
		error_details: error.details || "No details!",
	});
};

export default globalErrorHandler;
