const {check}= require('express-validator')
const Category = require('./model')
const  {validationResult} = require('express-validator')

exports.addCategoryValidator = [
    check('category.name')
        .isLength({min: 2, max: 64}).withMessage("Имя категории должно состоять минимум из 2 букв")
        .custom(async (value, {req}) => {
            try{
                const category = await Category.findOne({name: value})
                if (category) return Promise.reject('Такая категория уже существует')
            } catch(e){
                console.log(e)
            }
        }),
    
    async function(req, res, next){
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()[0].msg})
        }
        next()
    }
]

exports.updateCategoryValidator = [
    check('category.name')
        .isLength({min: 2, max: 64}).withMessage("Имя категории должно состоять минимум из 2 букв"),
    
    async function(req, res, next){
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()[0].msg})
        }
        next()
    }
]
