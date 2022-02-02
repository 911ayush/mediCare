const express = require('express');
const messenger = require('./../controllers/messageController');
const router = express.Router();


router
    .route('/message/:conversationid')
    .get(messenger.getallmessage)
    .post(messenger.addmessage);

router.route('/:id1/:id2').get(messenger.getConversationId).post(messenger.addConversation);

router.route('/:userid').get(messenger.getMyConversations);



module.exports = router;