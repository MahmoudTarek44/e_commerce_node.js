import Joi from "Joi";

const subCategorySchema = Joi.object({
	category_id: Joi.string().hex().min(24).required(),
	name: Joi.string().min(2).max(50).required(),
});

const updateSchema = Joi.object({
	name: Joi.string().min(2).max(50),
});

export { subCategorySchema, updateSchema };
