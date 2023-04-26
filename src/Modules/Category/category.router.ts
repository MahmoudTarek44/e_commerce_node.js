import checkAuthentication from "../../Middlewares/authentication.middleware";
import { categorySchema, updateSchema } from "./category.validation";
import subCategoryRouter from "../SubCategory/subcategory.router";
import validation from "../../Middlewares/validation.middleware";
import { paramsSchema } from "../../Utilities/global_validation";
import { uploadSingle } from "../../Utilities/file_uploader";
import * as Category from "./category.controller";
import express from "express";

const categoryRouter = express.Router();

categoryRouter.use("/:id/subcategories", subCategoryRouter);
categoryRouter
	.route("/")
	.get(checkAuthentication, Category.getAllCategories)
	.post(
		checkAuthentication,
		uploadSingle("image", "Category"),
		validation(categorySchema, "body"),
		Category.createCategory
	);
categoryRouter
	.route("/:id")
	.delete(checkAuthentication, Category.deleteCategory)
	.get(checkAuthentication, Category.getOneCategory)
	.put(
		checkAuthentication,
		uploadSingle("image", "Category"),
		validation(paramsSchema, "params"),
		validation(updateSchema, "body"),
		Category.updateCategory
	);

export default categoryRouter;
