const mongoose = require("mongoose")

const schema_saleComment = new mongoose.Schema({
    content:{
        type:String,
        required:true,
        maxlength:[200,"Pleasure ensure your comment is shorter than 200 chars"]
    },
    publication_date:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'User',
        required:true
    },
    sale:{
        type:mongoose.Schema.Types.ObjectId,ref:'Sale',
        required:true
    }
});

module.exports = mongoose.model('SaleComment',schema_saleComment)
