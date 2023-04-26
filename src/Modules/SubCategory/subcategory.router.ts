import checkAuthentication from "../../Middlewares/authentication.middleware";
import { subCategorySchema, updateSchema } from "./subcategory.validation";
import validation from "../../Middlewares/validation.middleware";
import { paramsSchema } from "../../Utilities/global_validation";
import * as Subcategory from "./subcategory.controller";
import { uploadSingle } from "../../Utilities/file_uploader";
import express from "express";

const subCategoryRouter = express.Router({ mergeParams: true });

subCategoryRouter
	.route("/")
	.get(checkAuthentication, Subcategory.getAllSubcategories)
	.post(
		uploadSingle("image", "Subcategory"),
		validation(subCategorySchema, "body"),
		Subcategory.createSubCategory
	);
subCategoryRouter
	.route("/:id")
	.delete(checkAuthentication, Subcategory.deleteSubcategory)
	.get(checkAuthentication, Subcategory.getOneSubcategory)
	.put(
		checkAuthentication,
		uploadSingle("image", "Subcategory"),
		validation(paramsSchema, "params"),
		validation(updateSchema, "body"),
		Subcategory.updateSubcategory
	);

export default subCategoryRouter;
