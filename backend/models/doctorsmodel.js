const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const doctorSchema = new mongoose.Schema({
    as:{
        type:String,
        default:"doctor"
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
        minlength: [8, 'min length of password is 8']
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
        type: Date
    },
    profilePic:{
        type:Buffer
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
    hospitalAddress:{
        //GEOJSON
        type:{
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
    },
    address:{
        type:String,
        required:[true,'please give address']
    },
    specialization:{
        type: String,
        required:[true,'Please give specialization to be displayed']
    }
}, 
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

doctorSchema.index({hospitalAddress: '2dsphere'});

doctorSchema.virtual('appointments',{
    ref: 'Appointment',
    foreignField: 'doctor',
    localField: '_id'
});

// doctorSchema.virtual('firebaseToken',{
//     ref: 'FirebaseToken',
//     foreignField: 'doctor',
//     localField: '_id'
// });

doctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    console.log(this.password);
    this.configPassword = null;
    const time = Date.now();
    this.passwordsetat = time - 1000;
    console.log(`${time} ${this.passwordsetat}`);
    next();
});

doctorSchema.methods.checkpassword = async function (password, givenpassword) {
    try {
        return await bcrypt.compare(givenpassword, password);
    } catch (err) {
        return err;
    }
}

doctorSchema.methods.tokensetafterpasswordset = function (val) {

    let changedTimestamp;
    if (this.passwordsetat) {
        changedTimestamp = parseInt(
            this.passwordsetat.getTime() / 1000,
            10
        );
    }
    return changedTimestamp < val;
}

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;