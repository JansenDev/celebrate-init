import { Joi } from "celebrate";

export  const BODY_ESQUEMA =   Joi.object().keys({
    name: Joi.string().trim(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.number().integer(),
    valid: Joi.object({
        isNumeric: Joi.boolean()
    }),
    more: Joi.string().trim(),
})