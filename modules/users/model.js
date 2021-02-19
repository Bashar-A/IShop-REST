const {Schema, model} = require('mongoose')
const jwt = require('jsonwebtoken')
const keys = require('../../keys')

const User = new Schema({
    email:{
        type: String,
        required: true
    },
    name: String,
    salt: String,
    password: String,
    isAdmin: {type: Boolean, default: false},
    resetToken: String,
    resetTokenExp: Date
},{
    timestamps: true
})

User.methods.toJSON = function() {
    return {
        id: this._id,
        email: this.email,
        name: this.name
    }
}

User.methods.generateJWT = function() {
    const today = new Date()
    const expirationDate = new Date(today)
    expirationDate.setDate(today.getDate() + 60)
  
    return jwt.sign({
      id: this._id
      //exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, keys.JWT_SIGNATURE)
}

module.exports = model('User', User)