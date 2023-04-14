import Joi from "Joi";

const paramsSchema = Joi.object({
	id: Joi.string().hex().min(24).required(),
});

const queryParamsSchema = Joi.object({
	page: Joi.number().min(0),
	search: Joi.string().min(1),
});

export { paramsSchema, queryParamsSchema };
