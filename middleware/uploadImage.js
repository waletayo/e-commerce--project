// const multer = require("multer");
// // const upload= require('../uploads')
//
// /**
//  * @function
//  * */
// exports.getMulter = () => {
//     return multer({
//         storage: multer.diskStorage({
//             destination: function (req, file, cb) {
//                 // cb(null, this.folder);
//                 cb(null, './uploads/');
//             },
//             filename: function (req, file, cb) {
//                 // console.log("multer file:",file);
//                 cb(null, file.originalname)
//             },
//             limits: {
//                 fileSize: this.limit
//             }
//         })
//     });
// };
//
// /**
//  * @function
//  * */
// exports.init = () => {
//     let middlware = getMulter().single(this.type);
//     if (this.size > 1) {
//         middlware = getMulter().array(this.type, this.size);
//     }
//     return middlware;
// };
const multer = require('multer');

/**
 * @class
 * */
class UploadFile {


    /**
     * @constructor
     * @param {Object} options The Object options
     **/
    constructor(options = {type: 'media', size: 1, folder: 'media', limit: 1000000}) {
        this.type = options.type;
        this.size = options.size;
        this.folder = options.folder;
        this.limit = options.limit;
    }

    /**
     * @function
     * */
    getMulter() {
        return multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    // cb(null, this.folder);
                    cb(null, './uploads/');
                },
                filename: function (req, file, cb) {
                    // console.log("multer file:",file);
                    cb(null, file.originalname)
                },
                limits: {
                    fileSize: this.limit
                }
            })
        });
    }

    /**
     * @function
     * */
    init() {
        console.log('init here');
        let middlware = this.getMulter().single(this.type);
        if (this.size > 1) {
            middlware = this.getMulter().array(this.type, this.size);
        }
        return middlware;
    }
}

// module.exports.UploadFile = UploadFile;
module.exports = {UploadFile};
