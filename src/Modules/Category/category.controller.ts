// Modules
import { Request, Response, NextFunction } from "express";
import slugify from "slugify";

// Helpers
import categoryModel from "../../../Database/Models/category.model";
import { asyncErrorHandler } from "../../Utilities/error_handler";

const createCategory = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const { name } = request.body;
		let result = new categoryModel({
			name,
			slug: slugify(name, "-"),
			image: request.file?.filename,
		});
		await result.save();
		response.status(200).send({ message: "success", data: result });
	}
);

const getAllCategories = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		let result = await categoryModel.find({});
		response.status(200).send({ message: "success", data: result });
	}
);

const getOneCategory = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const { id } = request.params;
		let result = await categoryModel.findById(id);
		response.status(200).send({ message: "success", data: result });
	}
);

const updateCategory = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const { id } = request.params;
		const { name } = request.body;
		let result = await categoryModel.findByIdAndUpdate(id, {
			name,
			slug: slugify(name, "-"),
			image: request.file?.filename,
		});
		response.status(200).send({ message: "success", data: result });
	}
);

const deleteCategory = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const { id } = request.params;
		let result = await categoryModel.findByIdAndUpdate(id);
		response.status(200).send({ message: "success", data: result });
	}
);

export {
	createCategory,
	getAllCategories,
	getOneCategory,
	updateCategory,
	deleteCategory,
};
