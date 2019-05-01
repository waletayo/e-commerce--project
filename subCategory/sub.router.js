const express=require("express");
const router= express.Router();
const passport =require("passport");
const jwt =require("jsonwebtoken");
const subC=require("./sub.controller");

router.post("/create",passport.authenticate("jwt",{session:false}),subC.createSubCategory);
router.get("/get",passport.authenticate("jwt",{session:false}),subC.getAllSubCat);

module.exports = router;
