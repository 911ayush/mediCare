const mongoose = require('mongoose');

const hiddenNotesSchema = new mongoose.Schema({
    hiddenNote:{
        type:String,
        required:true
    },
    conversationid:{
        type:mongoose.Schema.ObjectId,
        ref:'Conversation',
        required:true
    }
},{ timestamps:true,
    toObject:{virtuals: true},
    toJSON: {virtuals: true}
})

const HiddenNotes = mongoose.model('HiddenNotes',hiddenNotesSchema);

module.exports = HiddenNotes;