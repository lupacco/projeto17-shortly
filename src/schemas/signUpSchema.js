import Joi from '@hapi/joi'

export const signUpSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(),
    confirmPassword: Joi.valid(Joi.ref("password")),
})