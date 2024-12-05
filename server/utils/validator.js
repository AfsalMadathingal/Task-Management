import Joi from 'joi';



export const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }
    return next();
};

export const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});


export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});


