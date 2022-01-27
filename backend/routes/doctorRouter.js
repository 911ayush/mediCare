const express = require('express');
const doccontroller = require('./../controllers/doccontroller.js')
const authcontroller = require('./../controllers/authcontroller.js')

const router = express.Router();



router
    .route('/signup')
    .post(authcontroller.signupdoc);
router
    .route('/login')
    .post(authcontroller.logindoc);



router
    .route('/:id')
    .get(doccontroller.getdoctorsbyid)
    .patch(doccontroller.update)


router
    .route('/')
    .get(authcontroller.protect, doccontroller.getdoctors)
    .post(doccontroller.postdoctors)

module.exports = router;

