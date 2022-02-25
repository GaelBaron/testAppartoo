const User = require("../model/user")
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post("/login", async (req, res) => {

    try {
        const { username, password } = req.body;
  
        if (!username || !password)
            return (res.status(400).json({Error: "Require username and password"}))

        const user = await User.findOne({ username })
  
        if (user && (password === user.password)) {
            const token = jwt.sign(
            { user_id: user._id, username },
                process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        )
            user.token = token

            return (res.status(200).json({token: user.token}))
        }
        return (res.status(400).json({Error: "Username or Password incorrect"}))
    } catch (err) {
      console.log(err)
    }
})

module.exports = router