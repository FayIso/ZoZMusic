const mongoose = require("mongoose");
const keySchema = new mongoose.Schema({
    key: String,
    date: {type: Date, default: Date.now()}
});

module.exports = {
    Key: mongoose.model('Key', keySchema)
}