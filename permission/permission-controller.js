import {PermissionModel} from "./permission-model";
import _ from 'underscore';


/**
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @param {Object} next The callback to handler next result
 * */
async function create(req, res, next) {
    console.log('req body:', req.body);
    if (!_.isEmpty(req.body)) {
        const permission = new PermissionModel(req.body).save();
        if (permission) {
            console.log('permisson:', permission);
            return res.status(201).json({
                status: true,
                code: 201,
                message: 'PermissionModel successfully created',
                data: permission
            });
        } else {
            return res.status(400).json({
                status: false,
                code: 400,
                message: 'Unable to create permission',
            })
        }
    }
}

/**
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @param {Object} next The callback to handler next result
 * */
function find(req, res, next) {
    PermissionModel.find()
        .exec((err, permission) => {
            if (err) {
                return res.status(500).json({
                    status: true,
                    code: 500,
                    message: err.message
                });
            }
            if (permission) {
                return res.status(200).json({
                    status: true,
                    code: 200,
                    message: 'PermissionModel successfully fetched',
                    data: permission
                });
            }

        });
}

/**
 * @param {Object} id The Id for request
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @param {Object} next The callback to handler next result
 * */
function findOne(req, res, next) {
    console.log('id:', req.params.id);
    PermissionModel.findOne({_id: req.params.id, deleted: false})
        .exec((err, permission) => {
            if (err) {
                return res.status(500).json({
                    status: true,
                    code: 500,
                    message: err.message
                });
            }
            if (permission) {
                return res.status(200).json({
                    status: true,
                    code: 200,
                    message: 'PermissionModel successfully fetched',
                    data: permission
                });
            }
        })
}

/**
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @param {Object} next The callback to handler next result
 * */
function update(req, res, next) {

}

/**
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @param {Object} next The callback to handler next result
 * */
function softDelete(req, res, next) {

}

export {create, find, findOne, update, softDelete};
