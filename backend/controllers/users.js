const User = require('../models/User')
const asyncWrapper = require('../middleware/async')
const bcrypt = require('bcrypt')

// register
const register = asyncWrapper(async (req, res) => {
    // generate new pasword
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // create new user
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    })

    // save user and send response
    const user = await newUser.save()
    res.status(200).json({user})
})

// login

module.exports = {
    register
}
