const express = require('express');
const ambulanceController = require('./../controllers/ambulanceController.js')
const authcontroller = require('./../controllers/authcontroller.js')
const router = express.Router();

router
    .route('/signup')
    .post(authcontroller.signupambulance);

router
    .route('/login')
    .post(authcontroller.loginambulance);

router
    .route('/nearby/:distance/center/:latlng/unit/:unit')
    .get(ambulanceController.nearby);

router
    .route('/:id')
    .get(ambulanceController.getambulancesbyid )

module.exports = router;

