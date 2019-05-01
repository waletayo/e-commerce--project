const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PermissionSchema= new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    deleted: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

export const PermissionModel = mongoose.model('PermissionModel', PermissionSchema, 'permission');

