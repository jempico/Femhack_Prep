
const express = require('express');
const router = express.Router();
const user = require('../controllers/user');


router
    .route("/")
    .post(user.createUser)
    .delete(user.deleteUser)
    .get(user.readUser)
    .put(user.updateUser)

module.exports = router;
