const express =require('express');
const  formTypeC= require("./formType.controller");
const router = express.Router();
const passport =require("passport");
const jwt =require("jsonwebtoken");

router.post("/create",passport.authenticate("jwt",{session:false}),formTypeC.createformType);

router.put("/update",passport.authenticate("jwt",{session:false}),formTypeC.updateFormType);

router.delete("/delete",passport.authenticate("jwt",{session:false}),formTypeC.deleteFormType);

router.get("/getall",passport.authenticate("jwt",{session:false}),formTypeC.getAllFormTYpe);



module.exports=router;
