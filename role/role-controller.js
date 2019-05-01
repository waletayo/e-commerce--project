const _ = require('underscore');
const Role = require('./role-model');


/**
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @param {Object} next The callback to handler next result
 * */
function create(req, res, next) {
    console.log('req body:', req.body);
    if (!_.isEmpty(req.body)) {
        const role = new Role(req.body).save();
        if (role) {
            console.log('permisson:', role);
            return res.status(201).json({
                status: true,
                code: 201,
                message: 'RoleModel successfully created',
                data: role
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
    Role.find()
        .populate('permission')
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
                    message: 'RoleModel successfully fetched',
                    data: permission
                });
            }

        });
}

/**
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @param {Object} next The callback to handler next result
 * */
function findOne(req, res, next) {
    console.log('id:', req.params.id);
    Role.findOne({_id: req.params.id, deleted: false})
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
                    message: 'RoleModel successfully fetched',
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
    Role.findOneAndRemove({_id: req.params.id})
        .then(() => {
            User.findOneAndRemove({_id: req.user.id})
                .then(() => res.json({
                    status: true
                }));
        });

}

export {create, find, findOne, update, softDelete};
