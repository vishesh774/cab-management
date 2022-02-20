var express = require('express');
const Cab = require('../../database/models/cab');
const CabLocationModel = require('../../database/models/cab-location');
const CabStatus = require('../../database/models/cab-state');
const findCabByKeyName = require('../../database/queries/cab');
const findCityByName = require('../../database/queries/city');
const { registerCabSchema, updateLocationSchema } = require('../../schemas/cab/register');
const { DEFAULT_CAB_STATE } = require('../../utils/cab-status');
var router = express.Router();

/* GET home page. */
router.post('/register', async function(req, res, next) {
    const registerValidate = registerCabSchema.validate(req.body);
    if (registerValidate.error) {
        res.status(400).send(registerValidate.error);
    } else {
        // add the same to database
        const {
            City_Id,
            Cab_Id
        } = req.body;
        // now validate if the city id provided is from one of the onboarded cities
        const cityById = await findCityByName(City_Id, 'City_Id');
        if (!cityById) {
            res.status(400).send({
                error: "No City Exists with this City Id"
            });
        } else {
            // check if there is a cab_Id by this name
            const cab = await findCabByKeyName(Cab_Id, 'Cab_Id');
            if (cab) {
                res.status(400).send({
                    error: "Cab Already Exists by this ID"
                });
            } else {
                // add the city to the database
                const newCab = new Cab({
                    Cab_Id,
                    City_Id
                })
                await newCab.save();
                // now add an entry for this in the cab status for this new created cab
                const newCabStatus = new CabStatus({
                    Cab_Id,
                    City_Id,
                    status: DEFAULT_CAB_STATE
                })
                await newCabStatus.save();
                res.status(200).send({
                    message: `Cab ${Cab_Id} Added to ${City_Id} City and current city updated to ${City_Id}`
                });
            }
    
        }
    }
});

router.post('/update-location', async function(req, res, next) {
    const updateLocationValidate = updateLocationSchema.validate(req.body);
    if (updateLocationValidate.error) {
        res.status(400).send(registerValidate.error);
    } else {
        const {
            Cab_Id,
            City_Id
        } = req.body;
        // find if we have existing CabById
        const cab = await findCabByKeyName(Cab_Id, 'Cab_Id');
        if (cab) {
            const city = await findCityByName(City_Id, 'City_Id');
            if (city) {
                const CabLocation = new CabLocationModel({
                    Cab_Id,
                    City_Id
                });
                await CabLocation.save();
                res.status(200).send({
                    message: "Cab Location Has been updated"
                });
            } else {
                res.status(400).send({
                    error: 'No City found with this id'
                });
            }
        } else {
            res.status(400).send({
                error: "No Cab found with this Id"
            });
        }
    }
})
module.exports = router;
