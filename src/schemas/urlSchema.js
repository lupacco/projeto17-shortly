import Joi from "@hapi/joi";

export const urlSchema = Joi.object({
    url: Joi.string().required()
})