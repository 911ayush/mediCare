const mongoose = require('mongoose');

const firebaseTokenSchema = new mongoose.Schema({
    firebasetoken: {
        type: String,
        required: [true, 'Please provide token'],
        unique:true
    },
    patient: {
        type: mongoose.Schema.ObjectId,
        ref: 'Patient'        
    },
    doctor: {
        type :mongoose.Schema.ObjectId,
        ref: 'Doctor'
    }
}, 
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});



firebaseTokenSchema.pre('save', async function (next) {

    next();
});




const FirebaseToken = mongoose.model('FirebaseToken', firebaseTokenSchema);
module.exports = FirebaseToken;