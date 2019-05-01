const express = require("express");
const router = express.Router();
const register = require("./register-controller");

router.post('/user', register.registerUser);
router.get('/alluser',register.getall);
// router.post('/confirmE',register.confirmationE);
router.post('/resend',register.resendE);
router.get('/confirm/:token',register.confirmationE);
// router.post('/resend',register.resendE);

module.exports = router;
