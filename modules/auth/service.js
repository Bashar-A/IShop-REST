const User = require('../users/model')
const bcrypt = require('bcrypt')

async function create(req, res) {
    try{
        const candidate = req.body.user
        if (!candidate?.email || !candidate?.password || !candidate) {
            throw new Error('Please specify "email" and "password" fields in body.user')
        }
        const user = await User.findOne({email: candidate.email})
        if(!user) throw new Error('Пользователь не найден')
        const password = await bcrypt.hash(candidate.password, user.salt)
        const validate = password === user.password
        if(!validate) throw new Error('Неверный парль')

        const token = user.generateJWT()
        res.cookie('token', token, { httpOnly: true })

        res.status(200).json({
            message: 'Signin successful',
            user:{
                id : user._id,
                email: user.email,
                name: user.name
            }
        })
    }catch(e){
        res.status(401).json({
            error: e.message
        })
    }
}

async function close(req, res) {
        res.cookie('token', "" ,{ httpOnly: true , maxAge : -1})

        res.status(200).json({
            message: 'Signout successful',
        })
}

module.exports = {
    create,
    close
};