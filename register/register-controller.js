const Validator = require('validatorjs');
const validateRegisterInput = require('./register-validation');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
const crypto = require("crypto");
const User = require("./register-model");
const logger = require("../helper/logger");
const sendGrid = require("../helper/mailer");
const Token = require("./verify-register-token");
/**
 * @param{Object} req this hold the request parameter of the end point
 * @param{Object} res this holds the response parameter of the endpoint
 * @param{object} next this holds the next action incase of a  delay or error
 * */

exports.registerUser = (req, res, next) => {
    /**
     * @param{string}name - user name-min:2 max:30
     * @param {string} Email - user email - must be type email
     * @param{string} password- user password
     * @param{string} password2 -user confirm password
     // * */
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                return res.json({
                    status: false,
                    message: "email already exist",
                    code: 400
                })
            } else {
                const newUser = User(req.body);
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                token = new Token({
                                    // _userId: user._id,
                                    user: user._id, token: crypto.randomBytes(16).toString('hex')
                                });
                                token.save((err) => {
                                    if (err) {
                                        return res.json({
                                            status: false,
                                            code: 500,
                                            message: "an error occur"
                                        })
                                    }
                                    let sendEmail = sendGrid.sendMail("no-reply@movement", user.email, "Account Verification Token",
                                        "Hello " + user.name + " \n" +
                                        ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api/reg/confirm\/' + token.token + '.\n');

                                    if (sendEmail) {
                                        logger.log("send email success", sendEmail);
                                    } else {
                                        logger.log("send email failed", sendEmail);
                                    }
                                    logger.log("user:", user);
                                    res.json({
                                        status: true,
                                        message: "signup successful and an email have been sent to" + req.body.email + "your auth token" + token.token,
                                        data: user
                                    });
                                });
                            })
                            .catch(err => {
                                console.log("error creating user account", err);
                            })
                    })
                })
            }
        })

};
/**
 * @param{Object} req this hold the request parameter of the end point
 * @param{Object} res this holds the response parameter of the endpoint
 * @param{object} next this holds the next action incase of a  delay or error
 * */
exports.getall = (req, res, next) => {
    User.find()
        .populate('role')
        .then(user => {
            if (user) {
                return res.json({
                    status: true,
                    message: "this ia all the registered user on the platform",
                    data: user
                })
            }
        })
        .catch(err => {
            logger.log("register error ", err);

        })

};
/**
 * @param{Object} req this hold the request parameter of the end point
 * @param{Object} res this holds the response parameter of the endpoint
 * @param{object} next this holds the next action incase of a  delay or error
 * */
exports.confirmationE = (req, res) => {
    let token = req.params.token;
    console.log("user token ", token);
    Token.findOne({token: token}, (err, userToken) => {
        console.log("usersT", userToken);
        if (!userToken) {
            return res.json({
                status: false,
                type: "Not verified",
                message: "We were unable to find a valid token. Your token my have expired",

            });
        }

        if (userToken) {
            User.findById(userToken.user, (err, user) => {
                if (!user) {
                    return res.json({
                        status: false,
                        code: 400,
                        message: "we are unable to find a user for this token"
                    })
                }
                if (user.isverified) {
                    return res.json({
                        message: "user have already been verified "
                    })
                }
                user.isverified = true;
                user.save(err => {
                    if (err) {
                        return res.json({
                            message: "an error occur"
                        })
                    } else {


                        res.json({
                            message: "user is verified please login"
                        })
                    }
                })
            })
        }

    })


};

/**
 * @param{Object} req this hold the request parameter of the end point
 * @param{Object} res this holds the response parameter of the endpoint
 * @param{object} next this holds the next action incase of a  delay or error
 * */

exports.resendE = (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "email not found ",
                code: 404
            })
        }
        if (user.isverified) {
            return res.json({
                status: true,
                message: "this account have already been verified please login "
            })
        }
        token = new Token({
            _userId: user._id, token: crypto.randomBytes(16).toString('hex')
        });
        token.save(err => {
            if (err) {
                return res.json({
                    status: false,
                    message: err.message
                })
            }
            let sendEmail = sendGrid.sendMail("no-reply@movement", user.email, "Account Verification Token",
                "Hello " + user.name + " \n" +
                ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n');

            if (sendEmail) {
                logger.log("send email success", sendEmail);
            } else {
                logger.log("send email failed", sendEmail);
            }
            logger.log("user:", user);
            res.json({
                status: true,
                message: "Email have been resent to " + req.body.email + "your auth token" + token.token,
                data: user
            });
        });
    })


};





