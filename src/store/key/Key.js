const mongoose = require("mongoose");
const keySchema = new mongoose.Schema({
    key: String,
    date: {type: Date, default: Date.now()},
    expiry: {type: String, default: "Week"}
});

module.exports = {
    Key: mongoose.model('Key', keySchema)
}