const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');

var userSchema = new Schema({
    name : {
        type: String,
        required: [true, 'Name not null']
    },
    email : {
        type: String,
        unique: [true, 'Email was registered!'],
        required: [true, 'email not null']
    },
    password : {
        type: String,
        minlength: [5, 'Password min 5 Character'],
        required: [true, 'Password not null']
    }
}, { 
    timestamps: true 
})

userSchema.pre('save', function(next) {
    if(this.password){
        let salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})

var User = mongoose.model('User', userSchema)

module.exports = User