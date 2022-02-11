const express = require('express');
const doccontroller = require('./../controllers/doccontroller.js')
const authcontroller = require('./../controllers/authcontroller.js')
const appointmentController = require('./../controllers/appointmentController')
const appointmentRouter = require('./../routes/appointmentRouter')
const multer = require('multer');

const upload= multer({
    limits:{
      fileSize: 2000000
    },
   fileFilter(req,file,cb){
           if(! file.originalname.match(/\.(jpeg|jpg|PNG|png)$/)) {
                  return cb(new Error('Please Upload image in format of jpeg or jpg or png'))
           }
           cb(undefined,true)
   }
  })


const router = express.Router();



router
    .route('/signup')
    .post(authcontroller.signupdoc);
    
router
    .route('/login')
    .post(authcontroller.logindoc);

//router.use(authcontroller.dauth);

router.route('/uploadprofilepic').post(upload.single('profilePic'),authcontroller.dauth,doccontroller.uploadProfilePic);

router.route('/nearby/:distance/center/:latlng/unit/:unit').get(doccontroller.nearby);
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

