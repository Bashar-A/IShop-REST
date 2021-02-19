const {check}= require('express-validator')
const Model = require('./model')
const  {validationResult} = require('express-validator')

exports.addModelValidator = [
    check('model.name')
        .isLength({min: 2, max: 64}).withMessage("Имя производителя должно состоять минимум из 2 букв")
        .custom(async (value, {req}) => {
            try{
                const model = await Model.findOne({name: value})
                if (model) return Promise.reject('Такой производитель уже существует')
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
