const productImage = require('./productImage.model');
const uploadImage = require('../helper/upload');
const _ = require('underscore');

module.exports.upload = uploadProductImage;

function uploadProductImage(req, res, next) {
    console.log("req file:", req.files[0].path);
    if (req.files && !_.isEmpty(req.files) && req.files instanceof Array) {
        let file = req.files[0].path;
        console.log('product file', file);
        uploadImage.upload(file).then(result => {
            console.log("result", result);
            if (result) {
                let productReq = {user: req.user.id, productImageUrl: result.url};
                let media = new productImage(productReq);
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
                            message: 'Saved product Image',
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
