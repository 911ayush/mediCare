const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const doctorSchema = new mongoose.Schema({
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
        }
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
}, {
    toJSON: { Virtuals: true },
    toObject: { Virtuals: true }
});

doctorSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    console.log(this.password);
    this.configPassword = null;
    next();
});

// userSchema.methods.dothisfor = async function(){
//     try{
//         const lb = await bcrypt.hash("asdfghjk",12);
//         console.log(`encrypted string${lb}`);
//     }catch(err){
//         return err;
//     }
    
// }

doctorSchema.methods.checkpassword = async function (password, givenpassword) {
    try {
        return await bcrypt.compare(givenpassword,password);
    } catch (err) {
        return err;
    }
}

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;