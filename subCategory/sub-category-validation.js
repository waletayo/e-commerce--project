const isEmpty = require("../config/isEmpty");
const validator=require("validatorjs");



/**
 * @param{object} err parameter -this check for error first
 *@param{object} data -this hold the user input
 *  */
module.exports = function validateRuserInput(err, data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    if (!validator.isLength(data.name, {min: 2, max: 30})) {
        errors.Firstname = "name must be between 2 and 30 characters";
    }
    if (validator.isEmpty(data.name)) {
        errors.name = "name is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

};

