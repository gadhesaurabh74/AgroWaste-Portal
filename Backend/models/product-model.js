const mongoose = require('mongoose');

const productSchema=mongoose.Schema({
    wastename:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
    },

})

module.exports=mongoose.model('Product',productSchema);