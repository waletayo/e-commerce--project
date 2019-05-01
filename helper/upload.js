const cloudinary = require("cloudinary");
const cloud = require('../helper/cloudUpload');
const Q=require('q');
exports.upload = (file) => {
    cloudinary.config({
        cloud_name: cloud.cloud_name,
        api_key: cloud.api_key,
        api_secret: cloud.api_secret
    });
    return new Q.Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file, {width: 50, height: 50}, (err, res) => {
            if (err) {
                reject(err);
            } else {
                return resolve(res);
            }
        });
    })
};


