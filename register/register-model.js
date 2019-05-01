const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    role: {
        type: Schema.Types.ObjectId,
        ref: 'RoleModel'
    },
    name: {
        type: String,
        required: true
    },
    isverified: {
        type: Boolean,
        default: false
    },
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true

    },
    phoneNumber:{
      type:Number,
      required:true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});


const User = mongoose.model('user', userSchema);
module.exports = User;

