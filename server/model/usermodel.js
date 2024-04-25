const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   
        name: { type: String },
        gender: { type: String },
        skills: { type: String },
        photo: { type: String },
        dob: { type: Date }, 
        mobile: { type: String },
        terms: { type: String }
    });
    


    module.exports = mongoose.model('User', userSchema);
