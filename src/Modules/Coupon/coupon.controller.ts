// Modules
import { Request, Response, NextFunction } from "express";

// Helpers
import { asyncErrorHandler } from "../../Utilities/error_handler";
import couponModel from "../../../Database/Models/coupon.model";

const createCoupon = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		let result = new couponModel(request.body);
		await result.save();
		response.status(200).send({ message: "success", data: result });
	}
);

const getAllCoupons = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		let result = await couponModel.find({});
		response.status(200).send({ message: "success", data: result });
	}
);

const getOneCoupon = asyncErrorHandler(
	async (request: Request, response: Response, next: NextFunction) => {
		const { id } = request.params;
		let result = await couponModel.findById(id);
		response.status(200).send({ message: "success", data: result });
	}
);

export { createCoupon, getAllCoupons, getOneCoupon };
