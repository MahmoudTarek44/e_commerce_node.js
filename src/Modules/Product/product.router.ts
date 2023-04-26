import checkAuthentication from "../../Middlewares/authentication.middleware";
import { productSchema, updateProductSchema } from "./product.validation";
import validation from "../../Middlewares/validation.middleware";
import { paramsSchema } from "../../Utilities/global_validation";
import { uploadMultiple } from "../../Utilities/file_uploader";
import * as Product from "./product.controller";
import express from "express";

const productRouter = express.Router({ mergeParams: true });

let fileDetails = [
	{ name: "cover_img", maxCount: 1 },
	{ name: "prod_imgs", maxCount: 8 },
];

productRouter
	.route("/")
	.get(checkAuthentication, Product.getAllProducts)
	.post(
		checkAuthentication,
		uploadMultiple(fileDetails, "Product"),
		validation(productSchema, "body"),
		Product.createProduct
	);
productRouter
	.route("/:id")
	.delete(checkAuthentication, Product.deleteProduct)
	.get(checkAuthentication, Product.getOneProduct)
	.put(
		checkAuthentication,
		uploadMultiple(fileDetails, "Product"),
		validation(paramsSchema, "params"),
		validation(updateProductSchema, "body"),
		Product.updateProduct
	);
export default productRouter;
