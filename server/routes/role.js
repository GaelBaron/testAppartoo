const User = require("../model/user")
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post("/role/get", async (req, res) => {
    const { username } = req.body;

    try {
        if (!username) {
            return (res.status(400).json({Error: "Require an username"}));
        }

        const newUser = await User.findOne({ username: username });

        if (!newUser) {
            return (res.status(400).json({role: 'Doesnt exist'}));
        }
        return (res.status(200).json({role: newUser.role}));
    } catch (err) {
        console.log(err);
    }
})

router.post("/role/change", async (req, res) => {
    const { username, role } = req.body;
    const roles = ["Guerrier", "Alchimiste", "Sorciers", "Espions", "Enchanteur"]

    try {
        if (!role || !username) {
            return (res.status(400).json({Error: "Require a role and an username"}));
        }

        const newUser = await User.findOne({ username: username });

        if (!newUser) {
            return (res.status(400).json({role: 'Doesnt exist'}));
        }
        for (var i = 0; roles[i]; i++) {
            if (roles[i] == role) {
                newUser.role = role;
            }
        }
        newUser.save();
        return (res.status(200).json({role: newUser.role}))
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;