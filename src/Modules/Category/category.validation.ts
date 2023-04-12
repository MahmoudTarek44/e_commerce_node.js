import Joi from "Joi";

const categorySchema = Joi.object({
	name: Joi.string().min(2).max(50).required(),
});

const updateSchema = Joi.object({
	name: Joi.string().min(2).max(50),
});

export { categorySchema, updateSchema };
