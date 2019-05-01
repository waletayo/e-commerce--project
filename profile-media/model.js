const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    profileImageUrl: {
        type: String,
        required: true
    }
}, {timestamp: true});

const media = mongoose.model('profileImage', mediaSchema, 'profileImageUpload');
module.exports = media;


