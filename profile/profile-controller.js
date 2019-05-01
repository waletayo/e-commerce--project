const Profile = require("./profile-model");
const _ = require('underscore');
const upload = require("../helper/upload");
/**
 * @param{Object} req this hold the request parameter of the end point
 * @param{Object} res this holds the response parameter of the endpoint
 * @param{object} next this holds the next action incase of a  delay or error
 * */

exports.createProfile = (req, res, next) => {
    console.log("u", req.user.id);
    // let imageUrl;
    // console.log("file", req.file);
    // if (req.file || !_.isEmpty(req.file)) {
    //     const file = req.file.path;
    //     upload.upload(file).then(result => {
    //         console.log("result", result);
    //         if (result) {
    //             imageUrl = result.url;
    //             _.extend(profileReq, {profileImageUrl: imageUrl});
    //         }
    //
    //     }).catch(err => {
    //         console.log("image upload error", err);
    //         return next(err);
    //     });
    // }
    let profileReq = req.body;
    _.extend(profileReq, {user: req.user.id});
    console.log('profile req:', profileReq);
    let profile = new Profile(profileReq);
    profile.save((err, savedProfile) => {
        if (err) {
            console.log('err:', err);
            return res.status(500).json({
                status: false,
                message: 'Unable to create profile',
                code: 500
            });
        }
        if (savedProfile) {
            return res.status(201).json({
                status: false,
                message: 'Profile successfully created',
                code: 201,
                data: savedProfile
            });
        }
    })

};
/**
 * @param{Object} req this hold the request parameter of the end point
 * @param{Object} res this holds the response parameter of the endpoint
 * @param{object} next this holds the next action incase of a  delay or error
 * */


exports.updateAgentProfile = (req, res, next) => {
    let profileFields = req.body;
    _.extend(profileFields, {user: req.user.id});
    console.log("user id", req.user.id);
    console.log("profile updated", profileFields);
    Profile.findOne({user: profileFields.user}, (err, profile) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Unable to find profile',
                code: 500
            });
        }

        _.assign(profile, profileFields);
        profile.save((err, updatedProfile) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: 'Unable to update profile',
                    code: 500
                });
            }

            if (updatedProfile) {
                return res.status(200).json({
                    status: false,
                    message: 'profile sucessfuly updated',
                    code: 200,
                    data: updatedProfile
                });
            }
        })
    })

};
