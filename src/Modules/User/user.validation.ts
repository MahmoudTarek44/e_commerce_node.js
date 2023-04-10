import Joi from "Joi";

const signUpSchema = Joi.object({
	name: Joi.string().min(3).max(80).required(),
	email: Joi.string().email().required(),
	password: Joi.string()
		.pattern(/^[a-zA-Z0-9]{8,30}$/)
		.required(),
	confirm_password: Joi.ref("password"),
	age: Joi.number().required(),
	phone: Joi.string(),
});

const signInSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string()
		.pattern(/^[a-zA-Z0-9]{8,30}$/)
		.required(),
});

export { signUpSchema, signInSchema };
