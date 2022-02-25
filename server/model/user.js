const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: { type: String, default: null },
    password: { type: String },
    role: { type: String, default: null },
    token: { type: String },
    friends: { type: Array, default: []}
})

module.exports = mongoose.model("user", userSchema)