const mongoose = require('mongoose');

const userSchema = mongoose.Schema({


username:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
},
password:{
    type:String,
    required:true
},
mobileno:{
    type:Number
},
gender:{
    type:String
}

});

module.exports = mongoose.model('user',userSchema);

