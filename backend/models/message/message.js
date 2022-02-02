const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    sender:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    conversationid:{
        type:mongoose.Schema.ObjectId,
        required:true
    }
},{ timestamps:true,
    toObject:{virtuals: true},
    toJSON: {virtuals: true}
})

const Message = mongoose.model('message',messageSchema);

module.exports = Message;