const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    messenger:{
        type:[{
            type:mongoose.Schema.ObjectId,
        }]
    }    
},{
    toObject:{virtuals: true},
    toJSON: {virtuals: true}
})

const Conversation = mongoose.model('Conversation',conversationSchema);

module.exports = Conversation;