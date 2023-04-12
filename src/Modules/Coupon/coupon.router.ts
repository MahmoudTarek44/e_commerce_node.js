import { getAuthHeader } from "../../Middlewares/authentication.middleware";
import validation from "../../Middlewares/validation.middleware";
import fileUpload from "../../Utilities/file_uploader";
import { couponSchema } from "./coupon.validation";
import * as Coupon from './coupon.controller'
import express from "express";

const couponRouter = express.Router();

couponRouter
	.route("/")
	.get(getAuthHeader, Coupon.getAllCoupons)
	.post(
		fileUpload("image", "Category"),
		validation(couponSchema, "body"),
		Coupon.createCoupon
	);
couponRouter
	.route("/:id")
	.get(getAuthHeader, Coupon.getOneCoupon)
	
export default couponRouter;
