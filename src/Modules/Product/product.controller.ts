// Modules
import { Request, Response, NextFunction } from "express";
import slugify from "slugify";

// Helpers
import productModel from "../../../Database/Models/product.model";
import { asyncErrorHandler } from "../../Utilities/error_handler";

const createProduct = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		if(request.files){
			let files = request.files as { [fieldname: string]: Express.Multer.File[] }
			request.body.prod_imgs = files.prod_imgs.map((image: Express.Multer.File) => image.filename);
			request.body.cover_img = files.cover_img[0].filename;
		}
		request.body.slug = slugify(request.body.name,'-');
		let result = new productModel(request.body);
		await result.save();
		response.status(200).send({ message: "success", data: result });
	}
);

const getAllProducts = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		let result = await productModel.find(
			request.params.id ? { brand: request.params.id } : {}
		);
		response.status(200).send({ message: "success", data: result });
	}
);

const getOneProduct = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const { id } = request.params;
		let result = await productModel.findById(id);
		response.status(200).send({ message: "success", data: result });
	}
);

const updateProduct = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const { id } = request.params;
		const { name } = request.body;
		let result = await productModel.findByIdAndUpdate(
			id,
			{
				name,
				slug: slugify(name, "-"),
				image: request.file?.filename,
			},
			{ new: true }
		);
		response.status(200).send({ message: "success", data: result });
	}
);

const deleteProduct = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const { id } = request.params;
		let result = await productModel.findByIdAndUpdate(id);
		response.status(200).send({ message: "success", data: result });
	}
);

export {
	createProduct,
	updateProduct,
	deleteProduct,
	getAllProducts,
	getOneProduct,
};
