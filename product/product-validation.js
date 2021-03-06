const validator = require('validatorjs');
const isEmpty = require("../config/isEmpty");


/**
 * @param{object} err parameter -this check for error first
 *@param{object} data -this hold the user input
 *  */
module.exports = function validateRuserInput(err, data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.description = !isEmpty(data.description) ? data.description : '';
    data.price = !isEmpty(data.price) ? data.price : "";
    data.location = !isEmpty(data.location) ? data.location : "";
    if (!validator.isLength(data.name, {min: 2, max: 30})) {
        errors.Firstname = "name must be between 2 and 30 characters";
    }
    if (validator.isEmpty(data.name)) {
        errors.name = "name is required";
    }
    if (validator.isEmpty(data.description)) {
        errors.description = "description is required";
    }
    if (validator.isEmpty(data.price)) {
        errors.price = "price field is required";
    }
    if (validator.isEmpty(data.location)) {
        errors.location = "location field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

};

