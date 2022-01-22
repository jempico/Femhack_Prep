const Joi = require("joi");



/*
/ message - A user friendly message of what happened, string, defaults to ''
/ data - The main data, defaults to an object, it can be any type
/ errors - An array of errors generated in processing, defaults to []
**/
const apiResponse = ({message = "", data = {}, errors = []}) => {
	return {message, data, errors};
};

const userSchema = Joi.object({
	username: Joi.string().required(),
	age: Joi.number().integer().min(0).max(100),
	city: Joi.string(),
});


module.exports = { apiResponse, userSchema }