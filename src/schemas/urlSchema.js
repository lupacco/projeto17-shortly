import Joi from "@hapi/joi";

const regexUrl = /^https?:\/\/.*/

export const urlSchema = Joi.object({
    url: Joi.string().regex(regexUrl).required()
})