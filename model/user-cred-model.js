const mongoose = require('mongoose');

const credSchema = mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    websitename:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('cred', credSchema);

