const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const patientSchema = new mongoose.Schema({
    as:{
        type:String,
        default:"patient"
    },
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
        
        min: [100000, 'enter valid pin code'],
        max: [999999, 'enter valid pin code']
    },
    patientAddress:{
        //GEOJSON
        type:{
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
    },
    profilePic:{
        type:Buffer
    },
    phoneNo: {
        type: String,
        trim: true,
        unique: true,
        
    },
    phoneCode: {
        type: String,
        
        trim: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        
    },
    address: {
        type: String,
        
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

// patientSchema.virtual('firebaseToken',{
//     ref: 'FirebaseToken',
//     foreignField: 'patient',
//     localField: '_id'
// });

patientSchema.pre('save', async function (next) {
    console.log("hassing passwords");
    if (!this.isModified('password')) {
        console.log("here too");
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
        return await bcrypt.compare(givenpassword,password);
    } catch (err) {
        console.log(err.message);
        return err;
    }
}

patientSchema.methods.tokensetafterpasswordset = function (val) {

    let changedTimestamp;
    console.log(this.passwordsetat);
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