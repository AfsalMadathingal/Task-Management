import Joi from 'joi';

export const validate = (schema) => (data) => {
    const { error } = schema.validate(data);
    return error ? error.details[0].message : null;
};

export const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(), 
    password: Joi.string().required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        'any.only': 'Passwords do not match',
    }),
});


export const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required(),
});

