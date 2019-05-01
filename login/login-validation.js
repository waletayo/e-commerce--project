const isEmpty =require("../config/isEmpty");
const validator=require("validatorjs");



/**
 * @param{object} err parameter -this check for error first
 *@param{object} data -this hold the user input
 *  */
module.exports = function validateRuserInput(err, data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

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

