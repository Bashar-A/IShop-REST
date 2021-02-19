const User = require('../users/model')
const bcrypt = require('bcrypt')

async function create(req, res) {
    try{
        console.debug(req.headers)
        const candidate = req.body.user
        if (!candidate?.email || !candidate?.password || !candidate) {
            throw new Error('Что-то пошло не так!')
        }
        const user = await User.findOne({email: candidate.email})
        if(!user) throw new Error('Пользователь не найден')
        const password = await bcrypt.hash(candidate.password, user.salt)
        const validate = password === user.password
        if(!validate) throw new Error('Неверный пароль')

        const token = user.generateJWT()
        //res.cookie('token', token, {httpOnly: true })

        res.status(200).json({
            message: 'Signin successful',
            user: user.toJSON(),
            token
        })
    }catch(e){
        res.status(401).json({
            error: e.message
        })
    }
}

module.exports = {
    create
};