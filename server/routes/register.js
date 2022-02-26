const {MongoClient} = require('mongodb');
const User = require("../model/user")
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post("/register", async (req, res) => {
    const { username, password, role } = req.body;

    try {
        if (!username || !password || !role) {
            return (res.status(400).json({Error: "Require an username, a password and a role"}));
        }

        const oldUsername = await User.findOne({ username: username })

        if (oldUsername) {
            return (res.status(400).json({Error: "Username already taken"}));
        }

        const newUser = await User.create({
            username: username,
            password: password,
            role: role
        });

        const token = await jwt.sign(
            { user_id: newUser._id, username },
                process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        newUser.token = token;

        return (res.status(200).json({token: newUser.token}));
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;