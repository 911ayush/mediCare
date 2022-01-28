const express = require('express');
const doccontroller = require('./../controllers/doccontroller.js')
const authcontroller = require('./../controllers/authcontroller.js')
const appointmentController = require('./../controllers/appointmentController')
const appointmentRouter = require('./../routes/appointmentRouter')

const router = express.Router();



router
    .route('/signup')
    .post(authcontroller.signupdoc);
router
    .route('/login')
    .post(authcontroller.logindoc);

router.use(authcontroller.dauth);
router.use('/appointments', appointmentRouter);

// router
//     .route('/appointments')
//     .get(authcontroller.dauth, appointmentController.getdocAppointments);

router
    .route('/:id')
    .get(doccontroller.getdoctorsbyid)
    


router
    .route('/')
    .get(doccontroller.getdoctors)
    .post(doccontroller.postdoctors)
    .patch(doccontroller.update)

module.exports = router;

