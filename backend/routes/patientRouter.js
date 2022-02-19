const express = require('express');
const patientcontroller = require('./../controllers/patientController.js')
const authcontroller = require('./../controllers/authcontroller.js')
const appointmentController = require('./../controllers/appointmentController')
const appointmentRouter = require('./../routes/appointmentRouter')
const multer = require('multer');

const upload= multer({
    limits:{
      fileSize: 2000000
    },
   fileFilter(req,file,cb){
           if(! file.originalname.match(/\.(jpeg|jpg|PNG)$/)) {
                  return cb(new Error('Please Upload image in format of jpeg or jpg or png'))
           }
           cb(undefined,true)
   }
  })

const router = express.Router();



router
    .route('/signup')
    .post(authcontroller.signuppatient);
router
    .route('/login')
    .post(authcontroller.loginpatient);

router.route('/uploadprofilepic').post(upload.single('profilePic'),authcontroller.pauth,patientcontroller.uploadProfilePic);

//router.use(authcontroller.pauth);
router.use('/appointments',authcontroller.pauth, appointmentRouter);



router.route('/social-auth-facebook').post(patientcontroller.loginWithFacebok);

router
    .route('/:id')
    .get(patientcontroller.getpatientbyid)
    


router
    .route('/')
    .get(patientcontroller.getpatient)
    .post(patientcontroller.postpatient)
    .patch(authcontroller.pauth,patientcontroller.update)


module.exports = router;

