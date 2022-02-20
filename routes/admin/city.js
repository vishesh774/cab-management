var express = require('express');
const City = require('../../database/models/city');
const findCityByName = require('../../database/queries/city');
const { registerCitySchema } = require('../../schemas/city/register');
var router = express.Router();

/* GET home page. */
router.post('/register', async function(req, res, next) {
    const registerValidate = registerCitySchema.validate(req.body);
    if (registerValidate.error) {
        res.status(400).send(registerValidate.error);
    } else {
        // add the same to database in future
        const {
            name,
            City_Id
        } = req.body;
        // search if we already have a city by this name or code
        const cityById = await findCityByName(City_Id, 'City_Id');
        if (cityById) {
            res.status(400).send({
                error: "City Already exists with this id"
            });
        } else {
            const newCity = new City({
                name,
                City_Id
            })
            await newCity.save();
            res.status(200).send({
                message: "city addition successful"
            });
        }
    }
});

module.exports = router;
