const {check}= require('express-validator')
const Model = require('./model')
const Vendor = require('../vendors/model')
const  {validationResult} = require('express-validator')

exports.addModelValidator = [
    check('model.name')
        .isLength({min: 2, max: 64}).withMessage("Имя модели должно состоять минимум из 2 букв"),

    // check('model.vendor')
    //     .custom(async (value, {req}) => {
    //         try{
    //             const vendor = await Vendor.findById(value)
    //             if (!vendor) return Promise.reject('Такого производителя не существует')
    //         } catch(e){
    //             console.log(e)
    //         }
    //     }),
    
    async function(req, res, next){
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()[0].msg})
        }
        next()
    }
]

exports.updateModelValidator = [
    check('model.name')
        .isLength({min: 2, max: 64}).withMessage("Имя модели должно состоять минимум из 2 букв"),

    // check('model.vendor')
    //     .custom(async (value, {req}) => {
    //         try{
    //             const vendor = await Vendor.findById(value)
    //             if (!vendor) return Promise.reject('Такого производителя не существует')
    //         } catch(e){
    //             console.log(e)
    //         }
    //     }),
    
    async function(req, res, next){
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()[0].msg})
        }
        next()
    }
]
