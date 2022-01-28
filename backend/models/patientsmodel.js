const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Please provide email'],
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minlength: [8, 'min length of password is 8'],
        select:false
    },
    configPassword: {
        type: String,
        required: [true, 'please provide Config Password'],
        validate: {
            validator: function (val) {
                return this.password === val;
            }
        },
        select:false
    },
    passwordsetat: {
        type: Date,
        select:false
    },
    pincode: {
        type: Number,
        required: [true, 'Please provide pin code'],
        min: [100000, 'enter valid pin code'],
        max: [999999, 'enter valid pin code']
    },
    phoneNo: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Please provide phone no']
    },
    phoneCode: {
        type: String,
        required: [true, 'Please provide code for phone'],
        trim: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: [true, 'Please tell us your gender']
    },
    address: {
        type: String,
        required: [true, 'Please provide your address'],
    }
}, 
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

patientSchema.virtual('appointments',{
    ref: 'Appointment',
    foreignField: 'patient',
    localField: '_id'
});

patientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    this.configPassword = null;
    const time = Date.now();
    this.passwordsetat = time - 1000;
    next();
});


patientSchema.methods.checkpassword = async function (password, givenpassword) {
    try {
        return await bcrypt.compare(givenpassword, password);
    } catch (err) {
        return err;
    }
}

patientSchema.methods.tokensetafterpasswordset = function (val) {

    let changedTimestamp;
    
    if (this.passwordsetat) {
        changedTimestamp = parseInt(
            this.passwordsetat.getTime() / 1000,
            10
        );
    }
    return changedTimestamp < val;
}

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;