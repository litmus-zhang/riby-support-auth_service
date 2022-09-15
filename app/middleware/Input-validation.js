const Joi = require('joi');

const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
        .email().pattern(new RegExp('^[a-z0-9](\.?[a-z0-9]){5,}@riby\.ng$')).required(),
    password: Joi.string().min(8).required()
})

const loginSchema = Joi.object({
    email: Joi.string()
        .email({}).pattern(new RegExp('^[a-z0-9](\.?[a-z0-9]){5,}@riby\.ng$')).required(),
    password: Joi.string().min(8).required()
})

exports.validateRegister = validator(registerSchema);
exports.validateLogin = validator(loginSchema);