import checkAuthentication from "../../Middlewares/authentication.middleware";
import { paramsSchema } from "../../Utilities/global_validation";
import validation from "../../Middlewares/validation.middleware";
import { brandSchema, updateSchema } from "./brand.validation";
import { uploadSingle } from "../../Utilities/file_uploader";
import productRouter from "../Product/product.router";
import * as Brand from "./brand.controller";
import express from "express";

const brandRouter = express.Router();

brandRouter.use("/:id/products", productRouter);
brandRouter
	.route("/")
	.get(checkAuthentication, Brand.getAllBrands)
	.post(
		uploadSingle("logo", "Brand"),
		validation(brandSchema, "body"),
		Brand.createBrand
	);
brandRouter
	.route("/:id")
	.delete(checkAuthentication, Brand.deleteBrand)
	.get(checkAuthentication, Brand.getOneBrand)
	.put(
		checkAuthentication,
		uploadSingle("logo", "Brand"),
		validation(paramsSchema, "params"),
		validation(updateSchema, "body"),
		Brand.updateBrand
	);

export default brandRouter;
