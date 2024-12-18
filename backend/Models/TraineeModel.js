const mongoose = require('mongoose');

const traineeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    // nic:{
    //     type:String,
    //     required:true
    // },
    // email:{
    //     type:String,
    //     required:true
    // },
    // address:{
    //     type:String,
    //     required:true
    // },
    // trainingStartDate:{
    //     type:Date,
    //     required:true
    // },
    // trainingEndDate:{
    //     type:Date,
    //     required:true
    // },
    // institute:{
    //     type:String,
    //     required:true
    // },
    // languages:{
    //     type:String,
    //     required:true
    // },
    // specializations:{
    //     type:String,
    //     required:true
    // },
    // supervisor:{
    //     type:String,
    //     required:true
    // },
    // assignedWork:{
    //     type:String,
    //     required:true
    // },
    // targetDate:{
    //     type:Date,
    //     required:true
    // }

});

module.exports = mongoose.model('Trainee', traineeSchema);