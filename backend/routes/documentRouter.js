const express = require('express');
const messenger = require('./../controllers/messageController');
const authcontroller = require('./../controllers/authcontroller.js');
const documentcontroller = require('./../controllers/documentController.js');

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

const router = express.Router();


router.route('/').get(authcontroller.pauth, documentcontroller.getmydocument).post(upload.single('document'), authcontroller.pauth, documentcontroller.postmydocument);


module.exports = router;

