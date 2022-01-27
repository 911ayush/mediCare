const express = require('express');
const authcontroller = require('./../controllers/authcontroller');
const appointmentController = require('./../controllers/appointmentController');
const router = express.Router();

router.use(authcontroller.protect);
router.route('/')
    .get(appointmentController.getappointment)
    .post(appointmentController.addappointment);

module.exports = router;