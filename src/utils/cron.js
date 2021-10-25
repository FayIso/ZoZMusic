const cron = require("node-cron");
const {prefix} = require("../config.json");
const {client} = require("../index.js");

module.exports = {
    cron: cron,
}