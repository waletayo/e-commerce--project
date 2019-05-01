const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    subCategory:{
        type:Schema.Types.ObjectId,
        ref:"subcategory"
    },
    name: {
        type: String,
        required: true
    }
}, {timestamp: true});

const category = mongoose.model("category", categorySchema, "category");
module.exports = category;
