import Joi from "Joi";

const productSchema = Joi.object({
	name: Joi.string().min(2).max(50).required(),
	price: Joi.number().min(0).required(),
	description: Joi.string().min(5).max(300).required(),
	category: Joi.string().hex().min(24).required(),
	subCategory: Joi.string().hex().min(24).required(),
	brand: Joi.string().hex().min(24).required(),
});

const updateProductSchema = Joi.object({
	name: Joi.string().min(2).max(50),
	price: Joi.number().min(0),
	description: Joi.string().min(5).max(300),
	priceAfterDiscount: Joi.number().min(0),
	ratingAvg: Joi.number().min(0).max(5),
	ratingCount: Joi.number().min(0),
	quantity: Joi.number().min(0),
	sold: Joi.number().min(0),
});

export { productSchema, updateProductSchema };
