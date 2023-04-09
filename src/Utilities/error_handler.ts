import { NextFunction, Request, Response } from "express";

const asyncErrorHandler = (controller: Function) => {
	return (request: Request, response: Response, next: NextFunction) => {		
		controller(request, response, next).catch((error: Error) => {
			next(new AppError(error.message, 400, error));
		});
	};
};

class AppError extends Error {
	code: number;
	details: any;
	constructor(message: string, code: number, details?: any) {
		super(message);
		this.code = code;
		this.details = details;
	}
}

export { asyncErrorHandler, AppError };
