const express = require('express');
const messenger = require('./../controllers/messageController');
const authcontroller = require('./../controllers/authcontroller.js');

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
    .route('/message/:conversationid')
    .get(messenger.getallmessage)
    .post(upload.single('pic'),messenger.addmessage);

router.route('/:id1/:id2').get(messenger.getConversationId).post(messenger.addConversation);

router.route('/').get(authcontroller.gauth,messenger.getMyConversations);



module.exports = router;

