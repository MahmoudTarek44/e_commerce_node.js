// Modules
import { Request, Response, NextFunction } from "express";
import slugify from "slugify";

// Helpers
import { asyncErrorHandler } from "../../Utilities/error_handler";
import brandModel from "../../../Database/Models/brand.model";

const createBrand = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const { name } = request.body;
		let result = new brandModel({
			name,
			logo: request.file?.filename,
			slug: slugify(name, "-"),
		});
		await result.save();
		response.status(200).send({ message: "success", data: result });
	}
);

const getAllBrands = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		let result = await brandModel.find({});
		response.status(200).send({ message: "success", data: result });
	}
);

const getOneBrand = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const { id } = request.params;
		let result =  brandModel.findById(id);
		response.status(200).send({ message: "success", data: result });
	}
);

const updateBrand = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const { id } = request.params;
		const { name } = request.body;
		let result = await brandModel.findByIdAndUpdate(
			id,
			{
				name,
				slug: slugify(name, "-"),
			},
			{ new: true }
		);
		response.status(200).send({ message: "success", data: result });
	}
);

const deleteBrand = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const { id } = request.params;
		let result = await brandModel.findByIdAndUpdate(id);
		response.status(200).send({ message: "success", data: result });
	}
);

export { createBrand, updateBrand, deleteBrand, getAllBrands, getOneBrand };
