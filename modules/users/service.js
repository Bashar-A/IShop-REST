const bcrypt = require('bcrypt')
const User = require('./model')
const  {validationResult} = require('express-validator')


async function create(req, res)  {
    try{
        const args = req.body.user
        
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(args.password, salt)

        const user = await User.create({...args, password, salt})
        

        const token = user.generateJWT()

        //res.cookie('token', token, { httpOnly: true })
            
        user.save()

        res.status(200).json({
            message: 'Signup successful',
            user:{
                id : user._id,
                email: user.email,
                name: user.name
            },
            token
        })
    }catch(e){
        res.status(400).json({
            error: e.message
        })
    }
}
  
module.exports = {
    create
};