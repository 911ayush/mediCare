const express = require('express');
const notificationController = require('../controllers/notificationController');
const authController = require('./../controllers/authcontroller')
const router = express.Router();

router.route('/firebasetoken')
    .post(authController.gauth, notificationController.storeToken)
    .delete(authController.gauth, notificationController.removetoken);

module.exports = router;