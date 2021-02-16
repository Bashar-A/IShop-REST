const {check}= require('express-validator')
const Attribute = require('./model')
const  {validationResult} = require('express-validator')

exports.addAttributeValidator = [
    check('attribute.name')
        .isLength({min: 2, max: 64}).withMessage("Имя атрибута должно состоять минимум из 2 букв")
        .custom(async (value, {req}) => {
            try{
                const attribute = await Attribute.findOne({name: value})
                if (attribute) return Promise.reject('Такой атрибут уже существует')
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
