const empty = require('./empty');
const validator = require('validatorjs');


/**
 * @param{object} err parameter -this check for error first
 *@param{object} data -this hold the user input
 *  */
module.exports = function validateuserInput(err, data) {
let errors={};

    // let errors = {};
    //  data.Firstname = !isEmpty(data.Firstname) ? data.Firstname : "";
    // data.Lastname = isEmpty(data.Lastname) ? data.Lastname : "";
    // data.Password = !isEmpty(data.Password) ? data.Password : "";
    //  data.Password2 = !isEmpty(data.Password2) ? data.Password2 : "";
//     if (!validator.isLength(data.Firstname, {min: 2, max: 30})) {
//         errors.Firstname = "Firstname must be between 2 and 30 characters";
//     }
//     if (validator.isEmpty(data.Firstname)) {
//         errors.Firstname = "Firstname is required";
//     }
//     if (validator.isEmpty(data.Email)) {
//         errors.Email = "Email is required";
//     }
//     if (validator.isEmpty(data.Email)) {
//         errors.Email = "Email is required";
//     }
//     if (!validator.isEmail(data.Email)) {
//         errors.Email = "Email is invalid";
//     }
//     if (validator.isEmpty(data.Password)) {
//         errors.Password = "Password field is required";
//     }
//     if (!validator.isLength(data.Password, {min: 6, max: 10})) {
//         errors.Password = "Password should be at least six characters";
//     }
//     if (validator.isEmpty(data.Password2)) {
//         errors.Password2 = "confirm password field is required";
//     }
//     if (!validator.equals(data.Password, data.Password2)) {
//         errors.Password2 = "pasword must match";
//     }
//
//
//
//
//     return {
//         errors,
//         isValid: isEmpty(errors)
//     }
//
// };
//
};
