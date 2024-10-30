const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccountSchema = new Schema({
    username: {
        type: String,
        required: true,
        // unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    } ,
    fullName: {
        type: String,
        required: true
    } ,
    phoneNumber: {
        type: String,
        required: true
    } ,
    // role: { type: String, enum: ['customer', 'admin'], default: 'customer', required: true },
}, { timestamps: true });

const Account = mongoose.model("Register", AccountSchema);

module.exports = Account