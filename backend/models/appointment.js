const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    disease:{
        type: String,
        required: [true,'Please tell us about disease name']
    },
    discription:{
        type: String,
        required:[true,'Please give some discription of disease']
    },
    doctor:{
        type: mongoose.Schema.ObjectId,
        ref:'Doctor',
        required:[true,'appointment must be in reference of doctor']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Appointment = mongoose.model('Appointment',appointmentSchema);
module.exports = Appointment;