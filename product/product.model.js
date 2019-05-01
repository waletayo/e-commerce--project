const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    subCategory:{
      type:Schema.Types.ObjectId,
      required:true,
      ref:"subcategory"
    },
    category:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"category"
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'

    },
        productImage: {
            type: Schema.Types.ObjectId,
            ref: 'productImage'

        },
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        require:true
    },
    location:{
        type:String,

    },

    comment: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref:
                    'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],

},{timestamp:true});
const product= mongoose.model('product',ProductSchema,'Product');
module.exports=product;
