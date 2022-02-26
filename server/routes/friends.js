const User = require("../model/user")
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const user = require("../model/user")

router.post("/friends/get", async (req, res) => {

    try {
        const { username } = req.body;
  
        if (!username)
            return (res.status(400).json({Error: "Require username"}))

        const user = await User.findOne({ username: username })
  
        if (!user) {
            return (res.status(400).json({Error: "User doesnt exist"}));
        }

        return (res.status(200).json({friends: user.friends}))
    } catch (err) {
      console.log(err)
    }
})

router.get("/user/list", async (req, res) => {

    try {
        const filter = {}
        const all = await User.find(filter);
        var allNames = [];
        for (var i = 0; all[i]; i++) {
            allNames[i] = all[i].username;
        }
        return (res.status(200).json({users: allNames}))
    } catch (err) {
      console.log(err)
    }
})

router.post("/friends/add", async (req, res) => {

    try {
        const { username, friendname } = req.body;
  
        if (!username || !friendname || (username == friendname))
            return (res.status(400).json({Error: "Require username and friend"}))

            const user = await User.findOne({ username: username })
  
            if (!user) {
                return (res.status(400).json({Error: "User doesnt exist"}));
            }

            const friend = await User.findOne({ username: friendname })
  
            if (!friend) {
                return (res.status(400).json({Error: "User doesnt exist"}));
            }

            await user.friends.push({name: friend.username, role: friend.role});
            await user.save();
        return (res.status(200).json({friends: user.friends}))
    } catch (err) {
      console.log(err)
    }
})

router.post("/friends/unfriend", async (req, res) => {

    try {
        const { username, friendname } = req.body;
  
        if (!username || !friendname)
            return (res.status(400).json({Error: "Require username and friend"}))

            const user = await User.findOne({ username: username })
  
            if (!user) {
                return (res.status(400).json({Error: "User doesnt exist"}));
            }

            var newFriendList = [];
            var j = 0;
            for (var i = 0; user.friends[i]; i++) {
                if (user.friends[i].name != friendname) {
                    newFriendList[j] = user.friends[i];
                    j++;
                }
            }
            user.friends = newFriendList;
            user.save();
            return (res.status(200).json({friends: user.friends}))
        } catch (err) {
      console.log(err)
    }
})

module.exports = router