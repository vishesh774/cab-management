const Joi = require("joi");

const registerCabSchema = Joi.object({
    Cab_Id: Joi.string().required(),
    City_Id: Joi.string().required()
})
const updateLocationSchema = Joi.object({
    Cab_Id: Joi.string().required(),
    City_Id: Joi.string().required()
})
module.exports = {
    registerCabSchema,
    updateLocationSchema
}