const Joi = require("joi");

const registerCitySchema = Joi.object({
    name: Joi.string(),
    City_Id: Joi.string().alphanum().required()
})

module.exports = {
    registerCitySchema
}