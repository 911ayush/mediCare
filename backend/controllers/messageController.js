const conversationModel = require('./../models/message/conversation.js');
const messageModel = require('./../models/message/message.js');

exports.getConversationId = async (req, res, next) => {
    try {
        const conversationId = await conversationModel.findOne({
            messenger: { $all: [req.params.id1, req.params.id2] }
        })
        res.status(200).json({
            status: "success",
            conversationId
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            error: err
        })
    }

}

exports.addConversation = async (req, res, next) => {
    try {
        let conversationId = await conversationModel.findOne({
            messenger: { $all: [req.params.id1, req.params.id2] }
        })
        if (conversationId) {
            res.status(200).json({
                status: "sucess",
                message: "already exist",
                conversationId
            })
            return;
        }
        conversationId = await conversationModel.create({
            messenger: [req.params.id1, req.params.id2]
        })
        res.status(200).json({
            status: "sucess",
            conversationId
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            error: err
        })
    }
}

exports.getMyConversations = async (req, res, next) => {
    try {
        let conversationId;
        if(req.body.did){
            conversationId = await conversationModel.find({
                messenger: { $in: [req.body.did] }
            })
        }else{
            conversationId = await conversationModel.find({
                messenger: { $in: [req.body.pid] }
            })
        }
        res.status(200).json({
            status: "sucess",
            results: conversationId.length,
            conversationId
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            error: err
        })
    }
}

exports.addmessage = async (req, res, next) => {
    try {
       let messagedoc;
       if(req.file){
        messagedoc = {
            message: req.body.message,
            sender: req.body.sender,
            pic: req.file.buffer,
            conversationid: req.params.conversationid
        }
       }else{
        messagedoc = {
            message: req.body.message,
            sender: req.body.sender,
            conversationid: req.params.conversationid
        }
       }
       console.log(messagedoc);
       console.log(req.file);
        const message = await messageModel.create(messagedoc);
        res.status(200).json({
            status:"success",
            messagedoc
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: "failed",
            error: err
        })
    }
}

exports.getallmessage = async (req, res, next) => {
    try {
        const messages = await messageModel.find({conversationid: req.params.conversationid});
        res.status(200).json({
            status:"success",
            reults:messages.length,
            messages
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            error: err
        })
    }
}
