const multer = require("multer");
const Pmedia = require('./model');
const uploadImage = require('../helper/upload');
const _ = require('underscore');

module.exports.upload = uploadProfileImage;

function uploadProfileImage(req, res, next) {
    if (req.file && !_.isEmpty(req.file)) {
        let file = req.file.path;
        console.log('file:', file);
        uploadImage.upload(file).then(result => {
            if (result) {
                let profileReq = {user: req.user.id, profileImageUrl: result.url};
                let media = new Pmedia(profileReq);
                media.save((err, saveMedia) => {
                    if (err) {
                        return res.status(500).json({
                            status: true,
                            message: 'Unable to save upload file',
                            code: 500
                        });
                    }
                    if (saveMedia) {
                        return res.status(201).json({
                            status: true,
                            message: 'Saved profile',
                            code: 201,
                            data: saveMedia
                        });
                    }
                })
            }
        }).catch(err => {
            console.log('err', err);
            return res.status(500).json({
                status: false,
                message: 'Unable to upload image',
                code: 500
            });
        })
    }
}
