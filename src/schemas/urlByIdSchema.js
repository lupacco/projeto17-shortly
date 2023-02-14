import Joi from "@hapi/joi";

export const urlByIdSchema = Joi.object({
    id: Joi.number().required(),
    shortUrl: Joi.string().required(),
    url: Joi.string().required()
})