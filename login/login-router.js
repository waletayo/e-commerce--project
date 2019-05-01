const express = require("express");
const router = express.Router();
const loginCon= require("./login-controller");

router.post("/user",loginCon.userLogin);


module.exports=router;
