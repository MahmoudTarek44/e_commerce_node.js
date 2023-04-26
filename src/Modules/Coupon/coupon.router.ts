import checkAuthentication from "../../Middlewares/authentication.middleware";
import validation from "../../Middlewares/validation.middleware";
import { uploadSingle } from "../../Utilities/file_uploader";
import { couponSchema } from "./coupon.validation";
import * as Coupon from './coupon.controller'
import express from "express";

const couponRouter = express.Router();

couponRouter
	.route("/")
	.get(checkAuthentication, Coupon.getAllCoupons)
	.post(
		uploadSingle("image", "Coupon"),
		validation(couponSchema, "body"),
		Coupon.createCoupon
	);
couponRouter
	.route("/:id")
	.get(checkAuthentication, Coupon.getOneCoupon)
	
export default couponRouter;
