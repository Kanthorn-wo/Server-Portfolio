const jwt = require('jsonwebtoken')
const User = require('../Models/Users')

exports.auth = async (req, res, next) => {
    try {
        //code
        const token = req.headers["authtoken"]

        if (!token) {
            return res.status(401).send('No token')
        }
        const decoded = jwt.verify(token, 'jwtsecret')
        req.user = decoded.user

        next();
    } catch (err) {
        // err
        console.log(err)
        res.send('Token Invalid').status(500)
    }
}

exports.adminCheck = async (req, res, next) => {
    try {
        console.log(req.user)
        const userAdmin = await User.findOne({ name: req.user.name }).select('-password').exec()
        if (userAdmin.role != 'admin') {
            res.status(403).json({
                massage: 'Admin Access Denied',
                role: userAdmin.role
            })
        } else {
            next();
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Sever Internal Error')
    }
}

