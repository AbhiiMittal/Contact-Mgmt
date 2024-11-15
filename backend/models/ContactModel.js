const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
    },
    jobTitle : {
        type : String
    },
    company : {
        type : String
    }
});

module.exports =  mongoose.model('Contact', contactSchema);