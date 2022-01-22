const User = require("../../models/User");

const {apiResponse, userSchema} = require("../utils/utils");

class userController {
    async createUser(req, res) {
        try {
            let userDTO = {...req.body.newUser}

            //Check if provided input is valid
            let dataIsOk = await userSchema.validateAsync(userDTO);
            if (dataIsOk) {
                //Check if user already exists
                let userExists = await User.find({username: {$eq: userDTO.username}})
                if (userExists.length > 0) {
                    res.status(200).json(
                        apiResponse({
                            message: "A user with the same name already exists. Please provide another name"
                        })
                    )
                } else {
                    let newUser = await User.create(userDTO)
                    res.status(200).json(
                        apiResponse({
                            message: "User registered correctly.",
                            data: newUser
                        })
                    ); 
                }
            }
        } catch(err) {
            if (err.isJoi === true) {
                res.status(400).json(
                    apiResponse({
                        message: "Invalid input provided. Please check body request requirements. ",
                        errors: err.message,
                    })
                )
            }
            res.status(500).json(
                apiResponse({
                    message: "Some error ocurred while creating your account.",
                    errors: err.message,
                }))
        }
    }
    async deleteUser(req, res) {
        try {
            let userDTO = {...req.body.user}
            let deletedUser = await User.deleteOne({ username: userDTO.username });
            if (deletedUser.deletedCount > 0) {
                console.log(deletedUser);
                res.status(200).json(
                    apiResponse({
                        message: "User deleted correctly."  
                    })
                ) 
            } else {
                console.log(deletedUser)
                res.status(400).json(
                    apiResponse({
                        message: "User with that name couldn't be deleted."  
                    })
                ) 
            }
        } catch(err) {
            res.status(500).json(
                apiResponse({
                    message: "Some error ocurred while deleting your account.",
                    errors: err.message,
                }))
        }
    } 
    async readUser(req, res) {
        let userDTO = {...req.body.user}
        try {
            let foundUser = await User.findOne({ username: userDTO.username}).exec();
            if (foundUser !== null ) {
                res.status(200).json(
                    apiResponse({
                        data: foundUser
                    })
                )
            } else {
                res.status(400).json(
                    apiResponse({
                        message: "User with that name couldn't be found."  
                    })
                ) 
            }
        } catch(err) {
            res.status(500).json(
                apiResponse({
                    message: "Some error ocurred while reading your account.",
                    errors: err.message,
                }))
        }
    }
    async updateUser(req, res) {
        try {
            let query = req.body.currentName.username
            let newData = req.body.newData

            let userUpdated = await User.findOneAndUpdate(query, newData);
            if (userUpdated) {
                res.status(200).json(
                    apiResponse({
                        message: "User updated correctly.",
                    })
                )
            } 
        } catch(err) {
            res.status(500).json(
                apiResponse({
                    message: "Some error ocurred while updating your account.",
                    errors: err.message,
                }))
        }
    }
}


module.exports = new userController();
