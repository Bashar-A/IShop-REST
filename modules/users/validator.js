const {check}= require('express-validator')
const User = require('./model')

exports.registerValidator = [
    check('user.email')
    .isEmail().withMessage("test")
    .custom(async (value, {req}) => {
        try{
            const user = await User.findOne({email: value})
            if (user) return Promise.reject('Такой email уже занят')
        } catch(e){
            console.log(e)
        }
    }),

    check('user.name').isLength({min: 2, max: 64}).withMessage(""),
    check('user.password').isLength({min: 3, max: 64}).withMessage("")
]
