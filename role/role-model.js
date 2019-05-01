const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const RoleSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    permission: [{
        type: Schema.Types.ObjectId,
        ref: 'PermissionModel'
    }],
    deleted: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

export const RoleModel = mongoose.model('RoleModel', RoleSchema, 'role');
