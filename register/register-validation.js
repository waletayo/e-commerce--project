const validator = require('validatorjs');
const isEmpty = require("../config/isEmpty");


/**
 * @param data
 *  */
module.exports=function validateRegisterInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : "";
    data.username = !isEmpty(data.username) ? data.username : '';
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // if (!validator.isLength(data.name, {min: 2, max: 30})) {
    //     errors.Firstname = "name must be between 2 and 30 characters";
    // }
    if (validator.isEmpty(data.name)) {
        errors.name = "name is required";
    }
    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (!validator.isLength(data.password, {min: 6, max: 10})) {
        errors.password = "Password should be at least six characters";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }

};

