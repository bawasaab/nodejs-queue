const mongoose = require('mongoose')
const GENDER = ['MALE', 'FEMALE'];

const userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    gender: { 
        type: String, 
        enum: GENDER, 
        default: 'MALE' 
    },
},
{
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
