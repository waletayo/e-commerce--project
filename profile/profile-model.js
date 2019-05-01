const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    Pmedia: {
        type: Schema.Types.ObjectId,
        ref: 'profileImage'
    },
    agentName: {
        type: String,
        required: true
    },
    agentAddress: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    openingT: {
        type: Date,
        required: true
    },
    closingT: {
        type: String,
        required: true
    },
}, {timestamp: true});
const Profile = mongoose.model('profileSchema', ProfileSchema, 'profile');
module.exports = Profile;
