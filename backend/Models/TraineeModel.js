const mongoose = require('mongoose');

const traineeSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    nic:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    trainingStartDate:{
        type:String,
        required:true
    },
    trainingEndDate:{
        type:String,
        required:true
    },
    institute:{
        type:String,
        required:true
    },
    languages:{
        type:String,
        required:true
    },
    specializations:{
        type:String,
        required:true
    },
    supervisor:{
        type:String,
        required:true
    },
    assignedWork:{
        type:String,
        required:true
    },
    targetDate:{
        type:String,
        required:true
    }

},{_id:false});


module.exports = mongoose.model('Trainee', traineeSchema);