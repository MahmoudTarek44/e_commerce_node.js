import Joi, { string } from "Joi";

const paramsSchema = Joi.object({
	id: Joi.string().hex().min(24).required(),
});

const queryParamsSchema = Joi.object({
	page: Joi.number().min(0),
	limit: Joi.number().min(5),
	search: Joi.string().min(1),
	sort: Joi.string(),
	filter: Joi.number(),
	select: Joi.array().items(Joi.string()),
});

export { paramsSchema, queryParamsSchema };
