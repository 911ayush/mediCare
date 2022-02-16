const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AmbulanceSchema = new mongoose.Schema({
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
    ambulanceAddress:{
        //GEOJSON
        type:{
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
    }
},{
    
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    
});

// ambulanceSchema.index({ambulanceAddress: '2dsphere'});

AmbulanceSchema.pre('save', async function (next) {
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

AmbulanceSchema.methods.checkpassword = async function (password, givenpassword) {
    try {
        return await bcrypt.compare(givenpassword, password);
    } catch (err) {
        return err;
    }
}

AmbulanceSchema.methods.tokensetafterpasswordset = function (val) {

    let changedTimestamp;
    if (this.passwordsetat) {
        changedTimestamp = parseInt(
            this.passwordsetat.getTime() / 1000,
            10
        );
    }
    return changedTimestamp < val;
}

const Ambulance = mongoose.model('Ambulance', AmbulanceSchema);
module.exports = Ambulance;
