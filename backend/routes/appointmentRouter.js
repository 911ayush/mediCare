const express = require('express');
const authcontroller = require('./../controllers/authcontroller');
const appointmentController = require('./../controllers/appointmentController');
const router = express.Router({ mergeParams: true });

//router.use(authcontroller.dauth);
const multer = require('multer');

const upload = multer({
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg|PNG|png)$/)) {
            return cb(new Error('Please Upload image in format of jpeg or jpg or png'))
        }
        cb(undefined, true)
    }
})


router.route('/')
    .get(appointmentController.getappointment)
    .post(appointmentController.addappointment);

router.route('/:appointmentid/document')
    .get(authcontroller.dauth, appointmentController.getdocument)
    .post(upload.single('document'), authcontroller.dauth, appointmentController.postdocument);

router.route('/hiddenNote/:conversationid')
    .get(authcontroller.dauth, appointmentController.gethiddenNote)
    .post(authcontroller.dauth, appointmentController.posthiddenNote)

module.exports = router;