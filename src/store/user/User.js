const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    uniqueID: String,
    ownerId: String,
    ownerTag: String,
    serverName: String,
    key: String,
    date: {type: Date, default: Date.now()},
    playlist: String,
    isPaused: {type: Boolean, default: false},
    expiry: {type: String, default: ""},
    premium: {type: Boolean, default: false},
    password: {type: String, default: ""},
    queueSize: {type: Number, default: 1}
});

module.exports = {
    User: mongoose.model('User', userSchema)
}