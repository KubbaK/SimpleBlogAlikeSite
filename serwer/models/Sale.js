const mongoose = require("mongoose");

const schema_sale = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:[50,"Pleasure ensure your title is shorter than 50 chars"]
    },
    description:{
        type:String,
        maxlength:[500,"Please ensure your description is shorter than 500 chars"]
    },
    contact_details:{
        type:String
    },
    type:{
        type:String,
        required:true
    },
    publication_date:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'User',
        required:true
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
});
module.exports = mongoose.model('Sale',schema_sale)