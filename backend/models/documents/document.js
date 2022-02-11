const mongoose = require('mongoose');
//const appointmentmodel = require('appointment');

const documentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        required: [true,'please mention name of document']
    },
    uploadedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'Doctor'
    },
    document: {
        type: Buffer,
        required: [true, 'please upload document']

    },
    patientid: {
        type: mongoose.Schema.ObjectId,
        ref:'Patient',
        required: [true, 'patient id is required']
    },
    appointmentid: {
        type: mongoose.Schema.ObjectId,
        ref: 'Appointment',
    }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

documentSchema.pre('save', async function (next){
    //doc.populate('appointmentid');
    console.log(this);
})

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;