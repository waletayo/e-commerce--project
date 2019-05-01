const express = require("express");
const router = express.Router();
const CatController = require("./category.controller");
const passport = require("passport");


router.post("/create", passport.authenticate("jwt", {session: false}), CatController.createCategory);

router.put("/update/:id", passport.authenticate("jwt", {session: false}), CatController.updateCategory);

router.get("/getall", passport.authenticate("jwt", {session: false}), CatController.getAllCategory);

router.delete("/delete/:id", passport.authenticate("jwt", {session: false}), CatController.delteCategory);


module.exports = router;

