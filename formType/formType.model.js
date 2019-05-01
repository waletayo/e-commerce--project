const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormSchema = new Schema({
    subCategory:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"subcategory"
    },
    title: {
        type:String,
        required: true
    },
    gender: {
        type:String
    },
    type: {
        type:String,
    },
    age: {
        type:Number,
    }
}, {timestamp: true});

const formtype =mongoose.model("formtype",FormSchema,'fromType');
module.exports=formtype;
