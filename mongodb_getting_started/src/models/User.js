const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    username: { type: String, unique: true },
    age: { type: Number },
    city: { type: String }
}, 
{
    versionKey: false
});



 
module.exports= mongoose.model('User',UserSchema);