const express =require("express");
const router = express.Router();
const multer =require("multer");
const  ProductI= require("./productImage.controller");
const passport =require("passport");
const jwt= require("jsonwebtoken");

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log("file", file);
        callback(null, "./productUpload/");
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


router.post("/postImage",passport.authenticate("jwt",{session:false}),upload.array("productImageUrl[]"),ProductI.upload);




module.exports=router;
