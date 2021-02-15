const bcrypt = require('bcrypt')
const User = require('./model')
const jwt = require('jsonwebtoken')
const keys = require('../../keys')

async function create(req, res)  {
    try{
        const args = req.body.user
        
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(args.password, salt)

        const user = await User.create({...args, password, salt})
        

        const token = jwt.sign({ userId: user.id },keys.JWT_SIGNATURE)

        res.cookie('token', token, { httpOnly: true })
            
        user.save()

        res.status(200).json({
            message: 'Signup successful',
            user:{
                id : user._id,
                email: user.email,
                name: user.name
            }
        })
    }catch(e){
        console.debug(e)
        res.status(401).send(e)
    }
}
  
module.exports = {
    create
};