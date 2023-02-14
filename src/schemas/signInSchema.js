import Joi from '@hapi/joi'

export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(),
})