const mongoose = require('mongoose');


const clientSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },

    address :{
        type : String,
        required : true
    },

    recpNo :{
        type : Number,
        required : true
    },

    recAmount : {
        type : Number,
        required : true
    }
},{
    timestamps : true
});







const client = mongoose.model('Client', clientSchema);
module.exports= client;