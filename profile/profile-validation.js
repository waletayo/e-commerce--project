const validator = require("validatorjs");
const isEmpty = require("../config/isEmpty");


/**
 * @param{object} err parameter -this check for error first
 *@param{object} data -this hold the user input
 *  */
module.exports = function validateRuserInput(err, data) {
    let errors = {};

    data.agentName = !isEmpty(data.agentName) ? data.agentName : "";
    data.agentAddress = !isEmpty(data.agentAddress) ? data.agentAddress : '';
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.openingT = !isEmpty(data.openingT) ? data.openingT : "";
    data.closingT = !isEmpty(data.closingT) ? data.closingT : "";

    if (!validator.isLength(data.agentName, {min: 2, max: 30})) {
        errors.agentName = "name must be between 2 and 30 characters";
    }
    if (validator.isEmpty(data.name)) {
        errors.name = "name is required";
    }
    if (validator.isEmpty(data.agentAddress)) {
        errors.agentAddress = "agent address  is required";
    }

    if (validator.isEmpty(data.phoneNumber)) {
        errors.phoneNumber = "PhoneNumber field is required";
    }
    if (validator.isEmpty(data.description)) {
        errors.description = "description field is required";
    }
    if (validator.isEmpty(data.openingT)) {
        errors.openingT = "opening time field is required";
    }
    if (validator.isEmpty(data.closingT)) {
        errors.closingT = "closing time field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

};


