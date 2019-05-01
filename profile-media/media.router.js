const express = require("express");
const mediaC=require('./media.controller');
const router = express.Router();
const multer =require("multer");
const passport =require("passport");
const jwt =require("jsonwebtoken");
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log("file", file);
        callback(null, "./uploads/");
    },
    filename: function (req, file, callback) {
        console.log("multer file:", file);
        callback(null, file.originalname);
    }
});
let maxSize = 1000000 * 1000;
let upload = multer({
    storage: storage,
    limits: {
        fileSize: maxSize
    }
});

router.post('/postImage',passport.authenticate("jwt",{session:false}),upload.single('profileImageUrl'), mediaC.upload);




module.exports=router;
