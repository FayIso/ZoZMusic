const Discord = require('discord.js');
const fs = require("fs");
const {prefix} = require("../config.json");
const {mongoose, client} = require('../index.js')
const {User} = require("../store/user/User");

module.exports = async guild => {
  User.findOne({uniqueID: guild.id.toString()}, function (err, user) {
        if(err) {
            throw err;
        }
        if(!user) {
            let user = new User({
                uniqueID: guild.id,
                ownerId: guild.ownerId,
                ownerTag: guild.ownerTag,
                serverName: guild.name,
                key: "",
                playlist: ""
            });
            user.save(function (err) {
                console.log(err)
            });
        }
    });
}