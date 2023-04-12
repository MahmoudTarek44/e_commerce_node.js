import { getAuthHeader } from "../../Middlewares/authentication.middleware";
import { subCategorySchema, updateSchema } from "./subcategory.validation";
import validation from "../../Middlewares/validation.middleware";
import * as Subcategory from './subcategory.controller'
import fileUpload from "../../Utilities/file_uploader";
import express from "express";

const subCategoryRouter = express.Router();

subCategoryRouter
	.route("/")
	.get(getAuthHeader, Subcategory.getAllSubcategories)
	.post(
		fileUpload("image", "Subcategory"),
		validation(subCategorySchema, "body"),
		Subcategory.createSubCategory
	);

subCategoryRouter
	.route("/:id")
	.delete(getAuthHeader, Subcategory.deleteSubcategory)
	.get(getAuthHeader, Subcategory.getOneSubcategory)
	.put(
		getAuthHeader,
		fileUpload("image", "Subcategory"),
		validation(updateSchema, "body"),
		Subcategory.updateSubcategory
	);

export default subCategoryRouter;
