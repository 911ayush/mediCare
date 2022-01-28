const express = require('express');
const patientcontroller = require('./../controllers/patientController.js')
const authcontroller = require('./../controllers/authcontroller.js')
const appointmentController = require('./../controllers/appointmentController')
const appointmentRouter = require('./../routes/appointmentRouter')

const router = express.Router();



router
    .route('/signup')
    .post(authcontroller.signuppatient);
router
    .route('/login')
    .post(authcontroller.loginpatient);

//router.use(authcontroller.pauth);
router.use('/appointments',authcontroller.pauth, appointmentRouter);

router
    .route('/:id')
    .get(patientcontroller.getpatientbyid)
    


router
    .route('/')
    .get(patientcontroller.getpatient)
    .post(patientcontroller.postpatient)
    .patch(authcontroller.pauth,patientcontroller.update)

module.exports = router;

