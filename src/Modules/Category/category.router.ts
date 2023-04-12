import { getAuthHeader } from "../../Middlewares/authentication.middleware";
import { categorySchema, updateSchema } from "./category.validation";
import validation from "../../Middlewares/validation.middleware";
import fileUpload from "../../Utilities/file_uploader";
import * as Category from "./category.controller";
import express from "express";

const categoryRouter = express.Router();

categoryRouter
	.route("/")
	.get(getAuthHeader, Category.getAllCategories)
	.post(
		fileUpload("image", "Category"),
		validation(categorySchema, "body"),
		Category.createCategory
	);
categoryRouter
	.route("/:id")
	.delete(getAuthHeader, Category.deleteCategory)
	.get(getAuthHeader, Category.getOneCategory)
	.put(
		getAuthHeader,
		fileUpload("image", "Category"),
		validation(updateSchema, "body"),
		Category.updateCategory
	);

export default categoryRouter;
