const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:"category",
        required: true
    }
},{timestamp:true});
const subCategory= mongoose.model("subcategory",subSchema,"subCategory");
module.exports=subCategory;
