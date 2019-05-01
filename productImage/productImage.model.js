const mongoose =require("mongoose");
const Schema= mongoose.Schema;
const productImageSchema = new Schema({
user: {
    type: Schema.Types.ObjectId,
        ref: 'user'
},
productImageUrl: {
    type: String,
        required: true
}
}, {timestamp: true});

const productImage = mongoose.model('productImage', productImageSchema, 'ProductImage');
module.exports = productImage;

