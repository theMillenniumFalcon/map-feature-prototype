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
const login = asyncWrapper(async (req, res) => {
    // find user
    const user = await User.findOne({username: req.body.username})
    !user && res.status(400).json("Wrong username or password!")

    // validate password
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    )
    !validPassword && res.status(400).json("Wrong username or password!")

    // send response
    res.status(200).json({_id: user._id, username: username})
})

module.exports = {
    register, login
}
