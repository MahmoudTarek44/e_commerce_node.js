import checkAuthentication from "../../Middlewares/authentication.middleware";
import { subCategorySchema, updateSchema } from "./subcategory.validation";
import validation from "../../Middlewares/validation.middleware";
import * as Subcategory from './subcategory.controller'
import fileUpload from "../../Utilities/file_uploader";
import express from "express";

const subCategoryRouter = express.Router();

subCategoryRouter
	.route("/")
	.get(checkAuthentication, Subcategory.getAllSubcategories)
	.post(
		fileUpload("image", "Subcategory"),
		validation(subCategorySchema, "body"),
		Subcategory.createSubCategory
	);
subCategoryRouter
	.route("/:id")
	.delete(checkAuthentication, Subcategory.deleteSubcategory)
	.get(checkAuthentication, Subcategory.getOneSubcategory)
	.put(
		checkAuthentication,
		fileUpload("image", "Subcategory"),
		validation(updateSchema, "body"),
		Subcategory.updateSubcategory
	);

export default subCategoryRouter;
