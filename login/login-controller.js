const User = require('../register/register-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.userLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email})
        // .populate('role')
        .then(user => {
            console.log("user login", user);
            if (!user) {
                return res.json({
                    status: false,
                    message: "this email address " + req.body.email + "is not associated with any account"
                })
            }
            bcrypt.compare(password,user.password)
                .then(( isMatch) => {
                    console.log("is macth", isMatch);
                    if (isMatch) {
                        const payload = {id: user.id};
                        jwt.sign(payload, "keys", {expiresIn: 3600}, (error, token) => {

                            res.json({
                                status: true,
                                success: true,
                                message: "Login Successfully",
                                data: {
                                    token: "Bearer " + token,
                                    user: user
                                }
                            });
                        });
                    }
                    if (!user.isverified) {
                        return res.json({
                            status: false,
                            message: "please verify your email account please "
                        })
                    }

                })

        }).catch(err=>{
            console.log("error eror", err)
    })
};



exports.facebookauth=()=>{


};



