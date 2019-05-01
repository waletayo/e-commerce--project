const express =require("express");
const productC =require("./product.controller");
const router =express.Router();
const passport =require("passport");
const jwt =require("jsonwebtoken");

router.post("/create",passport.authenticate("jwt",{session:false}), productC.postProduct);
router.get("/getAll",productC.getallProducts);
router.post("/update",passport.authenticate("jwt",{session:false}),productC.updateProduct);
router.post("/comment/:id",passport.authenticate("jwt",{session:false}),productC.comment_on_product);

module.exports=router;
