const mongoose = require('mongoose');
const { Schema } = mongoose;

const modelSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    dob : {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})


const User = mongoose.model('User', modelSchema);
module.exports = User;