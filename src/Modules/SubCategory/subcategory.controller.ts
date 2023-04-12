// Modules
import { Request, Response, NextFunction } from "express";
import slugify from "slugify";

// Helpers
import subCategoryModel from "../../../Database/Models/subcategory.model";
import { asyncErrorHandler } from "../../Utilities/error_handler";

const createSubCategory = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const { name, category_id } = request.body;
		let result = new subCategoryModel({
			name,
			image: request.file?.filename,
			slug: slugify(name, "-"),
			category: category_id,
		});
		await result.save();
		response.status(200).send({ message: "success", data: result });
	}
);

const getAllSubcategories = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		let result = await subCategoryModel.find({});
		response.status(200).send({ message: "success", data: result });
	}
);

const getOneSubcategory = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const { id } = request.params;
		let result = await subCategoryModel.findById(id);
		response.status(200).send({ message: "success", data: result });
	}
);

const updateSubcategory = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const { id } = request.params;
		const { name, category_id } = request.body;
		let result = await subCategoryModel.findByIdAndUpdate(id, {
			name,
			slug: slugify(name, "-"),
			category: category_id,
		});
		response.status(200).send({ message: "success", data: result });
	}
);

const deleteSubcategory = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const { id } = request.params;
		let result = await subCategoryModel.findByIdAndUpdate(id);
		response.status(200).send({ message: "success", data: result });
	}
);

export {
	createSubCategory,
	updateSubcategory,
	deleteSubcategory,
	getAllSubcategories,
	getOneSubcategory,
};
