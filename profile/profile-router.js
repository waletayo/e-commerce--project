const express = require("express");
const profileC = require("./profile-controller");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const multer = require("multer");

router.post("/create", passport.authenticate('jwt', {session: false}), profileC.createProfile);
router.put('/update', passport.authenticate('jwt', {session: false}), profileC.updateAgentProfile);
module.exports = router;
