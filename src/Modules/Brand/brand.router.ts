import checkAuthentication  from "../../Middlewares/authentication.middleware";
import validation from "../../Middlewares/validation.middleware";
import { brandSchema, updateSchema } from "./brand.validation";
import fileUpload from "../../Utilities/file_uploader";
import * as Brand from "./brand.controller";
import express from "express";

const brandRouter = express.Router();

brandRouter
	.route("/")
	.get(checkAuthentication, Brand.getAllBrands)
	.post(
		fileUpload("logo", "Brand"),
		validation(brandSchema, "body"),
		Brand.createBrand
	);
brandRouter
	.route("/:id")
	.delete(checkAuthentication, Brand.deleteBrand)
	.get(checkAuthentication, Brand.getOneBrand)
	.put(
		checkAuthentication,
		fileUpload("logo", "Brand"),
		validation(updateSchema, "body"),
		Brand.updateBrand
	);

export default brandRouter;
