const User = require('../Models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')

exports.register = async (req, res) => {
    try {
        //code
        // 1.CheckUser
        const { name, password } = req.body
        var user = await User.findOne({ name })
        if (user) {
            return res.json({ massage: 'User Already exits!!' }).status(400)
        }
        // 2.Encrypt
        const salt = await bcrypt.genSalt(10)
        user = new User({
            name,
            password
        })
        user.password = await bcrypt.hash(password, salt)
        // 3.Save
        await user.save()
        res.json({
            massage: 'Register Success',
            user,
        }).status(200)

    } catch (err) {
        //code
        console.log(err)
        res.status(500).json({ massage: 'internal server error 500 ' })
    }
}
exports.login = async (req, res) => {
    try {
        //code
        // 1. Check User
        const { name, password } = req.body
        var user = await User.findOneAndUpdate({ name }, { new: true })
        console.log('Controller Login:', user)
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)

            if (user.active === false) {
                return res.status(400).json({ massage: 'User Not Active' })
            }

            if (!isMatch) {
                return res.status(400).json({ massage: 'Password Invalid!!!' })
            }
            // 2. Payload

            var payload = {
                user: {
                    id: user._id,
                    name: user.name,
                    role: user.role,
                    active: user.active,
                }
            }
            // 3. Generate
            jwt.sign(payload, 'jwtsecret', { expiresIn: '1d' }, (err, token) => {
                if (err) throw err;
                res.json({
                    massage: 'Login Success',
                    token,
                    payload
                })
            })
        } else {
            return res.status(400).json({ massage: 'User Not found!!!' })
        }

    } catch (err) {
        //code
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.read = async (req, res) => {
    try {
        // code
        const user = await User.find({}).exec();
        res.send(user)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.currentUser = async (req, res) => {
    try {
        console.log('currentUser:', req.user)
        const user = await User.find({ name: req.user.name })
            .select('-password')
            .exec()
        res.json(user)

    } catch (error) {
        console.log(error)
        res.status(401).send('Unauthorized')
    }
}