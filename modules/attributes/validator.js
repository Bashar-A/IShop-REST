const {check}= require('express-validator')

exports.addAttributeValidator = [
    check('attribute.name')
        .isLength({min: 2, max: 64}).withMessage("Имя атрибута должно состоять минимум из 2 букв")
]
